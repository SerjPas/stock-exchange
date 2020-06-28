let img = document.querySelector("#company-img");
let companyName = document.querySelector("#company-name");
let description = document.querySelector("#description");
let link = document.querySelector('#company-link');
let stockPrice = document.querySelector('#stock-price');
let stockChanges = document.querySelector('#stock-changes');
let apiKey = "ed93f3e229380c530b7a0e7663f86b99";
let loader = document.querySelector('#loader');

const showElement = (element) => element.classList.remove("d-none");
const hideElement = (element) => element.classList.add("d-none");

const getParams = (key) => {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
};
const createCompanyProfileUrl = () => {
    let symbol = getParams('symbol');
    return new URL(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`);
}

async function callServer(SERVER_URL) {
    const response = await fetch(SERVER_URL);
    return response.json();
}

const getStockHistory = async () => {
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
    // showElement(loader);
    await insertData();
    // hideElement(loader);
})();

