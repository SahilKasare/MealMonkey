const express = require("express");
const path = require('path');
const cookieParser = require("cookie-parser");
const multer = require("multer"); 
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
require("./config/mongoose_config.js");
const { swaggerDocs } = require("./utils/swagger.js");
const winston = require('winston');
const morgan = require('morgan');
const logger = require('./utils/logger.js');
const fs = require('fs');
const helmet = require('helmet');
const redis = require('redis')
// Load environment variables

const redisClient = redis.createClient();

(async () => {
  redisClient.on("error", (err) => {
    console.error("Redis client error", err);
  });

  redisClient.on("ready", () => {
    console.error("Redis client started"); 
  });

  await redisClient.connect();
  await redisClient.ping();
   
})();
module.exports = redisClient;
// Middleware
const app = express();
dotenv.config();

//Application level middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://mealmonkey-food.vercel.app'], // Your frontend URL
    credentials: true // This allows cookies to be included in cross-origin requests
}));
app.use(cookieParser());
// app.use(helmet());

//Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
// // File Storage
// const Storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });


// const upload = multer({ storage: Storage });

// Ensure logs directory exists
const logDirectory = path.join(__dirname, './utils/logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}
// Create a write stream for logging requests
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

// Third party middleware
app.use(morgan('combined', { stream: accessLogStream }));  // Logs to access.log
app.use(morgan('tiny', { stream: { write: message => logger.info(message.trim()) } }));  // Logs to Winston


app.get('/error-test', (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err); // Pass the error to the error-handling middleware
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} - ${err.message}`);
    res.status(500).send('Internal Server Error');
});

// Routes
const indexRouter = require("./routes/indexRouter.js");
const customerRouter = require("./routes/customerRouter.js");
const restaurantRouter = require("./routes/restaurantRouter.js");
const deliveryPartnerRouter = require("./routes/deliveryPartnerRouter.js");
const adminRouter = require("./routes/adminRouter.js");

app.use("/", indexRouter);
app.use("/customer", customerRouter);
app.use("/restaurant", restaurantRouter);
app.use("/deliveryPartner", deliveryPartnerRouter);
app.use("/admin", adminRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    swaggerDocs(app, PORT);
});
