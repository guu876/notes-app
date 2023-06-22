const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/v1/notes', require('./noteRoutes'));

module.exports = router;