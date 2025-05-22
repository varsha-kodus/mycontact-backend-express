const express = require("express");
const connectDb = require("../config/dbConnection");
const errorHandler = require("../middleware/errorHandler");
const dotenv = require("dotenv").config();
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../docs/swagger-output.json');
const contactRoutes = require("../routes/contactRoutes");
const userRoutes = require("../routes/userRoutes");
const serverless = require("serverless-http");
const rateLimit = require("express-rate-limit");

 
connectDb();
const app = express();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  "/api-docs",
  swaggerUi.serveFiles(swaggerFile, {
    swaggerOptions: {
      url: "/swagger.json", // We'll serve this manually below
    },
  }),
  swaggerUi.setup(swaggerFile)
);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerFile);
});

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  statusCode: 429,
});

app.use(limiter);

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());



app.use(contactRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
	res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on ${port}`);
// });

module.exports = app;
module.exports.handler = serverless(app);


