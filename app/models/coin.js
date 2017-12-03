const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


// CURRENCY SCHEMA

var coinSchema = mongoose.Schema({

    crypto: {
        id: String,
        name: String,
        symbol: String,
        rank: String,
        price_usd: String,
        price_btc: String,
        // day_volume_usd: String,
        market_cap_usd: String,
        available_supply: String,
        total_supply: String,
        percent_change_1h: String,
        percent_change_24h: String,
        percent_change_7d: String,
        last_updated: String
    },

    // archived_crypto: {
    //     id: String,
    //     name: String,
    //     symbol: String,
    //     rank: String,
    //     price_usd: String,
    //     price_btc: String,
    //     // day_volume_usd: String,
    //     market_cap_usd: String,
    //     available_supply: String,
    //     total_supply: String,
    //     percent_change_1h: String,
    //     percent_change_24h: String,
    //     percent_change_7d: String,
    //     last_updated: String
    // }

});


// CURRENCY METHODS

// Add a new coin to the database. Assumes the coin doesn't exist.
coinSchema.methods.createCoin = function(coinObject) {
    this.create({
        "id": coinObject.id,
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
    });
    console.log("Created", coinObject.id);
};

// Export the user model.
module.exports = mongoose.model('currency', coinSchema);
