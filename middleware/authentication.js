const passport = require("passport");
const User = require("../models/userSchema");
require("dotenv");

passport.serializeUser(function (user, cb) {
    cb(null, { userid: user.emails[0].value, username: user.displayName });
});

passport.deserializeUser(function (user, cb) {
    User.find({ userid: user.userid }, (err, user) => {
        if (err) res.send(`From deserializer: ${err.message}`)
        cb(err, { userid: user[0].userid, username: user[0].username });
    });
});

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SERVER_API_URL = process.env.SERVER_API_URL;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: SERVER_API_URL + "/auth/google/callback",
},
    function (accessToken, refreshToken, profile, done) {
        if (profile._json.hd == "scet.ac.in") {
            User.findOrCreate({ userid: profile.emails[0].value, username: profile.displayName }, (err, user) => {
                return done(null, profile);
            });
        } else {
            done(new Error("Sorry, only SCET email id accepted!!!"));
        }
    }
));

module.exports = passport;
