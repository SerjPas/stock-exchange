let StockExchangeStore = {};
grabElements();

function grabElements() {
    StockExchangeStore.listOfResults = document.querySelector('#list-of-results');
    StockExchangeStore.form = document.querySelector('#input-form');
    StockExchangeStore.loader = document.querySelector('.loader');
    StockExchangeStore.apiKey = "ed93f3e229380c530b7a0e7663f86b99";

}

(() => {

    const showElement = (element) => element.classList.remove("d-none");

    const hideElement = (element) => element.classList.add("d-none");

    async function callServer(SERVER_URL) {
        const response = await fetch(SERVER_URL);
        return response.json();
    }

    const showResultOnPage = (array) => {
        const {listOfResults} = StockExchangeStore;
        let fragment = new DocumentFragment();
        for (let newArr of array) {
            let li = document.createElement('li');
            li.innerHTML = `<a href="./company.html?symbol=${newArr.symbol}"> ${newArr.name}. ${newArr.symbol}</a>`
            fragment.appendChild(li);
        }
        listOfResults.appendChild(fragment);
    };

    async function callResultsFromServer(event) {
        event.preventDefault();
        const {loader, apiKey} = StockExchangeStore;
        showElement(loader);
        let myInput = document.querySelector("#input").value;
        const SERVER_URL = `https://financialmodelingprep.com/api/v3/search?query=${myInput}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
        let result = await callServer(SERVER_URL);
        showResultOnPage(result);
        hideElement(loader);
    }

    (() => {
        const {form} = StockExchangeStore;
        form.addEventListener("submit", callResultsFromServer);
    })();
})();
