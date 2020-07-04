const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017'// Connection URL

app.use(cors());

const StockExchangeStore = {};

function grabElements() {
    StockExchangeStore.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    StockExchangeStore.baseUrl = 'https://financialmodelingprep.com/api/v3';
}

grabElements();

async function searchNasdaqForSymbol(searchTerm) {
    const {apiKey, baseUrl} = StockExchangeStore;
    let url = `${baseUrl}/search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
    return callServer(url);
}

async function fetchForCompanyProfile(symbol) {
    const {apiKey, baseUrl} = StockExchangeStore;
    let url = `${baseUrl}/company/profile/${symbol}?apikey=${apiKey}`;
    return callServer(url);
}

async function searchNasdaqWithProfile(searchTerm) {
    const companies = await searchNasdaqForSymbol(searchTerm);
    const fetchCompaniesProfiles = companies.map(company => {
        return fetchForCompanyProfile(company.symbol);
    });
    return await Promise.all(fetchCompaniesProfiles);
}

const callServer = async (SERVER_URL) => {
    const response = await fetch(SERVER_URL);
    return await response.json();
}

app.get('/', (req, res) => res.send('Node Project Server!'));

app.get('/search', async (req, res) => {
    const searchQuery = req.query.query;
    searchNasdaqWithProfile(searchQuery).then((companiesWithProfiles) => {
        res.send(companiesWithProfiles);
        MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("nodeProject");
            let myObj = {date: new Date(), searchQuery: searchQuery, searchResult: companiesWithProfiles};
            dbo.collection("search").insertOne(myObj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted.");
                db.close();
            });
        });
    });
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
