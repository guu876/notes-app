const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router
    .route('/login')
    .post(UsersController.login);

module.exports = router;