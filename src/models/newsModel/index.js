import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: String,
  image: String,
  source: Number,
  status: Boolean,
  created_at: Date,
  updated_at: Date,
});

// newsSchema.pre('save', (next) => {
//   console.log('next', next);
//   const currentDate = new Date();
//   this.updated_at = currentDate;
//
//   if (!this.created_at) {
//     this.created_at = currentDate;
//   }
//
//   next();
// });

const News = mongoose.model('News', newsSchema);

module.exports = News;
