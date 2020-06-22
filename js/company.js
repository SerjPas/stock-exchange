let companyProfileStore = {};
grabElements();

function grabElements() {
    companyProfileStore.img = document.querySelector("#company-img");
    companyProfileStore.companyName = document.querySelector("#company-name");
    companyProfileStore.description = document.querySelector("#description");
    companyProfileStore.link = document.querySelector('#company-link');
    companyProfileStore.stockPrice = document.querySelector('#stock-price');
    companyProfileStore.stockChanges = document.querySelector('#stock-changes');
    companyProfileStore.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
}

(() => {
    const extractFromUrl = (key) => {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    };
    const createCompanyProfileUrl = () => {
        const {apiKey} = companyProfileStore;
        let symbol = extractFromUrl('symbol');
        const myUrlWithParams = new URL(`https://financialmodelingprep.com/api/v3/profile/${symbol}`);
        myUrlWithParams.searchParams.append('apikey', `${apiKey}`);
        return myUrlWithParams;
    }

    async function callServer(SERVER_URL) {
        const response = await fetch(SERVER_URL);
        return response.json();
    }

    const insertData = async () => {
        const {img, companyName, description, link, stockPrice, stockChanges} = companyProfileStore;
        let profileUrl = createCompanyProfileUrl();
        let data = await callServer(profileUrl);
        for (let company of data) {
            img.setAttribute("src", `${company.image}`);
            companyName.innerText = company.companyName;
            description.innerText = company.description;
            link.innerText = company.website;
            stockPrice.innerText = company.price;
            console.log(company.changes);
            if (company.changes < 0) {
                stockChanges.innerText = company.changes + ' %';
                stockChanges.style.color = '#90EE90';
            } else {
                stockChanges.innerText = company.changes + ' %';
                stockChanges.style.color = 'red';
            }
        }
    };
    insertData();
    (async () => {
        const {apiKey} = companyProfileStore;
        let symbol = extractFromUrl('symbol');
        const SERVER_URL = `https://financialmodelingprep.com/api/v3/historical-price-full/
        ${symbol}?serietype=line&apikey=${apiKey}`;
        let data = await callServer(SERVER_URL);
        console.log(data);
    })();
})();