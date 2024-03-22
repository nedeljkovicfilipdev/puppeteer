const puppeteer = require('puppeteer');


//Trying out puppeteer, recieving categories from etsy page
async function getCategories() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.etsy.com/');

    // Extract category data
    const categories = await page.evaluate(() => {
        const categoryElements = document.querySelectorAll('.shop-by-category--category-card');
        const categories = [];

        categoryElements.forEach(element => {
            const title = element.querySelector('.wt-text-title-small').innerText.trim();
            const imageUrl = element.querySelector('img').getAttribute('src');
            const link = element.querySelector('.wt-card__action-link').getAttribute('href');

            categories.push({ title, imageUrl, link });
        });
        return categories;
    });

    await browser.close();
    return categories;
}

module.exports = {
    getCategories,
}