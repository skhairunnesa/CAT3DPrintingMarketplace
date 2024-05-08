const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define a sub-schema for addtocart objects
const AddtoCartSchema = new Schema({
    user_id: { type: Number, required: true },
    designer: { type: String, required: true },
    product_id: { type: String, required: true },
    numBed: { type: Number, require: true },
    numBath: { type: Number, require: true },
    q: { type: Number, required: true },
    total_cost: { type: Number, required: true },
    tags: [{ type: String, required: false }],
}, {
    timestamps: true,
});

// Define the order schema including the array of addtocart objects
const orderSchema = new Schema({
    orderID: { type: String, required: true },
    structuresOrdered: [AddtoCartSchema], // Array of addtocart objects
}, {
    timestamps: true,
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
