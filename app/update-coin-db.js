const request = require('request');
var Coin = require('./models/coin.js');

setInterval(function() {
    request("https://api.coinmarketcap.com/v1/ticker/?limit=1", function(error, response, body) {
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
                addCoin(coin, coinObject);
            }
        }
    });
}, 5000);


//120000

// Add a coin to the database.
let addCoin = function(newCoin, coinObject) {

    // newCoin.update(
    //     {id: coinObject.id},
    //     {
    //         "id":coinObject.id,
    //         "name": coinObject.name,
    //         "symbol": coinObject.symbol,
    //         "rank": coinObject.rank,
    //         "price_usd": coinObject.price_usd,
    //         "price_btc": coinObject.price_btc,
    //         "market_cap_usd": coinObject.market_cap_usd,
    //         "available_supply": coinObject.available_supply,
    //         "total_supply": coinObject.total_supply,
    //         "percent_change_1h": coinObject.percent_change_1h,
    //         "percent_change_24h": coinObject.percent_change_24h,
    //         "percent_change_7d": coinObject.percent_change_7d,
    //         "last_updated": coinObject.last_updated
    //     },
    //     {"upsert": true},
    //     function (err, res) {
    //         console.log(err);
    //         console.log(res);
    //     }
    // );

    newCoin.findOneAndUpdate(
        {id: coinObject.id},
        {
            $set: { "id":coinObject.id,
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
        }
    },
    { upsert: true },
    function(err, res) {
        //after mongodb is done updating, you are receiving the updated file as callback

        // now you can send the error or updated file to client
        if (err)
        console.log(err);

        console.log(res);
        // return res.json({ message: 'User updated!' });
    });


    // newCoin.id = coinObject.id;
    // newCoin.name = coinObject.name;
    // newCoin.symbol = coinObject.symbol;
    // newCoin.rank = coinObject.rank;
    // newCoin.price_usd = coinObject.price_usd;
    // newCoin.price_btc = coinObject.price_btc;
    // newCoin.market_cap_usd = coinObject.market_cap_usd;
    // newCoin.available_supply = coinObject.available_supply;
    // newCoin.total_supply = coinObject.total_supply;
    // newCoin.percent_change_1h = coinObject.percent_change_1h;
    // newCoin.percent_change_24h = coinObject.percent_change_24h;
    // newCoin.percent_change_7d = coinObject.percent_change_7d;
    // newCoin.last_updated = coinObject.last_updated;
    //
    // newCoin.save(function(err, res) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(res);
    // });

};

// // Check if the coin already exists in the database.
// let checkCoin = function(newCoin, coinObject) {
//     newCoin.find({"id": coinObject.id}, function(err,res) {
//         if (err) {
//             console.log(err);
//         } if (res) {
//             return true;
//         } else {
//             return false;
//         }
//     });
// };
//
// let updateCoin = function(newCoin, coinObject) {
//     newCoin.findOneAndUpdate();
//
// }


// let wasUpdated = function(schema, coinObject) {
//     console.log(coinObject.id)
//     console.log(coinObject.last_updated)
//     console.log("Checking if updated");
//     return new Promise(function(resolve, reject) {
//         schema.findOne({"crypto.id": coinObject.id}, function(err, res) {
//             if (err) {
//                 // Report the error.
//                 reject(err);
//             } else if (res) {
//                 // Entry found; compare timestamps.
//                 console.log(coinObject.id)
//                 console.log(coinObject.last_updated)
//                 console.log(res.crypto.last_updated)
//                 if (res.crypto.last_updated != coinObject.last_updated) {
//                     console.log("is updated")
//                     // Was updated; return true.
//                     resolve(true);
//                 }
//             } else {
//                 // Entry not found; return false.
//                 console.log("Not found; updating")
//                 resolve(true);
//             }
//
//             resolve(false);
//         });
//     });
// };
//
// let updateCoin = function(coinObject) {
//     var newCoin = new Cypto();
//
//     newCoin.crypto.id: coinObject.id,
//     newCoin.crypto.name: coinObject.name,
//     newCoin.crypto.symbol: coinObject.symbol,
//     newCoin.crypto.rank: coinObject.rank,
//     newCoin.crypto.price_usd: coinObject.price_usd,
//     newCoin.crypto.price_btc: coinObject.price_btc,
//     newCoin.crypto.market_cap_usd: coinObject.market_cap_usd,
//     newCoin.crypto.available_supply: coinObject.available_supply,
//     newCoin.crypto.total_supply: coinObject.total_supply,
//     newCoin.crypto.percent_change_1h: coinObject.percent_change_1h,
//     newCoin.crypto.percent_change_24h: coinObject.percent_change_24h,
//     newCoin.crypto.percent_change_7d: coinObject.percent_change_7d,
//     newCoin.crypto.last_updated: coinObject.last_updated
//
//     console.log("Adding coin:", coinObject.id);
//     schema.replaceOne(
//         {"crypto.id": coinObject.id},
//         {
//             "id": coinObject.id,
//             "name": coinObject.name,
//             "symbol": coinObject.symbol,
//             "rank": coinObject.rank,
//             "price_usd": coinObject.price_usd,
//             "price_btc": coinObject.price_btc,
//             "market_cap_usd": coinObject.market_cap_usd,
//             "available_supply": coinObject.available_supply,
//             "total_supply": coinObject.total_supply,
//             "percent_change_1h": coinObject.percent_change_1h,
//             "percent_change_24h": coinObject.percent_change_24h,
//             "percent_change_7d": coinObject.percent_change_7d,
//             "last_updated": coinObject.last_updated
//         },
//         { upsert: true },
//         function(err, res) {
//             if (err)
//             console.log(err)
//             else {
//                 console.log(res)
//             }
//         }
//     );
// };
