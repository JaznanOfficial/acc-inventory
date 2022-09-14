const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
// const DBConnect = require("./utils/dbConnect");

const app = require("./app");
// const { connectToServer, getDb } = require("./utils/dbConnect");
// const dbConnect = require("./utils/dbConnect");

// database connection

mongoose.connect(process.env.ATLAS_URI).then(() => {
  console.log('database connected successfull'.green.bold);
})

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

