require('dotenv').config(); // MUST be first
const swaggerAutogen = require('swagger-autogen')();

const PORT = process.env.PORT || 5000;

const RAW_HOST = process.env.VERCEL_URL || `localhost:${PORT}`;

const HOST = RAW_HOST.replace(/^https?:\/\//, '');
const SCHEMES = RAW_HOST.includes('localhost') ? ['http'] : ['https'];

const doc = {
  info: {
    title: 'My Contact App Test',
    description: 'The Contact App is built using Node.js and Express.',
  },
  host: HOST,
  schemes: SCHEMES,
};

const outputFile = './swagger-output.json';
const routes = ['../api/server.js'];// <== Point here

swaggerAutogen(outputFile, routes, doc);
