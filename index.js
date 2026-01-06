//1 import express
const express = require("express");

//5 db connecct
const db = require("./config/db");

//6 import cors
const cors = require("cors");

//8 import router
const router = require("./router/route");

//mw import
// const appMiddleware = require('./middlewares/appMiddleware')

//2 app creation
const urbanEaseServer = express();

//10 use json middleware
urbanEaseServer.use(express.json());

//11 implementing MW
// urbanEaseServer.use(appMiddleware())

//7 use cors
urbanEaseServer.use(cors());

//9 use router
urbanEaseServer.use(router);


urbanEaseServer.use('/uploads',express.static('./uploads'))

//3 port define
const PORT = 3000;

//4 server start
urbanEaseServer.listen(PORT, () => {
  console.log(`UrbanEase server started on port ${PORT}`);
});
