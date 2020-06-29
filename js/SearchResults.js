class SearchResults {
    constructor(placeForResult) {
        this.placeForResult = placeForResult;
    }

    renderResults = async (array) => {
        let loader = document.querySelector('#loader');
        showElement(loader);
        this.refreshResults();
        let fragment = new DocumentFragment();
        let ul = document.createElement('ul');
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
            this.isChangesLessThanZero(objectInsideArray, spanWithText);
            spanWithText.classList.add('ml-2');
            liTag.append(img, companiesLink, spanWithText);
            ul.appendChild(liTag);
            fragment.appendChild(ul);
        });
        this.placeForResult.appendChild(fragment);
        hideElement(loader);
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