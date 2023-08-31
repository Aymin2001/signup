const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://ayminbashir2001:WgTxy10DHKZiUVzx@cluster0.eqwmka6.mongodb.net/login';

const connectToMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Connected to the database');
        resolve();
      })
      .catch((err) => {
        console.error('Error connecting to the database', err);
        reject(err);
      });
  });
};

module.exports = connectToMongo;
