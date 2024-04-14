const express = require('express');

const SizeController = require('../controllers/SizeController');

let router = express.Router();

router.post('/create', SizeController.create);

router.get('/list', SizeController.list);

module.exports = router;
