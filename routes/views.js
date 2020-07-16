const express = require('express');
const viewsController = require('../controllers/viewsControllers');

const router = express.Router();

router.get('/', viewsController.getHome);
router.get('/cadastravendedor', viewsController.getCreatSeller);
router.get('/cadastracliente', viewsController.getCreatClient);
router.get('/editavendedor/:CDVEND', viewsController.getEditSeller);
router.get('/editacliente/:CDCL', viewsController.getEditClient);

module.exports = router;