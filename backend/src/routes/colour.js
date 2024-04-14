const express = require('express');

const ColourController = require('../controllers/ColourController');

let router = express.Router();

router.post('/create', ColourController.create);

router.get('/list', ColourController.list);

module.exports = router;
