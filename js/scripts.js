let StockExchangeStore = {};

grabElements();

function grabElements() {
    StockExchangeStore.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    StockExchangeStore.img = document.querySelector("#company-img");
    StockExchangeStore.companyName = document.querySelector("#company-name");
    StockExchangeStore.description = document.querySelector("#description");
    StockExchangeStore.link = document.querySelector('#company-link');
    StockExchangeStore.stockPrice = document.querySelector('#stock-price');
    StockExchangeStore.stockChanges = document.querySelector('#stock-changes');

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


