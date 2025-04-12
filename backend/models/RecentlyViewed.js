const { default: mongoose, model } = require("mongoose");

const RecentlyViewedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contents: []
});

const RecentlyViewed = mongoose.model("RecentlyViewed", RecentlyViewedSchema);

module.exports = RecentlyViewed;