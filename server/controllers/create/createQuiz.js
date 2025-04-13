const Quiz = require("../../models/Quiz");
const Module = require("../../models/Module");
const Notification = require("../../models/Notifications");

const createQuiz = async (req, res) => {
  try {
    const { userId, moduleId, title, description } = req.body;

    // handle errors for userids
    const module = await Module.findById(moduleId);
    if (!module) return res.status(400).json({ message: "module not found" });

    const userNotifications = await Notification.findOne({ userId: userId }); 

    // create new Quiz
    const quiz = new Quiz({
      userId: userId,
      moduleId: moduleId,
      title: title,
      description: description,
      contents: []
    });

    //save the new Quiz
    await quiz.save();

    userNotifications.notifications.push("New flashcard group created!");
    await userNotifications.save();

    res.status(201).json({ message: "Quiz has been created" });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = createQuiz;