const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
