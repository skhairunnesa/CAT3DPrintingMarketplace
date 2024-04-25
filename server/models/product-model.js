const {Schema, model} = require("../config/db/conn");

const productSchema = new Schema({
     structure_id: Number,
     structure_type: String,
     user_id: Number,
     price: [Number],
     images: [String],
     tags: [String],
     files: [String],
     custom_options: [String]
});

module.exports = Product = model("Structure", productSchema);
