const mongoose = require('mongoose');

const openDatabase = dbUrl => mongoose.connect(dbUrl, {
  useNewUrlParser: true, useCreateIndex: true,
});

module.exports = openDatabase;
