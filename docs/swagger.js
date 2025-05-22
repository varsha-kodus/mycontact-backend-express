const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Contact App',
    description: 'Node.js Express API',
  },
  host: process.env.VERCEL_URL || 'localhost:5000',
  schemes: ['https'],
};

const outputFile = './docs/swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);