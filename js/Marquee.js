class Marquee {
    constructor(marquee) {
        this.marquee = marquee;

    }

    getRealTimeStock = async () => {
        const {apiKey} = StockExchangeStore;
        let result = await callServer(
            `https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=${apiKey}`,
        );
        let fragment = new DocumentFragment();
        let marqueeForRealTimeStock = document.createElement('marquee')
        result.map((objectInsideRealTimeStock) => {
            let spanForSymbol = document.createElement('span');
            let spanForPrice = document.createElement('span');
            spanForSymbol.classList.add('mr-2');
            spanForPrice.classList.add('mr-2');
            spanForPrice.style.color = 'green';
            let stockSymbol = `${objectInsideRealTimeStock.symbol}`;
            let stockPrice = `($ ${objectInsideRealTimeStock.price})`;
            spanForSymbol.append(stockSymbol);
            spanForPrice.append(stockPrice);
            fragment.appendChild(spanForSymbol);
            fragment.appendChild(spanForPrice);
        });
        marqueeForRealTimeStock.appendChild(fragment);
        marquee.appendChild(marqueeForRealTimeStock);
    }
}