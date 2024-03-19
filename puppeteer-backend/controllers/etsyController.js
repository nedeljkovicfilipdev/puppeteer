const asyncHandler = require('express-async-handler')

const { getProducts } = require('../scrapers/products')


// Get products
// GET /etsy/getProducts
const getAllProducts = async (req, res) => {
    try{
        const products = await getProducts()
        res.status(200).json(products)
    } catch (error) {
        console.error("Error getting producs: ", error)
        res.status(500).json({error: "Internal Server Error"})
    }
}
//GET single product
const getProduct = async(req, res) => {

}

module.exports = {
    getAllProducts,
    getProduct,
}