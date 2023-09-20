const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const path = require("path");

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "API Crud Node MongoDB Express",
            version: "2.0.0"
        },
        servers: [
          {
            url: "http://localhost:9000"
          }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
};

// sttings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use("/api", userRoutes);
app.use(
    "/api-doc",
    swaggerUI.serve,
    swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

//routes
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

// mongodb connection
mongoose
   .connect(process.env.MONGODB_URI)
   .then(() => console.log("Connected to MongoDB Atlas"))
   .catch((error) => console.error(error));

app.listen(port, () => console.log("server listening on port", port));
