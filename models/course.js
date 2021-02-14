const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true },
  technology: { type: String, required: true },
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  description: { type: String },
  link: { type: String },
  image: { type: String },
  duration: { type: String },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
