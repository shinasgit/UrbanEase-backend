const express = require('express')

const userController = require("../controllers/userController")

//creaet router
const router = express.Router()

//path regsiter
router.post("/api/register",userController.registerUser)

//path regsiter
router.post("/api/login",userController.loginUser)

//exportrouter
module.exports = router

