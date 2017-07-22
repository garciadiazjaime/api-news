import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: String,
  image: String,
  source: Number,
  status: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
