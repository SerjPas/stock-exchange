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

const getInputValue = () => {
    return document.querySelector("#input").value;
}

const isInputValid = (input) => {
    return (input.length > 0);
}

const isChangesLessThanZero = (object, span) => {
    if (object[0].changes < 0) {
        addStyle(span, 'red');
    } else {
        addStyle(span, '#90EE90');
    }
}

const callResultsFromServer = async () => {
    const {apiKey} = StockExchangeStore;
    let inputValue = getInputValue();
    if (isInputValid(inputValue)) {
        const symbolUrl = `https://financialmodelingprep.com/api/v3/search?query=${inputValue}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
        let result = await callServer(symbolUrl);
        return await Promise.all(result.map(async (company) => {
            let companyUrl = `https://financialmodelingprep.com/api/v3/profile/${company.symbol}?apikey=${apiKey}`;
            company.additionalResult = await callServer(companyUrl);
            return company.additionalResult;
        }));
    }
}

