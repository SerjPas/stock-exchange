class Marquee {
    constructor(marquee, url) {
        this.marquee = marquee;
        this.url = url;
    }

    load = async () => {
        let result = await callServer(this.url);
        let fragment = new DocumentFragment();
        let marqueeForRealTimeStock = document.createElement('div');
        marqueeForRealTimeStock.className = 'marquee-inner d-flex';
        result.map((objectInsideRealTimeStock) => {
            let symbolSpan = document.createElement('span');
            let priceSpan = document.createElement('span');
            symbolSpan.classList.add('mr-2');
            priceSpan.classList.add('mr-2');
            addStyle(priceSpan, 'green');
            let stockSymbol = `${objectInsideRealTimeStock.symbol}`;
            let stockPrice = `($ ${objectInsideRealTimeStock.price})`;
            symbolSpan.append(stockSymbol);
            priceSpan.append(stockPrice);
            fragment.append(symbolSpan, priceSpan);
        });
        marqueeForRealTimeStock.appendChild(fragment);
        this.marquee.appendChild(marqueeForRealTimeStock);
    }
}