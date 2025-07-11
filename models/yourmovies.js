const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yourmoviesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
});

module.exports = mongoose.model("Your", yourmoviesSchema);
