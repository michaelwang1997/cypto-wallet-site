module.exports = function(app, passport) {

    // LANDING PAGE
    app.get("/", (req, res) => {
        res.render("../views/index");
    });

    // LOGIN
    app.get("/login", (req, res) => {

    });

    app.post("/login", passport.authenticate("local"), (req, res) => {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.

        res.redirect("/users/" + req.user.username);
    });


    // REGISTER
    app.get("/register", (req, res) => {

    });

    app.post("/register", (req, res) => {

    });

    // LOGOUT


    // PROFILE

    // Authentication middleware.
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {
            return next();
        }

        // if they aren't redirect them to the home page
        res.redirect("/");
    }

}
