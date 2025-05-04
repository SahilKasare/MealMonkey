// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const logger = require("../utils/logger.js");

// dotenv.config();

// const connectDB = async (uri) => {
//   try {
//     const DB_URI = process.env.MONGO_URL;
//     await mongoose.connect(uri ?? DB_URI, {});
//     console.log("DB Connected");
//   } catch (err) {
//     console.error("MongoDB Connection Error : ", err);
//     process.exit(-1);
//   }
// };

// module.exports = { connectDB };



const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async (uri) => {
  try {
    const DB_URI = process.env.MONGO_URL;
    // Adding recommended options for mongoose connection
    await mongoose.connect(uri ?? DB_URI);
    console.log("DB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error: ", err);
    process.exit(-1);  // Exit the process if DB connection fails
  }
};

module.exports = { connectDB };
