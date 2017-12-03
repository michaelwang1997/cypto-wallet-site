module.exports = function(app, passport) {

    // LANDING PAGE
    app.get("/", (req, res) => {
        res.render("index");
    });

    // LOGIN
    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.post("/login", (req, res) => {

    });


    // REGISTER
    app.get("/register", (req, res) => {
        res.render("register");
    });

    app.post("/register", passport.authenticate('local-signup', {
        successRedirect : "/profile", // redirect to the secure profile section
        failureRedirect : "/register", // redirect back to the signup page if there is an error
    }));

    // LOGOUT
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

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
