const express = require('express')

const userController = require("../controllers/userController")

//creaet router
const router = express.Router()

//path regsiter
router.post("/api/register",userController.registerUser)

//path regsiter
router.post("/api/login",userController.loginUser)

//path regsiter
router.post("/api/google-login",userController.googleAuth)

//export router 
module.exports = router

