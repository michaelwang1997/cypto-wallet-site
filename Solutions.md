## Group Members
Student 1: Patrick Gronowski (998431086)

Student 2: Michael Wang (1002317931)

Student 3: Shoaib Shaikh (1002210840)

Student 4: Usama Zaki (1002795503)

## POST Request Format for Message API
When making a post request for messages, please do so in the following format:

curl -H "Content-Type: application/json" -XPOST --data '{"data": "your message"}' url-here

The routes to be tested will be:

GET /api/messages

POST /api/messages

DELETE /api/messages/1234

## Custom Cryptocurrency Creation/Edit/Delete API

Requests are done in the same way as above: curl -H "Content-Type: application/json" -XPOST --data '{"data": "your message"}' url-here

We've implemented a RESTful API that adds functionality to CoinMarketCap (the publically facing API that we are using). We've implemented routes that allow the user to create their own cryptocurrencies. The routes are as follows:

GET /api/coin-data
- get all of the cryptocurrency information that we store

GET /api/coin-data/:id
- get the information of one cryptocurrency

POST /api/coin-data
- create a new cryptocurrency with your own information
- data = { id: `<immutable id>`, name: `<name>`, symbol: `<3 letter symbol>`, price: `<USD price>`, market_cap: `<USD market cap>`, secret: `<immutable password>` }

PUT /api/coin-data/:id
- edit the cryptocurrency if you have the password
- data = { name: `<name>`, symbol: `<3 letter symbol>`, price: `<USD price>`, market_cap: `<USD market cap>`, secret: `<immutable password>` }

DELETE /api/coin-data/:id
- delete the cryptocurrency if you have the password
- data = { secret: `<immutable password>` }
 
## Features
CryptoFolio is as a cryptocurrency portfolio manager that the user can use to keep track of all the cryptocurrencies they have invested in. The information of each cryptocurrency is obtained from the CoinMarketCap API. The user can visit the Home page, their Profile, or the Market. They can also send us an e-mail through the Contact Us page.

Once they reach the website, they have the option to register if they do not already have an account, or log in once they do. Once logged in, the user is redirected to the profile page. From the profile page, the user can browse their wallet to see the coins they already own. Directly from the wallet, the user can sell their cryptocurrencies or buy more of them. To the left of the wallet is the wallet's total worth and a distribution of the worth of cryptocurrencies owned (presented in a pie chart). To the right of the wallet is more information about the currency that the user last clicked.

Currently, users can only increment or decrement their cryptocurrency quantities. While this is not realistic, it simplified the front end and allowed us to demonstrate this proof-of-concept. If a user wants to buy a new currency, they can click "BUY COINS" or visit the market directly. Users can search for currencies using the search bar. Here they will be able to add coins to their wallet. 

So the user can increment quantities from their wallet and from the market. They can also decrement quantities, but solely from their wallet. Changes in quantities are accurately represented in the wallet's worth and the pie chart. Both the market and the profile make calls to our API.

**Note:** Our application works best in Chrome.
