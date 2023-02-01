
const express = require('express');
const router = express.Router();
const property = require('./property');
const user = require('./user');
const open_house = require('./open-house');
const auth = require('./auth');
const AuthController = require('../controllers/AuthController');

router.use('/api/v1', auth)
router.use('/api/v1', AuthController.verifyJWT, open_house);
router.use('/api/v1', AuthController.verifyJWT, user);
router.use('/api/v1', AuthController.verifyJWT, property);

module.exports = router;
