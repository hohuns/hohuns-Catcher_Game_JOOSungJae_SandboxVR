//Module import
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const recordRouter = require("./routes/recordRoutes");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

//Start up server
const app = express();

//Allow cors
app.use(cors({ credentials: true, origin: true }));

//Middleware - Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" })); //body larger than 10kb cannot be accepted

//Data Sanitization against NOSQL Query Injection - removing dollar sign
app.use(mongoSanitize());

//For development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Global middleware-Security HTTP Header
app.use(helmet());

//Defining new Global middleware that requesting time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Mounting new Router
app.use(`/api/records`, recordRouter);

//Swagger for api documentation
const options = {
  definition: {
    openapi: "3.0.0",
    servers: [{ url: `http://localhost:8800` }],
    basePath: "/",
    info: {
      title: "Sungjae Catcher Game API",
      version: "1.0.0",
      description: "Sungjae Catcher Game API",
      contact: {
        name: "JOO Sungjae Hans",
        url: "https://hans-web.vercel.app/",
        email: "hohunsjoo1117@gmail.com",
      },
    },
  },
  apis: ["./routes/*.js", "./schema/*.js"],
};
const spacs = swaggereJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));

//Handle wrong route
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Cant find ${req.originalUrl} on this server!`,
  });
  next();
});

module.exports = app;
