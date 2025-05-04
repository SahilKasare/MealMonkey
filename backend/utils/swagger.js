const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const version = require("../package.json").version;


const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Meal Monkey API Docs",
            version: "1.0.0",
        },
        components:{
            securitySchemes:{
                bearerAuth:{
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            }
        ],
    },
    apis: ["./routes/*.js"],
}

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, port){
    //Swagger Page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get('/docs.json', (req, res)=> {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    })

    console.log(`Docs available at http://localhost:${port}/docs`);
}

module.exports = {swaggerDocs};

//authorized : value: sahil