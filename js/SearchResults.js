class SearchResults {
    constructor(placeForResult) {
        this.placeForResult = placeForResult;

    }

    renderResults = async (array) => {
        this.refreshResults();
        let ul = document.createElement('ul');
        ul.className = 'list-group list-group-flush';
        this.placeForResult.appendChild(ul);
        array.map((companies) => {
            let searchValue = document.getElementById('input').value;
            let {highlightedCompanyName, highlightedSymbol} = this.highlight(companies, searchValue);
            let li = document.createElement('li');
            li.className = 'list-group-item d-flex align-items-center';
            let img = document.createElement('img');
            let priceSpan = document.createElement('span');
            let companyNameSpan = document.createElement('span');
            let companiesLink = document.createElement('a');
            let button = document.createElement('button');
            button.innerText = 'compare';
            button.className = 'btn btn-outline-success my-2 my-sm-0 ml-auto';
            button.addEventListener('click', (() => {
                this.printObject(companies);
            }));
            img.src = `${companies[0].image}`;
            img.classList.add('mr-2', 'img-fluid', 'imgOnSearchResults');
            companyNameSpan.innerHTML = `${highlightedCompanyName}. (${highlightedSymbol})`;
            companiesLink.append(companyNameSpan);
            companiesLink.href = `./company.html?symbol=${companies[0].symbol}`;
            companiesLink.target = `_blank`;
            let stockChange = `(${companies[0].changes})`;
            priceSpan.append(stockChange);
            isChangesLessThanZero(companies, priceSpan);
            priceSpan.classList.add('ml-2');
            li.append(img, companiesLink, priceSpan, button);
            ul.appendChild(li);
        });
    }

    printObject(array) {
        array.forEach((company) => {
            console.log(company);
        });

    }

    highlight(objectInsideArray, searchValue) {
        let highlightedCompanyName = objectInsideArray[0].companyName.replace(new RegExp(searchValue, "gi"),
            (match) => (`<mark> ${match} </mark> `));
        let highlightedSymbol = objectInsideArray[0].symbol.replace(new RegExp(searchValue, "gi"),
            (match) => (`<mark> ${match} </mark>`));
        return {highlightedCompanyName, highlightedSymbol};
    }

    refreshResults = () => {
        this.placeForResult.innerText = '';
    }

}