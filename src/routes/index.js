const express = require('express')
const router = express.Router()

const Auth = require('../middlewares/Auth')
const upload = require('../middlewares/Multer')

const AuthController = require('../controllers/AuthController')
const FreightController = require('../controllers/FreightController')
const ProductController = require('../controllers/ProductController')
const ConfigurationController = require('../controllers/ConfigurationController')
const OrderController = require('../controllers/OrderController')

//Auth Controller
router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)
router.get('/user/info', Auth, AuthController.getUser)

//Product controller
router.get('/products', ProductController.list)
router.post('/products/create/createProductThumb', Auth, upload.single('thumb'), ProductController.createProductThumb)
router.post('/products/create/createProductImages', Auth, upload.array('images'), ProductController.createProductImages)
router.post('/products/create/createProductInfo', Auth, ProductController.createProductInfo)
router.delete('/products/deleteAll', Auth, ProductController.deleteAll)
router.delete('/products/deleteOne', Auth, ProductController.deleteProduct)

//Freight Controller
router.post('/freight/get_price', FreightController.get)

//Configuration Controller
router.get('/configuration', ConfigurationController.list)
router.post('/configuration', Auth, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), ConfigurationController.edit)

//Order Controller
router.get('/orders/list', Auth, OrderController.list)
router.get('/order/info', Auth, OrderController.info)
router.post('/order/new', OrderController.create)
router.delete('/order/delete', Auth, OrderController.delete)

module.exports = router