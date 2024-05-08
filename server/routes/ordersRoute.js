const router = require('express').Router();
const OrderModel = require('../models/ordersModel');

router.route('/').get((req, res) => {
    OrderModel.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const { orderID, addtocart } = req.body;

    // Create a new order with the provided orderID and addtocart array
    const newOrder = new OrderModel({ orderID, structuresOrdered: addtocart });

    newOrder.save()
        .then(() => res.json('Order added successfully!'))
        .catch(err => res.status(400).json('Error adding order: ' + err));
});

module.exports = router;
