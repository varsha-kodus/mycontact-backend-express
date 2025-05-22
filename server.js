const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./public/swagger-output.json');
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const serverless = require("serverless-http");
const rateLimit = require("express-rate-limit");
const path = require("path");

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

app.use(express.static(path.join(__dirname, "public")));

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// app.use(
//   "/api/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerFile, {
//     swaggerOptions: {
//       url: "/api/test-swagger-json", // ✅ Serve from known-good route
//     }
//   })
// );
// app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// app.get("/api/api-docs", (req, res) => {
//   res.redirect("/swagger.html");
// });

// Optional: redirect to Swagger UI
// app.get("/api-docs", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "swagger.html"));
// });


// app.get("/api/test-swagger-json", (req, res) => {
//   res.sendFile(path.join(__dirname, "./docs/swagger-output.json"));
// });

// Serve the Swagger JSON directly
// app.use(express.static(path.join(__dirname, "public")));
// app.get("/api/test-swagger-json", (req, res) => {
//   res.json(swaggerFile);
// });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/api/test-swagger-json", (req, res) => {
  res.json(swaggerFile);
});


// app.get("/api/api-docs", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "swagger.html"));
// });

// app.use(
//   '/api/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerFile, {
//     swaggerOptions: {
//       url: '/api/test-swagger-json', // optional override
//     },
//     customSiteTitle: 'My API Docs',
//   })
// );

app.use(contactRoutes);
app.use(userRoutes);

// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));

module.exports = app;
module.exports.handler = serverless(app); // For Vercel
