const {Schema, model} = require("../config/db/conn");

const sellerSchema = new Schema({
    subType: String,
    businessId: String,
    businessName: String,
    seller_picture: Object,
    seller_website: String,
    seller_phoneNumber: String, 
    seller_address: String, 
    seller_zipcode: String, 
    seller_summary: String, 
    seller_partners: Array, 
    seller_website_visability: Boolean
});

module.exports = sellerSchema;