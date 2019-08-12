const multer = require("multer");
const upload = multer({ dest: "upload/" });
const fs = require("fs");
const type = upload.single("file");

module.exports = function(app) {
  const users = require("../controllers/user.controller.js");

  // Create a new user
  app.post("/users", users.create);

  // Retrieve all users
  app.get("/users", users.findAll);

  // Retrieve a single user with userId
  app.get("/users/:userId", users.findOne);

  // Update a user with userId
  app.put("/users/:userId", users.update);

  // Delete a user with userId
  app.delete("/users/:userId", users.delete);
  app.post("/upload_profile_pic",type,  users.upload_profile_pic);
};
