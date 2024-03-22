const asyncHandler = require('express-async-handler')

const { getProducts, getProduct} = require('../scrapers/products')


// Get products
// GET /etsy/getProducts
const getAllProducts = async (req, res) => {
    try{
        const products = await getProducts()
        res.status(200).json(products)
    } catch (error) {
        console.error("Error getting products: ", error)
        res.status(500).json({error: "Internal Server Error"})
    }
}

//Get single product
//GET /etsy/getProduct?link
const getDetailedProduct = async (req, res) => {
    console.log(req)
    const url = req.body
    console.log(url)
    //To be changed
}

module.exports = {
    getAllProducts,
    getDetailedProduct,
}