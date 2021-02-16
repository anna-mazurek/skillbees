const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url = "https://i.stack.imgur.com/34AD2.jpg";

const teacherSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: url },
  about: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
