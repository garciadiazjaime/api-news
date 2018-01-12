import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  image: String,
  description: [],
  source: { type: String, required: true },
  link: { type: String, required: true },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const NewsModel = mongoose.model('news', NewsSchema);

module.exports = NewsModel;
