const {Router} = require('express');
const router = Router();

//customers controllers...
const customerController = require('../controllers/customers_controller');




//All Customers Routes...

    //1. NEW CUSTOMERS POSTING...
router.post('/customers/add', customerController.customerPost);

    //2.CUSTOMERS LIST GET/FETCH...
router.get('/customers/list', customerController.customersList);


    //2.DELETE CUSTOMERS FROM LIST...
router.delete('/customer/delete/:id', customerController.customerDelete);







module.exports = router;