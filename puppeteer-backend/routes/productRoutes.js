const express = require("express")
const {
    getAllProducts,
    getDetailedProduct,
} = require('../controllers/etsyController')
 
const router = express.Router()

//Scrape all products and their detailed informations
router.get("/getProducts", getAllProducts)

//router.post("/product", getDetailedProduct)

//router.route('/:id').patch().delete()

module.exports = router