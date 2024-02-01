const mongoose = require('mongoose');

const db = async () => {
  const mongoURI = 'mongodb://127.0.0.1:27017/student';
//   localhost ip 127.0.0.1
  mongoose.connect(mongoURI);
};

module.exports = db;
