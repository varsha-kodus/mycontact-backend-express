const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./docs/swagger-output.json');
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const serverless = require("serverless-http");
const rateLimit = require("express-rate-limit");

connectDb();

const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 15,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  statusCode: 429,
});

// app.use(limiter);
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(contactRoutes);
app.use(userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));

module.exports = app;
module.exports.handler = serverless(app); // For Vercel
