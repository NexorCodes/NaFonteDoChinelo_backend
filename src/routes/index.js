const express = require('express')
const router = express.Router()

const Auth = require('../middlewares/Auth')
const upload = require('../middlewares/Multer')

const AuthController = require('../controllers/AuthController')
const FreightController = require('../controllers/FreightController')
const ProductController = require('../controllers/ProductController')

//Auth Controller
router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)

//Product controller
router.get('/products', ProductController.list)
router.post('/products/create/createProductThumb', Auth, upload.single('thumb'), ProductController.createProductThumb)
router.post('/products/create/createProductImages', Auth, upload.array('images'), ProductController.createProductImages)
router.post('/products/create/createProductInfo', Auth, ProductController.createProductInfo)

//Freight Controller
router.post('/freight/get_price', FreightController.get)

module.exports = router