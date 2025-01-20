require('dotenv').config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const dBconnection = require("./server/database/")
 
// create express app
const app = express();
 
// use cors
app.use(cors());
 
// use body-parser
app.use(bodyparser.json());
 
//connect to the database
dBconnection();
 
// save port and start server
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running at localhost:${PORT}..`);
});