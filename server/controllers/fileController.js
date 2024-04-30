const CatalogFile = require('../models/structures-model');

exports.uploadFile = async (req, res) => {
  try {
    const { tags, structureType, userId, price } = req.body;

    const newFile = new CatalogFile({
      tags: tags.split(',').map(tag => tag.trim()),
      structureType,
      userId,
      images: req.files['imageFiles'] ? req.files['imageFiles'].map(file => file.path) : [],
      price,
      pdfs: req.files['pdfFiles'] ? req.files['pdfFiles'].map(file => file.path) : [],
    });
    await newFile.save();

    res.send('Files uploaded successfully and database updated with new entry');
  } catch (error) {
    console.error('Error in uploading files or database update:', error);
    res.status(500).send('Error in uploading files or database update');
  }
};