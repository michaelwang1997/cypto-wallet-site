/* Generate the market table using a call to our API. */
var Coin = require('./models/coin.js');

(function() {
	Coin.find({}, function(err, coins) {
		console.log(coins);
  });
})()


// $(function() {
// 	$.ajax({
//     	type: 'GET',
//     	url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10', // limit to 10 for now
//     	success: function(data) {
//     		$.each(data, function(index, item) {
//
// 				let tableRow = $("<tr>")
// 				let rank = $("<td>").append(item.rank)
//
// 				let nameDiv = $("<div>").css({ "float": "left" }).append(item.name)
// 				let button = newBuyButton(item.id).click(buyClickListener)
//
// 				let buttonDiv = $("<div>").css({ "float": "right" }).append(button)
//
// 				let nameAndButton = $("<td>").append(nameDiv).append(buttonDiv)
//
// 				let symbol = $("<td>").append(item.symbol)
// 				let price = $("<td>").append(item.price_usd)
// 				let marketCap = $("<td>").append(item.market_cap_usd)
//
// 				tableRow.append(rank).append(nameAndButton)
// 						.append(symbol).append(price)
// 						.append(marketCap).appendTo(".table-body")
//     		})
//
//     	},
//    	 	error: function(xhr, error) {
//         	console.log("Something went wrong: ", error)
//     	}
// 	})
// })
