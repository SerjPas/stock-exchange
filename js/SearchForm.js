class SearchForm {
    constructor(form) {
        this.form = form;
        this.renderSearchForm();
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
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let loader = document.querySelector('#loader');
            showElement(loader);
            const input = document.querySelector('#input');
            this.searchCompanies(input.value);
        });

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

    searchCompanies = async (searchTerm) => {
        const companies = await searchInInternalServer(searchTerm);
        this.onSearchCallback(companies);
    }

    onSearch = (callback) => {
        this.onSearchCallback = callback;
    }
}