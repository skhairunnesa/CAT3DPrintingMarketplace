const {Schema, model} = require("../config/db/conn");

const sellerSchema = new Schema({
    subType: String,
    businessId: String,
    businessName: String,
});

module.exports = sellerSchema;