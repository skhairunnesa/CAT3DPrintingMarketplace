const mongoose = require('mongoose');

const catalogFileSchema = new mongoose.Schema({
  structureType: String,
  userId: String,
  images: [{ type: String }],
  tags: [{ type: String }],
  price: Number,
  pdfs: [{ type: String }],
}, { collection: 'Structures', timestamps: true });

const catalogFile = mongoose.model('Structures', catalogFileSchema);

module.exports = catalogFile;
