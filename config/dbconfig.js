// const mongoose = require('mongoose');

// const connectDB = async () => {
//     const connection = await mongoose.connect('mongodb://127.0.0.1:27017/project1', {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     });
//     console.log('Database Connected');
// }

// module.exports = connectDB;

const mongoose = require('mongoose');

module.exports = async () => {
  try {
    let db = await mongoose.connect('mongodb://' + process.env.HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE, {
    //   auth: {
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD
    //   },
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    global.dbUrl = db.connections[0].db;
    console.log('DB connected successfully');
  } catch (error) {
    console.error(error);
  }
}