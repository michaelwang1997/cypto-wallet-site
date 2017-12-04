const apiUtil = require('./api_util');
const User = require('./models/user');

module.exports = function(app, passport) {

    app.post("/api/wallet/coin/add", apiUtil.isLoggedIn, (req, res) => {
        if(!req.body.coinID) {
            return res.sendStatus(400);
        }

        User.findOne({username: req.user.username}, (err, user) => {
            if(err) {
                return res.sendStatus(500);
            }

            if(!user) {
                return res.sendStatus(400);
            }

            if(!user.wallet) {
                user.wallet = {};
            }
            if(user.wallet[req.body.coinID]) {
                user.wallet[req.body.coinID] += 1;
            } else {
                user.wallet[req.body.coinID] = 1;
            }

            User.findOneAndUpdate({username: req.user.username}, {$set: {wallet: user.wallet}}, {new: true}, (err, newUser) => {
                if(err) {
                    return res.sendStatus(500);
                }

                console.log(newUser);
                return res.sendStatus(200);
            });
        });

    });

    app.post("/api/wallet/coin/decrement", apiUtil.isLoggedIn, (req, res) => {
        if(!req.body.coinID) {
            return res.sendStatus(400);
        }

        User.findOne({username: req.user.username}, (err, user) => {
            if(err) {
                return res.sendStatus(500);
            }

            if(!user) {
                return res.sendStatus(400);
            }

            // if(!user.wallet) {
            //     user.wallet = {};
            // }

            console.log(req.body.coinID);
            console.log(user.wallet[req.body.coinID]);
            if(user.wallet[req.body.coinID] > 1) {
                console.log("asdf");
                user.wallet[req.body.coinID] -= 1;
            } else {
                delete user.wallet[req.body.coinID];
            }

            User.findOneAndUpdate({username: req.user.username}, {$set: {wallet: user.wallet}}, {new: true}, (err, newUser) => {
                if(err) {
                    return res.sendStatus(500);
                }

                console.log(newUser);
                return res.sendStatus(200);
            });
        });

    });

    /* Get a user's wallet from the database. */
    app.get("/api/wallet", apiUtil.isLoggedIn, (req, res) => {
        User.findOne({username: req.user.username}, (err, user) => {
            if(err) {
                return res.sendStatus(500);
            }

            if(!user) {
                return res.sendStatus(400);
            }

            res.status(200).send(JSON.stringify(user.wallet));
        });

    });

};
