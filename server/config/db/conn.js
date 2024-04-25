const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// Replace the uri string with your connection string.
const uri = process.env.ATLAS_URI;


if (mongoose.connect(uri)) {
  console.log('Connected to MongoDB');
}

module.exports = {
  Schema,
  model
};