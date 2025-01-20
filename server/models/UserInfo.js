const { default: mongoose } = require("mongoose");
const UserSchema = require("./User");

const UserInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UserSchema },
  intro: String,
  school: String,
  graduationDate: Date,
  image: String,
  Socials: Array,
});

module.exports = UserInfoSchema;