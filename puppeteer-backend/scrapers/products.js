const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth')

const getRandomUserAgent = () => {
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
    ]
    const randomIndex = Math.floor(Math.random() * userAgents.length)
    return userAgents[randomIndex]
}

async function getProducts(){
    puppeteer.use(stealthPlugin())
    const browser = await puppeteer.launch({headless: true});
    
    const page = await browser.newPage();
    await page.goto('https://www.etsy.com/market/top_sellers');
    await page.setUserAgent(getRandomUserAgent());

    //Page test
    await page.screenshot({path: 'example.png', fullPage: true})

    const products = await page.evaluate(() => {
        const productList = []
        const items = Array.from(document.querySelectorAll('.listing-link'))

        // Web scraping desired fields to be used
        items.forEach(item => { 
            const name = item.querySelector('.v2-listing-card__title').textContent.trim()
            const link = item.getAttribute('href')
            const image = item.querySelector('div > img').getAttribute('src')
            const currency = item.querySelector('.currency-symbol').textContent.trim()
            const value =  item.querySelector('.currency-value').textContent.trim()
            const price = currency + ' ' + value
            productList.push({name, link, image, price})

            if(name && link && image && price) {
                console.log(name, link, image, price)
            }
        })
        return productList
    })

    await browser.close();
    
    // Return all products as array
    console.log(products)
    return products
}

module.exports = {
    getProducts,
}