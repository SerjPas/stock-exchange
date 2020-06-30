class SearchResults {
    constructor(placeForResult) {
        this.placeForResult = placeForResult;
    }

    renderResults = async (array) => {
        this.refreshResults();
        let ul = document.createElement('ul');
        ul.className = 'list-group list-group-flush';
        this.placeForResult.appendChild(ul);
        array.map((objectInsideArray) => {
            let searchValue = document.getElementById('input').value;
            let {highlightedCompanyName, highlightedSymbol} = this.highlight(objectInsideArray, searchValue);
            let li = document.createElement('li');
            li.className = 'list-group-item';
            let img = document.createElement('img');
            let priceSpan = document.createElement('span');
            let companyNameSpan = document.createElement('span');
            let companiesLink = document.createElement('a');
            img.src = `${objectInsideArray[0].image}`;
            img.classList.add('mr-2', 'img-fluid', 'imgOnSearchResults');
            companyNameSpan.innerHTML = `${highlightedCompanyName}. (${highlightedSymbol})`;
            companiesLink.append(companyNameSpan);
            companiesLink.href = `./company.html?symbol=${objectInsideArray[0].symbol}`;
            companiesLink.target = `_blank`;
            let stockChange = `(${objectInsideArray[0].changes})`;
            priceSpan.append(stockChange);
            this.isChangesLessThanZero(objectInsideArray, priceSpan);
            priceSpan.classList.add('ml-2');
            li.append(img, companiesLink, priceSpan);
            ul.appendChild(li);
        });
    }

    highlight(objectInsideArray, searchValue) {
        let highlightedCompanyName = objectInsideArray[0].companyName.replace(new RegExp(searchValue, "gi"),
            (matchName) => (`<mark> ${matchName} </mark> `));
        let highlightedSymbol = objectInsideArray[0].symbol.replace(new RegExp(searchValue, "gi"),
            (matchName) => (`<mark> ${matchName} </mark>`));
        return {highlightedCompanyName, highlightedSymbol};
    }

    isChangesLessThanZero = (object, span) => {
        if (object[0].changes < 0) {
            addStyle(span, 'red');
        } else {
            addStyle(span, '#90EE90');
        }
    }

    refreshResults = () => {
        this.placeForResult.innerText = '';
    }
}