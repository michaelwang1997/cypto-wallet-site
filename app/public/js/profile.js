/* A global state of each cryptocurrency.
 When using React, this will be part of the state. */

let wallet;
let marketStats;
$.ajax({
    url: "/api/wallet/coin",
    type: "GET",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
        console.log(data);
        wallet = data;
    },
    error: function (resp) {
        return alert("Failed to buy the coin.");
    }
});

$(function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/coin-data', // limit to 10 for now
        success: function (data) {
            marketStats = data;
        },
        error: function (xhr, error) {
            console.log("Something went wrong: ", error)
        }
    })
})


let buyCoin = function (coinID, quantity) {
    if (!wallet[coinID])
        wallet[coinID] = 0
    wallet[coinID] += quantity
    refreshValue()
}

let sellCoin = function (coinID, quantity) {
    if (wallet[coinID] && quantity <= wallet[coinID])
        wallet[coinID] -= quantity
    if (wallet[coinID] == 0)
        delete wallet[coinID]
    refreshValue()
}

let refreshValue = function () {
    var walletValue = 0

    for (let coin in wallet) {
        let id = coin
        let quantity = coins[coin]
        // let value = wallet[coin].price_usd
        // walletValue += quantity * value
    }

    walletValue = walletValue.toFixed(2)

    // Update DOM elements.
    $("#wallet-value").text(walletValue)

    if (walletValue == 0) {
        $("#empty").text("No coins currently.")
        emptyChart()
    } else {
        $("#empty").empty()
        generateChart(wallet, marketStats)
    }
}

/* Call the API and save all cryptocurrencys in wallet.
 If user is persistent, update the coin list. */

let getCoinStats = function () {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/api/coin-data',
        success: function (data) {
            for (let i in data) {
                wallet[data[i].id] = data[i]
            }
            updateCoinList()
        },
        statusCode: {
            404: function () {
                alert("Coin not found")
            }
        }
    })
}

/* Set up the session. */

getCoinStats()

/* Convert "-" delimited id into a readable name. */

let idToName = function (id) {
    words = id.split("-");
    name = "";
    for (let i in words) {
        name += words[i].charAt(0).toUpperCase() + words[i].slice(1) + " ";
    }
    return name.trim();
}

/* Click listener for the add button. */

let buyClickListener = function () {
    // Extract the id.
    let coinID = $(this).attr("id").replace("-buy", "")
    let quantity = getQuantity(coinID)
    // Add unique wallet coin button if it doesn't exist.
    if (!quantity) {
        newCoinLayout(coinID, 0).appendTo(".coin-list")
    }
    buyCoin(coinID, 1)

    $.ajax({
        url: "/api/wallet/coin/add",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({"coinID": coinID}),
        success: function (resp) {
            return alert("Successfully purchased the coin.");
        },
        error: function (resp) {
            return alert("Failed to buy the coin.");
        }
    });
    // Update visual quantity.
    $("." + coinID + "-qty").text(getQuantity(coinID))
}

/* Click listener for the sell button. */

let sellClickListener = function () {
    // Extract the id.
    let coinID = $(this).attr("id").replace("-buy", "")
    let quantity = getQuantity(coinID)
    sellCoin(coinID, 1)
    // Update visual quantity.
    // $("." + coinID + "-qty").text(user.getQuantity(coinID))
    // // Remove the unique wallet coin button if there's none left.
    // if (!quantity) {
    //     $("#" + coinID + "-btn").remove()
    //     $("#statistics").empty()
    // }
    $.ajax({
        url: "/api/wallet/coin/decrement",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({"coinID": coinID}),
        success: function (resp) {
            return alert("Successfully purchased the coin.");
        },
        error: function (resp) {
            return alert("Failed to buy the coin.");
        }
    });
}

/* Click listener for a cryptocurrency wallet button. It updates "Coin Statistics".*/

let coinInfoListener = function () {
    stats = $("#statistics")
    stats.empty()
    // Extract the id.
    coinID = $(this).attr("id").replace("-btn", "")
    coin = wallet[coinID]

    // Update the "Coin Statistics" section.
    let appendStrongElement = function (key, value) {
        $("<strong>").append(key + ": ").appendTo(stats).after(value)
        stats.append("<br>")
    }

    let totalValue = (coin.price_usd * getQuantity(coinID)).toFixed(2)
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

let newCoinLayout = function (coinID, quantity) {
    // Get coin name for the button.
    // $.ajax({
    //     url: "/api/wallet/coin",
    //     type: "GET",
    //     contentType: "application/json; charset=utf-8",
    //     data: JSON.stringify({"coinID": coinID}),
    //     success: function (data) {
    //         console.log(data);
    //     },
    //     error: function (resp) {
    //         return alert("Failed to buy the coin.");
    //     }
    // });


    coinName = idToName(coinID)
    // Build the unique wallet coin button.
    let coinLayout = $('<button>', {"id": coinID + "-btn", 'type': 'button', 'class': 'list-group-item btn text-left'})
        .css({"margin": "2px"})

    let coinNameDiv = $("<div>").append(coinName).css({"float": "left"}).appendTo(coinLayout)
    let quantityDiv = $("<div>").appendTo(coinNameDiv)
    let coinQuantity = $("<span>", {"class": coinID + "-qty"}).append(quantity).appendTo(quantityDiv)

    let coinSymbol = $("<span>", {"class": coinID + "-symbol"})
        .append(" " + wallet[coinID].symbol)
        .appendTo(quantityDiv)

    let buttonDiv = $("<div>").css({"float": "right"}).appendTo(coinLayout)
    let buyButton = newBuyButton(coinID).appendTo(buttonDiv)
    let sellButton = newSellButton(coinID).appendTo(buttonDiv)

    // Add click listeners to all of the buttons.
    buyButton.click(buyClickListener)
    sellButton.click(sellClickListener)

    return coinLayout.click(coinInfoListener)
}

/* Update the coin list with user's current coins. Used for a persistent user. */

let updateCoinList = function () {
    $.each(coins, function (coin, quantity) {
        newCoinLayout(coin, quantity).appendTo(".coin-list")
    })
}
