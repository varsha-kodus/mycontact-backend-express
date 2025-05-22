require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Contact App',
    description: 'The Contact App is built using Node.js and Express.',
  },
  host: process.env.VERCEL_URL || 'localhost:5000',
  schemes: process.env.VERCEL_URL ? ['https'] : ['http'],
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
