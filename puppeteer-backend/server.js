//Scrapers
const categories = require('./scrapers/categories')
const getRecentProducts = require('./scrapers/products')

//Converting nodejs to express
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

async function main() {
    try {
        const products = await getRecentProducts.getProducts();
        console.log(products);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();

//Routes to be added..

//Show all categories
/*
categories.getCategories().then(categories => {
    categories.forEach(category => {
        console.log(`Title: ${category.title}`)
        console.log(`ImageUrl: ${category.imageUrl}`)
        console.log(`Link: ${category.link}`)
        console.log("______________________________")
    })
})
*/