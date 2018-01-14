import mongoose from 'mongoose';

const openDatabase = dbUrl => mongoose.connect(dbUrl);

export default openDatabase;
