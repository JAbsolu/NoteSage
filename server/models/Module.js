const { default: mongoose } = require("mongoose")
const UserSchema = require("./User")

const ModuleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UserSchema },
  content: Array,
  isPublic: Boolean,
});

module.exports = ModuleSchema;