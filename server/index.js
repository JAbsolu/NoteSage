require('dotenv').config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const dbConnection = require("./database/index")
const createCard = require("./routes/create/card");
const createDeck = require('./routes/create/deck');
const createModule = require('./routes/create/module');
const createPaper = require("./routes/create/paper");
const createMultipleChoice = require("./routes/create/multiplechoice");
const createTest = require("./routes/create/test");
const getDecks = require("./routes/read/getDecks");
const getModules = require("./routes/read/getModules");
const getPapers = require("./routes/read/getPapers");
const addUserInfo = require("./routes/create/userinfo");
const getUserDecks = require("./routes/read/getUserDecks");
const register = require("./routes/create/register");
const login = require("./routes/read/login");
 
// create express app
const app = express();
// use cors
app.use(cors());
// use body-parser
app.use(bodyparser.json());
//connect to the database
dbConnection();

// Use routes
app.use("/create-card", createCard);
app.use("/create-deck", createDeck);
app.use("/create-module", createModule);
app.use("/create-paper", createPaper);
app.use("/create-multiple-choice", createMultipleChoice);
app.use("/add-user-info", addUserInfo);
app.use("/create-test", createTest);
app.use("/decks", getDecks);
app.use("/modules", getModules);
app.use("/papers", getPapers);
app.use("/user-decks", getUserDecks);
app.use("/register", register);
app.use("/login", login);

// save port and start server
const PORT = 80;

app.listen(PORT, () => {
  console.log(`Server is running at localhost:${PORT}..`);
});