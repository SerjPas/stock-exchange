let StockExchangeStore = {};

grabElements();

function grabElements() {
    StockExchangeStore.listOfResults = document.querySelector('#list-of-results');
    StockExchangeStore.form = document.querySelector('#input-form');
    StockExchangeStore.loader = document.querySelector('#loader');
    StockExchangeStore.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    StockExchangeStore.searchForm = document.querySelector('#searchForm');
}

const callServer = async (SERVER_URL) => {
    const response = await fetch(SERVER_URL);
    return await response.json();
}

const addStyle = (span, color) => {
    span.style.color = color;
}
const showElement = (element) => element.classList.remove("d-none");
const hideElement = (element) => element.classList.add("d-none");


