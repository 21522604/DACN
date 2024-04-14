const express = require('express');

const OrderController = require('../controllers/OrderController');

let router = express.Router();

router.post('/create', OrderController.create);

router.get('/admin/list', OrderController.listAdminSide);

router.get('/customer/list/:customer_id', OrderController.listCustomerSide);

router.get('/detail/:customer_id/:order_id', OrderController.detailCustomerSide);

router.get('/admin/detail/:order_id', OrderController.detailAdminSide);

router.put('/change-status/:order_id/:state_id', OrderController.changeStatus);

module.exports = router;
