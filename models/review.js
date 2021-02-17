const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const reviewSchema = new Schema({
  name: String,
  comments: String,
});

// CREATE MODEL
const Review = mongoose.model("Review", reviewSchema);

// EXPORT
module.exports = Review;
