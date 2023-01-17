/** @format */

const PostModel = require('../models/Post');

const getLastTags = async (req, res) => {
  // Get all posts from MongoDB
  const posts = await PostModel.find().limit(5).exec();

  // If no posts
  if (!posts?.length) {
    return res.status(400).json({ message: 'No posts found' });
  }

  //get five Last Tags to the post
  const tags = posts.map((obj) => obj.tags).flat();

  const lastTags = Array.from(new Set(tags)).slice(0, 5);

  res.json(lastTags);
};

const getAll = async (req, res) => {
  const posts = await PostModel.find().populate('user').exec();

  // If no notes
  if (!posts?.length) {
    return res.status(400).json({ message: 'No posts found' });
  }

  res.json(posts);
};

const getOne = async (req, res) => {
  const { id } = req.body;

  //get Unique Post to MongoDb
  const post = await PostModel.findById(id).populate('user').exec();
  if (!post) {
    return res.status(400).json({ message: '  Post not found' });
  }

  //increment post
  post.viewsCount = post.viewsCount + 1;
  const updatedPost = await post.save();

  // give update post
  res.json(updatedPost);
};

const remove = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Note ID required' });
  }
  // Confirm post exists to delete
  const post = await PostModel.findById(id).exec();

  if (!post) {
    return res.status(400).json({ message: 'Post not found' });
  }

  const result = await post.deleteOne();

  const reply = `Post '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
};

const create = async (req, res) => {
  const { title, text, imageUrl, tags } = req.body;
  const user = req.userId;

  // Confirm data
  //|| !imageUrl
  if (!title || !text || !tags) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate title
  const duplicate = await PostModel.findOne({ title })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate post title' });
  }

  // Create and store the new pos
  let post;
  if (user) {
    post = await PostModel.create({ title, text, imageUrl, user, tags });
  } else {
    post = await PostModel.create({ title, text, imageUrl, tags });
  }

  if (post) {
    // Created
    return res.status(201).json({ message: 'New post created' });
  } else {
    return res.status(400).json({ message: 'Invalid post data received' });
  }
};

const update = async (req, res) => {
  const { title, text, imageUrl, id, tags } = req.body;
  const user = req.userId;

  // Confirm data
  // || !imageUrl
  if (!title || !text || !tags || !user || !id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Confirm post exists to update
  const post = await PostModel.findById(id).exec();

  if (!post) {
    return res.status(400).json({ message: '  Post not found' });
  }

  // Check for duplicate title
  const duplicate = await PostModel.findOne({ title })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original post
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate post title' });
  }
  post.title = title;
  post.text = text;
  post.imageUrl = imageUrl;
  post.user = user;
  post.tags = tags;

  const updatedPost = await post.save();

  res.json(`'${updatedPost.title}' updated`);
};

module.exports = {
  update,
  create,
  remove,
  getOne,
  getAll,
  getLastTags,
};
