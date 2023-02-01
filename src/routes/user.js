const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/user', UserController.createNewUser);
router.get('/users', UserController.getAllUsers);


module.exports = router;
