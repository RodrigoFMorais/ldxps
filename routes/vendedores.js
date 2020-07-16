const express = require('express');
const vendedoresControllers = require('../controllers/vendedoresControllers');

const router = express.Router();

router
  .route('/')
  .get(vendedoresControllers.getAllSellers)
  .post(vendedoresControllers.createSeller);

router
  .route('/:CDVEND')
  .get(vendedoresControllers.getSeller)
  .delete(vendedoresControllers.deleteSeller)
  .patch(vendedoresControllers.updateSeller);

module.exports = router;