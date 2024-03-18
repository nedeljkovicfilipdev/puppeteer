const puppeteer = require('puppeteer');

async function getProducts(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.etsy.com/market/top_sellers');

    //To be changed, not working 100% of time
    await page.waitForNetworkIdle({timeout: 2000})

    //Page test
    await page.screenshot({path: 'example.png'})

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
    return products
}

module.exports = {
    getProducts,
}