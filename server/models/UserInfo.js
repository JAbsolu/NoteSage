const { default: mongoose } = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  intro: String,
  school: String,
  graduationDate: Date,
  image: String,
  socials: Map,
});

// create the model
const UserInfo = mongoose.model("UserInfo", UserInfoSchema);

module.exports = UserInfo;