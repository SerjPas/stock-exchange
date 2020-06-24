(() => {
    let StockExchangeStore = {};
    grabElements();

    function grabElements() {
        StockExchangeStore.listOfResults = document.querySelector('#list-of-results');
        StockExchangeStore.form = document.querySelector('#input-form');
        StockExchangeStore.loader = document.querySelector('.loader');
        StockExchangeStore.apiKey = "ed93f3e229380c530b7a0e7663f86b99";

    }

    const showElement = (element) => element.classList.remove("d-none");
    const hideElement = (element) => element.classList.add("d-none");

    async function callServer(SERVER_URL) {
        const response = await fetch(SERVER_URL);
        return response.json();
    }

    function showResultOnPage(array) {
        const {listOfResults} = StockExchangeStore;
        listOfResults.innerText = '';
        let fragment = new DocumentFragment();
        console.log(array);
        array.map((objectInsideArray) => {
            let liTag = document.createElement('li');
            let img = document.createElement('img');
            img.src = `${objectInsideArray[0].image}`;
            img.style.height = '80px';
            img.style.width = '80px';
            img.classList.add('mr-2');
            let aTag = document.createElement('a');
            let text = `${objectInsideArray[0].companyName}. (${objectInsideArray[0].symbol})`;
            aTag.append(text);
            aTag.href = `./company.html?symbol=${objectInsideArray[0].symbol}`;
            aTag.target = `_blank`;
            let span = document.createElement('span');
            let stockChange = `(${objectInsideArray[0].changes})`;
            span.append(stockChange);
            if (objectInsideArray[0].changes < 0){
                span.style.color = 'red' ;
            } else {
                span.style.color = '#90EE90';
            }
            span.classList.add('ml-2');

            liTag.append(img, aTag, span);
            fragment.appendChild(liTag);
        });
        listOfResults.appendChild(fragment);
    }

    async function callResultsFromServer(event) {
        event.preventDefault();
        const {loader, apiKey} = StockExchangeStore;
        showElement(loader);
        let myInput = document.querySelector("#input").value;
        const SERVER_URL = `https://financialmodelingprep.com/api/v3/search?query=${myInput}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
        let result = await callServer(SERVER_URL);
        const companyData = await Promise.all(result.map(async (company) => {
            let url = `https://financialmodelingprep.com/api/v3/profile/${company.symbol}?apikey=${apiKey}`;
            company.additionalResult = await callServer(url);
            return callServer(url);
        }));
        showResultOnPage(companyData);
        hideElement(loader);
    }

    (() => {
        const {form} = StockExchangeStore;
        form.addEventListener("submit", callResultsFromServer);
    })();

})();
