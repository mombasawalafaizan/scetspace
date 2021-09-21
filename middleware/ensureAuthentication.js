// Middleware for checking, if the page requires authorised access
function ensureAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log('User is not authenticated');
        res.redirect("/auth/google");
    }
}

module.exports = ensureAuthentication;