//Module import
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

//Unhandled rejection event error handler
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  // process.exit(1);
});

//Connecting to mongoDB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

//Server Setting
const port = process.env.PORT || 8800;
const server = app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

//Unhandled rejection event error handler
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  // console.log("Unhandled Rejection. Shutting down...");
  // server.close(() => {
  //   process.exit(1);
  // });
});
