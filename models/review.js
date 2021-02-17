const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  title: String,
  comments: String,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
