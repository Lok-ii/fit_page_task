const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const signalRouter = require("./route/signal");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("Connected to Mongo DB"))
  .catch((err) => console.log("Connection failed miserabley ;", err));

app.use("/", signalRouter);
app.all("*", (req, res) => {
  return res.status(404).json({
    status: 404,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log("Server is up and running on port " + PORT);
});
