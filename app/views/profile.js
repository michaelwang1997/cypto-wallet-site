/* A global state of each cryptocurrency.
   When using React, this will be part of the state. */

let coinStats = {}

/* A User class that we use to demonstrate interactivity. */

class User {

    constructor(username) {
        this.username = username
        this.walletValue = 0
        this.coins = {}
    }

    /* Add or increment coin in this.coins */

    buyCoin(coinID, quantity) {
        if (!this.coins[coinID])
            this.coins[coinID] = 0
        this.coins[coinID] += quantity
        this.refreshValue()
    }

    /* Remove or decrement coin in this.coins */

    sellCoin(coinID, quantity) {
        if (this.coins[coinID] && quantity <= this.coins[coinID])
            this.coins[coinID] -= quantity
        if (this.coins[coinID] == 0)
            delete this.coins[coinID]
        this.refreshValue()
    }

    /* Get quantity of a coin. */

    getQuantity(coinID) {
        return this.coins[coinID]
    }

    /* Refresh the wallet value and corresponding DOM elements. */

    refreshValue() {
        // Update wallet value.
        this.walletValue = 0

        for (let coin in this.coins) {
            let id = coin
            let quantity = this.coins[coin]
            let value = coinStats[coin].price_usd
            this.walletValue += quantity * value
        }

        this.walletValue = this.walletValue.toFixed(2)

        // Update DOM elements.
        $("#wallet-value").text(user.walletValue)

        if (this.walletValue == 0) {
            $("#empty").text("No coins currently.")
            emptyChart()
        } else {
            $("#empty").empty()
            generateChart(this)
        }
    }
}

/* Call the API and save all cryptocurrencys in coinStats.
   If user is persistent, update the coin list. */

let getCoinStats = function() {
    $.ajax({
        type: "GET",
        url: 'https://api.coinmarketcap.com/v1/ticker/',
        success: function(data) {
            for (let i in data) {
                coinStats[data[i].id] = data[i]
            }
            updateCoinList()
        },
        statusCode: {
            404: function() {
                alert( "Coin not found" )
            }
        }
    })
}

/* Set up the session. */

getCoinStats()

let user = new User("John Smith");

$("#username").text(user.username)
$("#wallet-value").text(user.walletValue)

/* Convert "-" delimited id into a readable name. */

let idToName = function(id) {
    words = id.split("-");
    name = "";
    for (let i in words) {
        name += words[i].charAt(0).toUpperCase() + words[i].slice(1) + " ";
    }
    return name.trim();
}

/* Click listener for the add button. */

let buyClickListener = function() {
    // Extract the id.
    let coinID = $(this).attr("id").replace("-buy", "")
    let quantity = user.getQuantity(coinID)
    // Add unique wallet coin button if it doesn't exist.
    if (!quantity) {
        newCoinLayout(coinID, 0).appendTo(".coin-list")
    }
    user.buyCoin(coinID, 1)
    // Update visual quantity.
    $("." + coinID + "-qty").text(user.getQuantity(coinID))
}

/* Click listener for the sell button. */

let sellClickListener = function() {
    // Extract the id.
    coinID = $(this).attr("id").replace("-sell", "")
    user.sellCoin(coinID, 1)
    // Update visual quantity.
    $("." + coinID + "-qty").text(user.getQuantity(coinID))
    // Remove the unique wallet coin button if there's none left.
    if (!user.getQuantity(coinID)) {
        $("#" + coinID + "-btn").remove()
        $("#statistics").empty()
    }
}

/* Click listener for a cryptocurrency wallet button. It updates "Coin Statistics".*/

let coinInfoListener = function() {
    stats = $("#statistics")
    stats.empty()
    // Extract the id.
    coinID = $(this).attr("id").replace("-btn", "")
    coin = coinStats[coinID]

    // Update the "Coin Statistics" section.
    let appendStrongElement = function(key, value) {
        $("<strong>").append(key + ": ").appendTo(stats).after(value)
        stats.append("<br>")
    }

    let totalValue = (coin.price_usd * user.getQuantity(coinID)).toFixed(2)
    appendStrongElement("Your Total Value", totalValue)
    stats.append("<br>")
    // The following is repetitive but each stat is formatted differently.
    appendStrongElement("Name", coin.name)
    appendStrongElement("Symbol", coin.symbol)
    appendStrongElement("Rank", coin.rank)
    appendStrongElement("Price (USD)", coin.price_usd)
    appendStrongElement("Price (BTC)", coin.price_btc)
    appendStrongElement("24h Volume (USD)", coin["24h_volume_usd"])
    appendStrongElement("Market Cap (USD)", coin.market_cap_usd)
    appendStrongElement("Percent Change (1h)", coin.percent_change_1h)
    appendStrongElement("Percent Change (24h)", coin.percent_change_24h)
    appendStrongElement("Percent Change (7d)", coin.percent_change_7d)
}

/* Construct a coin layout (used to display coin statistics). */

let newCoinLayout = function(coinID, quantity) {
    // Get coin name for the button.
    coinName = idToName(coinID)
    // Build the unique wallet coin button.
    let coinLayout = $('<button>', { "id": coinID + "-btn", 'type': 'button', 'class': 'list-group-item btn text-left' })
                        .css({ "margin": "2px" })

            let coinNameDiv = $("<div>").append(coinName).css({ "float": "left" }).appendTo(coinLayout)
            let quantityDiv = $("<div>").appendTo(coinNameDiv)
            let coinQuantity = $("<span>", { "class": coinID + "-qty"}).append(quantity).appendTo(quantityDiv)

            let coinSymbol = $("<span>", { "class": coinID + "-symbol"})
                                .append(" " + coinStats[coinID].symbol)
                                .appendTo(quantityDiv)

            let buttonDiv = $("<div>").css({ "float": "right" }).appendTo(coinLayout)
            let buyButton = newBuyButton(coinID).appendTo(buttonDiv)
            let sellButton = newSellButton(coinID).appendTo(buttonDiv)

            // Add click listeners to all of the buttons.
            buyButton.click(buyClickListener)
            sellButton.click(sellClickListener)

            return coinLayout.click(coinInfoListener)
}

/* Update the coin list with user's current coins. Used for a persistent user. */

let updateCoinList = function() {
    $.each(user.coins, function(coin, quantity) {
        newCoinLayout(coin, quantity).appendTo(".coin-list")
    })
}
