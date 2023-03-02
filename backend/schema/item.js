const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.new,
  },
});

module.exports = mongoose.model("food_item", itemSchema);
