class SearchResults {
    constructor(placeForResult) {
        this.placeForResult = placeForResult;

    }

    isInputValid(input) {
        return (input.length > 0);
    }

    async callResultsFromServer() {
        const {apiKey} = StockExchangeStore;
        let inputValue = document.querySelector("#input").value;
        if (this.isInputValid(inputValue)) {
            const symbolUrl = `https://financialmodelingprep.com/api/v3/search?query=${inputValue}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
            let result = await callServer(symbolUrl);
            return await Promise.all(result.map(async (company) => {
                let companyUrl = `https://financialmodelingprep.com/api/v3/profile/${company.symbol}?apikey=${apiKey}`;
                company.additionalResult = await callServer(companyUrl);
                console.log(company.additionalResult);
                return company.additionalResult;
            }));
        }

    }

    async renderResults() {
        let array = await this.callResultsFromServer();
        this.placeForResult.innerText = '';
        let fragment = new DocumentFragment();
        array.map((objectInsideArray) => {
            let liTag = document.createElement('li');
            let img = document.createElement('img');
            let spanWithText = document.createElement('span');
            let companiesLink = document.createElement('a');
            img.src = `${objectInsideArray[0].image}`;
            img.classList.add('mr-2', 'img-fluid', 'imgOnSearchResults');
            let text = `${objectInsideArray[0].companyName}. (${objectInsideArray[0].symbol})`;
            companiesLink.append(text);
            companiesLink.href = `./company.html?symbol=${objectInsideArray[0].symbol}`;
            companiesLink.target = `_blank`;
            let stockChange = `(${objectInsideArray[0].changes})`;
            spanWithText.append(stockChange);
            if (objectInsideArray[0].changes < 0) {
                addStyle(spanWithText, 'red');
            } else {
                addStyle(spanWithText, '#90EE90');
            }
            spanWithText.classList.add('ml-2');
            liTag.append(img, companiesLink, spanWithText);
            fragment.appendChild(liTag);
        });
        this.placeForResult.appendChild(fragment);
    }

}