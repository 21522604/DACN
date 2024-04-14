const express = require('express');

const CustomerController = require('../controllers/CustomerController');

let router = express.Router();

router.post('/register', CustomerController.register);

router.post('/login', CustomerController.login);

router.put('/update', CustomerController.update);

module.exports = router;
