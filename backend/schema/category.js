const mongoose = require("mongoose");
const { Schema } = mongoose;

const catogorySchema = new Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.new,
  },
});

module.exports = mongoose.model("food_category", catogorySchema);
