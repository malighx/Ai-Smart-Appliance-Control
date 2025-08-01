// routes/applianceRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/applianceController');

router.get('/', controller.getAppliances);
router.post('/', controller.addAppliance);
router.put('/:id/status', controller.updateStatus);

module.exports = router;
