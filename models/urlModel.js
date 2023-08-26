const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlModelsSchema = new Schema({
  originalURL: {
    type: String,
    required: true,
  },
  randomURL: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("urlModel", urlModelsSchema);
