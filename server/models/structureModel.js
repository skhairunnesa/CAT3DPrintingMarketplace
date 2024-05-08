const mongoose = require('mongoose');

const structureSchema = new mongoose.Schema({
    structure_id: { 
        type: Number, 
        required: true 
    }, 
    structure_type: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: false
    },
    image_urls: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    structure_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    designer: {
        type: String,
        required: true
    },
    designer_link: {
        type: String,
        required: true
    } 

});

const Structure = mongoose.model('Structures', structureSchema, 'Structures');

module.exports = Structure;
