const express = require('express');
const router = express.Router();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv');
const CLIENT_URL = process.env.CLIENT_URL;

// Passport Google Auth 2 configured
const passport = require("../middleware/authentication");

// MongoDBStore for session storage on MongoDB Atlas using URI
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'mySessions',
});


store.on('error', function (error) {
    console.log("Error while creating session: ", error);
});

router.use(session({
    cookie: {
        // Save cookie for 2 hours
        maxAge: 1000 * 3600 * 2
    },
    store: store,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    resave: true,
}));

router.use(passport.initialize());
router.use(passport.session());

router.get("/api/login/error", (req, res) => {
    res.status(401).send("Error logging in");
});

// For checking if user is authenticated or not
router.get("/api/checkAuthentication", (req, res) => {
    res.json({ "authenticated": req.isAuthenticated(), "user": req.user });
});

// Prompt for selection of account
router.get("/auth/google",
    passport.authenticate("google", {
        hd: 'scet.ac.in',
        prompt: 'select_account',
        scope: ["profile", "email"]
    }));

// After selecting account, 
router.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/api/login/error" }), (req, res) => {
        res.redirect(CLIENT_URL);
    });

module.exports = router;