const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskname: { type: String, required: true },
  date: { type: Date, required: true },
  isFinish: { type: Boolean, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
