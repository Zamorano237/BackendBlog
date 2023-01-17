/** @format */

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        'https://cdn.shopify.com/s/files/1/0567/6302/3499/products/74-2_840x.png?v=1643748764',
    },
    videoUrl: {
      type: String,
      default: 'https://www.youtube.com/@qhseacademie1043',
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', ProductSchema);
