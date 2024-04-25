const {Schema} = require("../config/db/conn");

const buyerSchema = new Schema({
    subtype: String,
    experience: String,
    interests: [String]
});

module.exports = buyerSchema;