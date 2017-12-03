const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var schema = mongoose.Schema({

    account: {
        username: String,
        password: String
    },

    wallet: {
        username: String,
        cryptoID: String,
        quantity: Number
    },

    currencies: {
        id: String,
        name: String,
        symbol: String,
        rank: String,
        price_usd: String,
        price_btc: String,
        day_volume_usd: String,
        market_cap_usd: String,
        available_supply: String,
        total_supply: String,
        percent_change_1h: String,
        percent_change_24h: String,
        percent_change_7d: String,
        last_updated: String
    }

});

// methods ======================
// generating a hash
schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.account.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('hello', schema);
