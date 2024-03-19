const express = require("express")
const {
    getAllProducts,
    getProduct,
} = require('../controllers/etsyController')
 
const router = express.Router()

router.get("/getProducts", getAllProducts)

router.get("/product", getProduct)

//router.route('/:id').patch().delete()

module.exports = router