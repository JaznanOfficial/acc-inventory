const express = require('express')
const router = express.Router()
const productController = require('../controller/product.controller')

router.route('/')
    .get()
    .post(productController.createProduct)


module.exports = router;