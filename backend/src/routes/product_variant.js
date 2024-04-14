const express = require('express');

const uploadImage = require('../midlewares/uploadImage');
const ProductVariantController = require('../controllers/ProductVariantController');

let router = express.Router();

router.post('/create', ProductVariantController.create);

router.put('/update', ProductVariantController.update);

router.put('/on', ProductVariantController.onState);

router.put('/off', ProductVariantController.offState);

router.put('/update-quantity', ProductVariantController.updateQuantity);

router.delete('/delete', ProductVariantController.deleteProductVariant);

router.get('/customer/detail/:product_id/:colour_id/:size_id', ProductVariantController.detailCustomerSide);


module.exports = router;
