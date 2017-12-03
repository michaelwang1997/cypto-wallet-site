let Coin = require('./models/coin.js');
let addCoin = require('./update-coin-db');

module.exports = function(app) {


    var messageCount = 1;
    var messages = {
        0: "Test message",
        1: "Another test message"
    };


    app.post("/api/messages", function(req, res) {
        var body = req.body;
        console.log(body);
        res.contentType("application/json");
        res.status(200).send(JSON.stringify("Post request received"));
    });

    app.get("/api/messages", function(req, res) {
        res.status(200).send(messages);
    });

    app.delete("/api/messages/:id", function(req, res) {
        var id = req.param('id');

        if (messages[id]) {
            delete messages[id];
            res.status(200).send("Deleted message with id " + id);
        } else {
            res.status(400).send("That message id does not exist")
        }
    });

    app.get("/api/coin-data", function(req, res) {
        Coin.find({}, {_id: false, __v: false}, function(err, coins) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(coins);
            }
        })
    });

    app.get("/api/coin-data/:id", function(req, res) {
        Coin.find({"id": req.params.id}, {_id: false, __v: false}, function(err, coin) {
            if (err) {
                res.send(err);
            }

            else if (coin.length == 0) {
                res.status(404).send("Coin not found");
            }

            else {
                res.send(coin);
            }
        })
    });

    app.post("/api/coin-data", function(req, res) {

        Coin.find({"id": req.body.id}, {_id: false, __v: false}, function(err, coin) {
            if (err) {
                res.status(404).send(err);
            }

            else if (coin.length == 0) {
                let newCoin = {
                    "id": req.body.id,
                    "name": req.body.name,
                    "symbol": req.body.symbol,
                    "rank": req.body.rank,
                    "price_usd": req.body.price_usd,
                    "price_btc": req.body.price_btc,
                    "market_cap_usd": req.body.market_cap_usd,
                    "available_supply": req.body.available_supply,
                    "total_supply": req.body.total_supply,
                    "percent_change_1h": req.body.percent_change_1h,
                    "percent_change_24h": req.body.percent_change_24h,
                    "percent_change_7d": req.body.percent_change_7d,
                    "last_updated": req.body.last_updated,
                }

                addCoin(newCoin, req.user);
            }

            else {
                res.status(404).send("Coin already exists.");
            }
        })
    });

    app.put("/api/coin-data", function(req, res) {
        Coin.find({}, {_id: false, __v: false}, function(err, coins) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(coins);
            }
        })
    });

    app.delete("/api/coin-data", function(req, res) {
        Coin.find({}, {_id: false, __v: false}, function(err, coins) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(coins);
            }
        })
    });

}