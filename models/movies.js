const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  shortdescription: String,
  description: String,
  category: String,
  date: {
    type: Date,
    default: Date.now,
  },
  url: String,
  image: String,
});

module.exports = mongoose.model("Movie", movieSchema);
