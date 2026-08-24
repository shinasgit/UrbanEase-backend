const express = require('express')

const userController = require("../controllers/userController")
const houseController = require("../controllers/houseController")
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const multerConfig = require("../middlewares/multerMiddleware")
const adminJwtMiddleware = require('../middlewares/adminMiddleware')
const providerJwtMiddleware = require('../middlewares/providerMiddleware')
const appController = require("../controllers/appController")
const helperController = require("../controllers/helperController")
const bookController = require("../controllers/bookController")
const communityController = require("../controllers/communityController")
const vehicleController = require("../controllers/vehicleController")

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

//delete user - admin
router.delete('/api/admin-user-delete/:id',adminJwtMiddleware,userController.deleteUser)

//get house - user
router.get('/api/housebook',jwtMiddleware,houseController.getHouse)

//add appliance SP
router.post("/api/applianceSP",providerJwtMiddleware,appController.addApp)

//add helper SP
router.post("/api/helperSP",providerJwtMiddleware,helperController.addHelp)

//get app - user
router.get('/api/appliance',jwtMiddleware,appController.getAppliance)

//get helper - user
router.get('/api/helper',jwtMiddleware,helperController.getHelper)

//get modal vieew -user 
router.get('/api/modalView/:id',jwtMiddleware,houseController.modalView)

//edit prof - admin
router.put('/api/adminprofile-edit',adminJwtMiddleware,multerConfig.single('profile'),userController.editProf)

//booking user-admin
router.post('/api/booking',jwtMiddleware,bookController.bookItem)

//get booking details admin 
router.get('/api/userbooking',adminJwtMiddleware,bookController.getBookAdmin)

//make payment
router.put('/api/appliance/book',jwtMiddleware,appController.bookAppliance)

router.post('/api/makePayment',jwtMiddleware,appController.makePayment)

//community listings
router.post("/api/community-listing", jwtMiddleware, multerConfig.array('uploadImage', 3), communityController.addListing)
router.get("/api/community-listing", jwtMiddleware, communityController.getAllListings)
router.get("/api/community-listing/my-listings", jwtMiddleware, communityController.getUserListings)

//vehicle routes
router.post("/api/vehicleSP", providerJwtMiddleware, multerConfig.array('uploadImage', 3), vehicleController.addVehicle)
router.get("/api/vehicles", jwtMiddleware, vehicleController.getVehicles)

//upgrade to provider
router.post("/api/upgrade-provider", jwtMiddleware, userController.upgradeToProvider)

//export router 
module.exports = router

