const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('User Service: MongoDB Connected');
    console.log("Connected to DB:", mongoose.connection.name);

  } catch (error) {
    console.error('User Service DB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
