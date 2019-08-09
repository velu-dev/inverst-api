module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new Note
    app.post('/users', users.create);

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:noteId', users.findOne);

    // Update a Note with noteId
    app.put('/users/:noteId', users.update);

    // Delete a Note with noteId
    app.delete('/users/:noteId', users.delete);
}