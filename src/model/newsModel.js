import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: [],
  image: String,
  url: { type: String, required: true },
  source: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const NewsModel = mongoose.model('news', NewsSchema);

export default NewsModel;
