const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Category'
  },
});

module.exports = mongoose.model('Product', ProductSchema);
