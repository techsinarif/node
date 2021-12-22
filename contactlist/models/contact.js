const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {type: String, required: true},
  emailId: {type: String, required: true, unique: true},
  phoneNumber: {type: Number, required: true, unique: true}
}, {collection: 'contacts'});

const model = mongoose.model('contact', contactSchema);

module.exports = model;