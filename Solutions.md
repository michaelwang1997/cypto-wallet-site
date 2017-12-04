## Group Members
Student 1: Patrick Gronowski (998431086)

Student 2: Michael Wang (1002317931)

Student 3: Shoaib Shaikh (1002210840)

Student 4: Usama Zaki (1002795503)

## POST Request Format
When making a post request for messages, please do so in the following format:
curl -H "Content-Type: application/json" -XPOST --data '{"data": "your message"}' url-here
 
## Features
CryptoFolio is as a cryptocurrency portfolio manager that the user can use to keep track of all the cryptocurrencies they have invested in. The information of each cryptocurrency is obtained from the CoinMarketCap API. The user can visit the Home page, their Profile, or the Market. They can also send us an e-mail through the Contact Us page.

Once they reach the website, they have the option to register if they do not already have an account, or log in once they do. Once logged in, the user is redirected to the profile page. From the profile page, the user can browse their wallet to see the coins they already own. Directly from the wallet, the user can sell their cryptocurrencies or buy more of them. To the left of the wallet is the wallet's total worth and a distribution of the worth of cryptocurrencies owned (presented in a pie chart). To the right of the wallet is more information about the currency that the user last clicked.

Currently, users can only increment or decrement their cryptocurrency quantities. While this is not realistic, it simplifies the front end for now. Our intent is to allow the user to specify exactly how much of the cryptocurrency they would like to buy or how much money they would like to spend.

If a user wants to buy a new currency, they can click "BUY COINS" or visit the market directly. Users can search for currencies using the search bar. Here they will be able to add coins to their wallet. 

So at the moment, the user can increment quantities from their wallet and from the market. They can also decrement quantities, but solely from their wallet. Changes in quantities are accurately represented in the wallet's worth and the pie chart. Both the market and the profile make calls to our API.

## API
The RESTful API we implemented has routes in api_routes.js for the basic operations we have implemented.

**Note:** Our application works best in Chrome.