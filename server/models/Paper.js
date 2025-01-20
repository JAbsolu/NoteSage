const { default: mongoose } = require("mongoose");
const UserSchema = require("./User");

const PaperSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UserSchema },
  title: {
    type: String,
    required: true,
  },
  body: String,
  feedback: Array,
});

module.exports = PaperSchema;