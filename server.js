const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger-output.json');
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

connectDb();
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());

app.use(contactRoutes);
app.use(userRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = app;
