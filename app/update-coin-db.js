const request = require('request');
var Coin = require('./models/coin.js');

setInterval(function() {
    request("https://api.coinmarketcap.com/v1/ticker/?limit=10", function(error, response, body) {
        if (error) {
            console.log("Something went wrong: ", error)
        } else {
            data = JSON.parse(body);
            for (let index in data) {

                let coinObject = data[index];
                // // Check if the coin was updated since the last time.
                // wasUpdated(schema, coin).then((isChanged) => {
                //     if (isChanged) {
                //         console.log("Was updated");
                //         updateCoin(schema, coin);
                //     }
                // });

                let coin = new Coin();
                addCoin(coinObject);
            }
        }
    });
}, 5000);


//120000

// Add a coin to the database.
let addCoin = function(coinObject) {

    Coin.update(
        {"id": coinObject.id},
        {
            "id":coinObject.id,
            "name": coinObject.name,
            "symbol": coinObject.symbol,
            "rank": coinObject.rank,
            "price_usd": coinObject.price_usd,
            "price_btc": coinObject.price_btc,
            "market_cap_usd": coinObject.market_cap_usd,
            "available_supply": coinObject.available_supply,
            "total_supply": coinObject.total_supply,
            "percent_change_1h": coinObject.percent_change_1h,
            "percent_change_24h": coinObject.percent_change_24h,
            "percent_change_7d": coinObject.percent_change_7d,
            "last_updated": coinObject.last_updated
        },
        {"upsert": true},
        function(err,res) {
            // console.log(err)
            // console.log(res)
        }
    );
};
