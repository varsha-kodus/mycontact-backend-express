require('dotenv').config(); // Load .env variables
const swaggerAutogen = require('swagger-autogen')();

const PORT = process.env.PORT || 5000;

// Dynamically determine host
const HOST = process.env.VERCEL_URL || `localhost:${PORT}`;
const SCHEMES = HOST.includes('localhost') ? ['http'] : ['https'];

const doc = {
  info: {
    title: 'My Contact App',
    description: 'The Contact App is built using Node.js and Express.'
  },
  host: HOST,
  schemes: SCHEMES
};

const outputFile = './swagger-output.json';

// ⚠️ Pass ONLY the root route file (entry point like app.js or index.js)
const routes = ['./routes/userRoutes.js', './routes/contactRoutes.js'];

swaggerAutogen(outputFile, routes, doc);
