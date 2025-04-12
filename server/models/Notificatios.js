const { default: mongoose } = require("mongoose");
const User = require("./User");


const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notifications: []
});

// create the model
const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;