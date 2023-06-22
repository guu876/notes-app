const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const validate = require('../middlewares/validationHandler');
const authValidator = require('../validators/authValidator');

router
    .route('/login')
    .post(UsersController.login);

router  
    .route('/register')
    .post([validate(authValidator)], UsersController.register);

router
    .route('/logout')
    .post([], UsersController.logout);

module.exports = router;