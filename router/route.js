const express = require('express')

const userController = require("../controllers/userController")
const houseController = require("../controllers/houseController")
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const multerConfig = require("../middlewares/multerMiddleware")
const adminJwtMiddleware = require('../middlewares/adminMiddleware')
const providerJwtMiddleware = require('../middlewares/providerMiddleware')
const appController = require("../controllers/appController")
const helperController = require("../controllers/helperController")

//creaet router
const router = express.Router()

//path regsiter
router.post("/api/register",userController.registerUser)

//path regsiter
router.post("/api/login",userController.loginUser)

//path regsiter
router.post("/api/google-login",userController.googleAuth)

//add house
router.post("/api/housebookSP",providerJwtMiddleware,multerConfig.array('uploadImage',3),houseController.addHouse)

//get user - admin
router.get('/api/admin-users',adminJwtMiddleware,userController.adminUserDetails)

//get house - user
router.get('/api/housebook',jwtMiddleware,houseController.getHouse)

//add appliance SP
router.post("/api/applianceSP",providerJwtMiddleware,appController.addApp)

//add helper SP
router.post("/api/helperSP",providerJwtMiddleware,helperController.addHelp)

//export router 
module.exports = router

