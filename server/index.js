require('dotenv').config();
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const bodyparser = require("body-parser");
const dbConnection = require("./database/index")
const createCard = require("./routes/create/card");
const createDeck = require('./routes/create/deck');
const createModule = require('./routes/create/module');
const createPaper = require("./routes/create/paper");
const createMultipleChoice = require("./routes/create/multiplechoice");
const createNotificationList = require("./routes/create/createNotificationList");
const createTask = require("./routes/create/task");
const getNotifications = require("./routes/read/getNotifications");
const createQuiz = require("./routes/create/quiz");
const getCards = require("./routes/read/getCards");
const getDecks = require("./routes/read/getDecks");
const getModules = require("./routes/read/getModules");
const getPapers = require("./routes/read/getPapers");
const addUserInfo = require("./routes/create/userinfo");
const getDeckCards = require("./routes/read/getDeckCards");
const getUserModules = require("./routes/read/getUserModules");
const getModuleDecks = require("./routes/read/getModuleDecks");
const getModuleQuizzes = require('./routes/read/getModuleQuizzes');
const getUsers = require("./routes/read/getUsers");
const getUser = require("./routes/read/getUser");
const getUserInfo = require("./routes/read/getUserInfo");
const getQuizzes = require('./routes/read/getQuizzes');
const getUserQuizzes = require("./routes/read/getUserQuizzes");
const getChoices = require("./routes/read/getChoices")
const getQuizzMchoices = require('./routes/read/getQuizzMchoices');
const getUserDecks = require("./routes/read/getUserDecks");
const getUserTasks = require("./routes/read/getUserTasks");
const register = require("./routes/create/register");
const login = require("./routes/read/login");
const updateCard = require('./routes/update/updateCard');
const updatePaper = require('./routes/update/updatePaper');
const updateModule = require('./routes/update/updateModule');
const updateDeck = require('./routes/update/updateDeck');
const updateMultipleChoice = require('./routes/update/updateMultipleChoice');
const updateUser = require('./routes/update/updateUser');
const updateUserInfo = require('./routes/update/updateUserInfo');
const updateQuiz = require("./routes/update/updateQuiz");
const deleteRoutes = require("./routes/deletes/deletes");
const sendEmail = require("./routes/email/index");
const updateTask = require('./routes/update/updateTask');

// create express app
const app = express();
// app.use(cors({
//   origin: "https://note-sage.com/" 
// }));
app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
dbConnection();

// Use routes
app.use("/create-card", createCard);
app.use("/create-deck", createDeck);
app.use("/create-module", createModule);
app.use("/create-paper", createPaper);
app.use("/create-multiple-choice", createMultipleChoice);
app.use("/create-notification-list", createNotificationList);
app.use("/add-user-info", addUserInfo);
app.use("/create-quiz", createQuiz);
app.use("/create-task", createTask);
app.use("/decks", getDecks);
app.use("/cards", getCards);
app.use("/modules", getModules);
app.use("/papers", getPapers);
app.use("/deck-cards", getDeckCards);
app.use("/user-modules", getUserModules);
app.use("/module-decks", getModuleDecks);
app.use("/module-quizzes", getModuleQuizzes);
app.use("/users", getUsers);
app.use("/user", getUser);
app.use("/user-info", getUserInfo);
app.use("/user-decks", getUserDecks);
app.use("/quizzes", getQuizzes);
app.use("/user-quizzes", getUserQuizzes);
app.use("/user-tasks", getUserTasks);
app.use("/choices", getChoices);
app.use("/quiz-choices", getQuizzMchoices);
app.use("/notifications", getNotifications);
app.use("/register", register);
app.use("/login", login);
app.use("/update-card", updateCard);
app.use("/update-paper", updatePaper);
app.use("/update-module", updateModule);
app.use("/update-deck", updateDeck);
app.use("/update-choice", updateMultipleChoice);
app.use("/update-user", updateUser);
app.use("/update-user-info", updateUserInfo);
app.use("/update-quiz", updateQuiz);
app.use("/update-task", updateTask);
app.use("/send-email", sendEmail);

// all delete routes
app.use("/", deleteRoutes);

// save port and start server
const PORT = 5000;

// Listen on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server is running at localhost:${PORT}..`);
// }); 
