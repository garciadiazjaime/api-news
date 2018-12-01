import mongoose from 'mongoose';

const openDatabase = dbUrl => mongoose.connect(dbUrl, {
  useNewUrlParser: true, useCreateIndex: true,
});

export default openDatabase;
