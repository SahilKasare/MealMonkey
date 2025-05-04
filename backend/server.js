const app = require("./index.js");
const { connectDB } = require("./config/mongoose_config.js");
const PORT = process.env.PORT || 3000;
const { swaggerDocs } = require("./utils/swagger.js");

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDB();
  swaggerDocs(app, PORT);
});
