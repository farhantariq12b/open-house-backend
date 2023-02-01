const express = require('express');
const OpenHouseController = require('../controllers/OpenHouseController');

const router = express.Router();

router.put('/enroll-user/:id', OpenHouseController.enrollUser);
router.put('/remove-user/:id', OpenHouseController.unEnrollUser);


module.exports = router;
