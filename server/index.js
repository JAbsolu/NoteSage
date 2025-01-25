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
const getCards = require("./routes/read/getCards");
const getDecks = require("./routes/read/getDecks");
const getModules = require("./routes/read/getModules");
const getPapers = require("./routes/read/getPapers");
const addUserInfo = require("./routes/create/userinfo");
const getDeckCards = require("./routes/read/getDeckCards");
const getUserModules = require("./routes/read/getUserModules");
const getModuleDecks = require("./routes/read/getModuleDecks");
const getModuleTests = require('./routes/read/getModuleTests');
const getUsers = require("./routes/read/getUsers");
const getUser = require("./routes/read/getUser");
const getUserInfo = require("./routes/read/getUserInfo");
const getTests = require('./routes/read/getTests');
const getChoices = require("./routes/read/getChoices")
const getTestMchoices = require('./routes/read/getTestMchoices');
const register = require("./routes/create/register");
const login = require("./routes/read/login");
const updateCard = require('./routes/update/updateCard');
const updatePaper = require('./routes/update/updatePaper');
const updateModule = require('./routes/update/updateModule');
const updateDeck = require('./routes/update/updateDeck');
const updateMultipleChoice = require('./routes/update/updateMultipleChoice');
const updateUser = require('./routes/update/updateUser');
const updateUserInfo = require('./routes/update/updateUserInfo');

 
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
app.use("/cards", getCards);
app.use("/modules", getModules);
app.use("/papers", getPapers);
app.use("/deck-cards", getDeckCards);
app.use("/user-modules", getUserModules);
app.use("/module-decks", getModuleDecks);
app.use("/module-tests", getModuleTests);
app.use("/users", getUsers);
app.use("/user", getUser);
app.use("/user-info", getUserInfo);
app.use("/tests", getTests);
app.use("/choices", getChoices);
app.use("/test-choices", getTestMchoices);
app.use("/register", register);
app.use("/login", login);
app.use("/update-card", updateCard);
app.use("/update-paper", updatePaper);
app.use("/update-module", updateModule);
app.use("/update-deck", updateDeck);
app.use("/update-choice", updateMultipleChoice);
app.use("/update-user", updateUser);
app.use("/update-user-info", updateUserInfo);

// save port and start server
const PORT = 80;

app.listen(PORT, () => {
  console.log(`Server is running at localhost:${PORT}..`);
});