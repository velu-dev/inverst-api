const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "User content can not be empty"
    });
  }

  // Create a User
  const user = new User({
    name: req.body.name || "Untitled User",
    email: req.body.email,
    password: req.body.password
  });

  // Save User in the database
  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId
      });
    });
};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "User content can not be empty"
    });
  }

  // Find User and update it with the request body
  User.findByIdAndUpdate(
    req.params.userId,
    {
      title: req.body.title || "Untitled user",
      content: req.body.content
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId
      });
    });
};
//Upload image
exports.upload_profile_pic = (req, res) => {
  console.log("req", req);
  var target_path = "uploads/" + req.file.originalname;
  User.findByIdAndUpdate(
    req.body.id,
    {
      profile_pic: target_path || "Untitled user"
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId
      });
    });
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      res.send({ message: "user deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId
      });
    });
};
