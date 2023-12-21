// This is file for autogen of api documentation

const swaggerAutogen = require("swagger-autogen")();


const doc = {
    info: {
        title: ' My API',
        description:'Description'
    },
    host:'localhost:8000'
};

const outFile = './swagger-output.json';
const routes = ['./app.js'];


swaggerAutogen(outFile, routes, doc);