const express = require('express');
const router = express.Router();
const needsAuth = require('../middlewares/authMiddleware');

router.route('/')
    .get([needsAuth()], async(req, res, next) => {
        res.status(200).json('OK');
    });

module.exports = router;