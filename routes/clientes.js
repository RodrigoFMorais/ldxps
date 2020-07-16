const express = require('express');
const clientesControllers = require('../controllers/clientesControllers');

const router = express.Router();

router
  .route('/')
  .get(clientesControllers.getAllClients)
  .post(clientesControllers.createClient);

router
  .route('/:CDCL')
  .get(clientesControllers.getClient)
  .delete(clientesControllers.deleteClient)
  .patch(clientesControllers.updateClient);

router
  .route('/vendedor/:CDVEND')
  .get(clientesControllers.getClientSeller)

module.exports = router;