(() => {
    let StockExchangeStore = {};
    grabElements();

    function grabElements() {
        StockExchangeStore.listOfResults = document.querySelector('#list-of-results');
        StockExchangeStore.form = document.querySelector('#input-form');
        StockExchangeStore.loader = document.querySelector('.loader');

    }

    const showElement = (element) => element.classList.remove('d-none');

    const hideElement = (element) => element.classList.add('d-none');

    // const showElements = (elements) => {
    //     for (const element of elements) {
    //         element.classList.remove('d-none');
    //     }
    // }
    //
    // const hideElements = (elements) => {
    //     for (const element of elements) {
    //         element.classList.add('d-none');
    //     }
    // }

    async function callServer(SERVER_URL) {
        const response = await fetch(SERVER_URL);
        return response.json();
    }

    const showResultOnPage = (array) => {
        const {listOfResults} = StockExchangeStore;
        let ulHtml = '';
        for (let newArr of array) {
            ulHtml += `<li><a href="/company.html?symbol=${newArr.symbol}"> ${newArr.name}. ${newArr.symbol}</a></li>`;
        }
        listOfResults.innerHTML = ulHtml;
    }

    async function callResultsFromServer(event) {
        event.preventDefault();
        const {loader} = StockExchangeStore;
        let myInput = document.querySelector('#input').value;
        let apiKey = '76343d22c23b89e80be07772818ad437';
        const SERVER_URL = `https://financialmodelingprep.com/api/v3/search?query=${myInput}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
        showElement(loader);
        let result = await callServer(SERVER_URL);
        console.log(result);
        showResultOnPage(result);
        hideElement(loader);
    }


    (() => {
        const {form} = StockExchangeStore;
        form.addEventListener("submit", callResultsFromServer);

    })();


})();


