const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "upload/" });
const fs = require("fs");
const type = upload.single("file");
mongoose.Promise = global.Promise;
var JSONAPISerializer = require("json-api-serializer");
var Serializer = new JSONAPISerializer({convertCase: "kebab-case",
unconvertCase: "camelCase"});
Serializer.register("users", {
  name: "name"
});
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."
  });
});

require("./app/routes/user.routes.js")(app);
// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
