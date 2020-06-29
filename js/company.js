const getParams = (key) => {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
};
const createCompanyProfileUrl = () => {
    const {apiKey} = StockExchangeStore;
    let symbol = getParams('symbol');
    return new URL(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`);
}

const getStockHistory = async () => {
    const {apiKey} = StockExchangeStore;
    let symbol = getParams('symbol');
    const SERVER_URL = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${apiKey}`;
    let stockHistoryArray = await callServer(SERVER_URL);
    return stockHistoryArray.historical;

}

const createAChart = async () => {
    let array = await getStockHistory();
    let ctxL = document.getElementById("myChart").getContext('2d');
    let myLineChart = new Chart(ctxL, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Stock Price History",
                data: [],
                backgroundColor: ['rgba(105, 0, 132, .2)',],
                borderColor: ['rgba(200, 99, 132, .7)',],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true
        }
    });
    for (let i = 30; i >= 0; i--) {
        myLineChart.data.labels[i] = array[i].date;
        myLineChart.data.datasets[0].data[i] = array[i].close;
    }
    myLineChart.update();
}

const insertData = async () => {
    const {img, companyName, description, link, stockPrice, stockChanges} = StockExchangeStore;
    let profileUrl = createCompanyProfileUrl();
    let data = await callServer(profileUrl);
    for (let company of data) {
        img.setAttribute("src", `${company.image}`);
        companyName.innerHTML = `<a href="${company.website}"> ${company.companyName}</a>`;
        description.innerText = company.description;
        link.setAttribute('href', `${company.website}`);
        let textnode = document.createTextNode(`${company.website}`);
        link.appendChild(textnode);
        stockPrice.innerText = 'Stock price:' + '$' + company.price;
        if (company.changes < 0) {
            stockChanges.innerText = `(${company.changes} %)`;
            stockChanges.style.color = 'red';
        } else {
            stockChanges.innerText = `(${company.changes} %)`;
            stockChanges.style.color = '#90EE90';
        }
    }

    await createAChart();
}
(async () => {
    let loader = document.querySelector('#loader');
    showElement(loader);
    await insertData();
    hideElement(loader);
})();

