/** @format */

const ProductModel = require('../models/Product');

const getAll = async (req, res) => {
  const products = await ProductModel.find().exec();

  // If no notes
  if (!products?.length) {
    return res.status(400).json({ message: 'No products found' });
  }

  res.json(products);
};

const remove = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Product ID required' });
  }
  // Confirm product exists to delete
  const product = await ProductModel.findById(id).exec();

  if (!product) {
    return res.status(400).json({ message: 'Product not found' });
  }

  const result = await product.deleteOne();

  const reply = `Product '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
};

const create = async (req, res) => {
  console.log('run');
  const { title, description, price, category, imageUrl, videoUrl } = req.body;
  // Confirm data
  //|| !imageUrl
  if (!title || !description || !price || !category || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate title
  const duplicate = await ProductModel.findOne({ title })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate product title' });
  }

  // Create and store the new pos
  let product = await ProductModel.create({
    title,
    description,
    price,
    category,
    imageUrl,
    videoUrl,
  });

  if (product) {
    // Created
    return res.status(201).json({ message: 'New product created' });
  } else {
    return res.status(400).json({ message: 'Invalid product data received' });
  }
};

const update = async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    imageUrl1,
    imageUrl2,
    videoUrl,
    id,
  } = req.body;

  // Confirm data
  // || !imageUrl
  if (
    (!title || !description || !price || !category || !id,
    !imageUrl1 || !imageUrl2 || !videoUrl)
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Confirm product exists to update
  const product = await ProductModel.findById(id).exec();

  if (!product) {
    return res.status(400).json({ message: '  Product not found' });
  }

  // Check for duplicate title
  const duplicate = await ProductModel.findOne({ title })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original product
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate product title' });
  }
  product.title = title;
  product.text = text;
  product.imageUrl1 = imageUrl1;
  product.imageUrl2 = imageUrl2;
  product.videoUrl = videoUrl;
  product.category = category;
  product.price = price;

  const updatedProduct = await product.save();

  res.json(`'${updatedProduct.title}' updated`);
};

module.exports = {
  update,
  create,
  remove,
  getAll,
};
