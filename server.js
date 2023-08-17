const express = require("express");
require("dotenv").config();
const contacts = require("./router/contact");
const { errorHandler } = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/contacts", contacts);
app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is successfully running in PORT=${port}`);
});
