const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var app = express();
const helmet = require("helmet");
app.use(helmet());
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Swagger setup
const swaggerOptions = {
  explorer: true,
  swaggerDefinition: {
    info: {
      title: "Quest Hour API",
      description: "Quest Hour API Documentation",
      version: "1.0.0",
      servers: [`http://localhost:${port}`],
    },
  },

  apis: [
    "server.js",    
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs-quest", swaggerUi.serve, swaggerUi.setup(swaggerDocs));




require('dotenv').config();
const port = process.env.PORT | 5000;
var uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, });
const connection = mongoose.connection;
connection.once('open', () => {
	console.error('connected to mongodb database successfully');
}).on('error', () => {
	console.error('error connecting to the database');
});

app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('short'));
app.use(express.json());

app.use(passport.initialize());

const userRouter = require('./routes/admin');
const routes = require('./routes');
app.use('/admin', userRouter);
app.use('/lol', routes);

app.listen(port, () => {
	console.log(`server started on port ${port}`);
});
