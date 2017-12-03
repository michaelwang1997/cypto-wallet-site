const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var crytpoSchema = mongoose.Schema({
    
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

    archived_crypto: {
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
    }

});
