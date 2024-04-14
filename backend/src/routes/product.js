const express = require('express');

const ProductController = require('../controllers/ProductController');

let router = express.Router();

router.post('/create', ProductController.create);

router.put('/update', ProductController.update);

router.get('/admin/list', ProductController.listAdminSide);

router.get('/customer/list', ProductController.listCustomerSide);

router.get('/customer/detail/:product_id', ProductController.detailCustomerSide);

router.get('/admin/detail/:product_id', ProductController.detailAdminSide);

router.get('/customer/list-colour/:product_id', ProductController.listColour);

router.get('/customer/list-size/:product_id/:colour_id', ProductController.listSize);

module.exports = router;
