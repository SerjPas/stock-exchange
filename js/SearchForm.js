class SearchForm {
    constructor(form) {
        this.form = form;
    }

    renderSearchForm = () => {
        let fragment = new DocumentFragment();
        let form = document.createElement('form');
        let input = document.createElement('input');
        let button = document.createElement('button');
        form.id = 'input-form';
        form.classList.add('form-inline', 'flex-nowrap', 'ml-0', 'col-10');
        input.id = 'input';
        input.classList.add('form-control', 'flex-grow-1', 'mr-sm-2');
        input.type = 'search';
        input.required = true;
        input.placeholder = 'Search';
        button.classList.add('btn', 'btn-outline-success', 'my-2', 'my-sm-0');
        button.type = 'submit';
        button.textContent = 'Search';
        form.append(input, button);
        fragment.appendChild(form);
        this.form.appendChild(fragment);
        this.renderSpinner();
    }

    renderSpinner = () => {
        let fragment = new DocumentFragment();
        let divWrapper = document.createElement('div');
        let divContent = document.createElement('div');
        divWrapper.classList.add('text-center', 'm-3');
        divContent.classList.add('spinner-border', 'd-none', 'ml-auto');
        divContent.id = 'loader';
        divWrapper.appendChild(divContent);
        fragment.appendChild(divWrapper);
        this.form.appendChild(fragment);
    }
    getInputValue = () => {
        console.log("I am inside getInputValue");
        return document.querySelector("#input").value;
    }

    isInputValid = (input) => {
        console.log("I am inside isInputValid");
        return (input.length > 0);
    }

    callResultsFromServer = async () => {
        console.log("I am inside callResultsFromServer");
        const {apiKey} = StockExchangeStore;
        let inputValue = this.getInputValue();
        if (this.isInputValid(inputValue)) {
            const symbolUrl = `https://financialmodelingprep.com/api/v3/search?query=${inputValue}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
            let result = await callServer(symbolUrl);
            console.log(result);
            return await Promise.all(result.map(async (company) => {
                let companyUrl = `https://financialmodelingprep.com/api/v3/profile/${company.symbol}?apikey=${apiKey}`;
                company.additionalResult = await callServer(companyUrl);
                console.log(company.additionalResult);
                return company.additionalResult;
            }));
        } else {
            console.log('Input not valid!')
        }

    }
    
    onSearch = async (callback) => {
        console.log("I am inside onSerch");
        document.getElementById("input-form").onsubmit = async (e) => {
            console.log("I am inside nested func");
            e.preventDefault();
            let companies = await this.callResultsFromServer();
            console.log(companies);
            callback(companies);
        };
    }
}