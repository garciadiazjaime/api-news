const mongoose = require('mongoose');

const GoogleSearchSchema = new mongoose.Schema({
  analysisId: { type: String, required: true },
  title: String,
  description: String,
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const GoogleSearchModel = mongoose.model('googleSearch', GoogleSearchSchema);

module.exports = GoogleSearchModel;
