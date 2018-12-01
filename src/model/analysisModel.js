const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  newsId: { type: String, required: true },
  sentiment: Number,
  wordsFrequency: [],
  googleSearched: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const AnalysisModel = mongoose.model('analysis', AnalysisSchema);

module.exports = AnalysisModel;
