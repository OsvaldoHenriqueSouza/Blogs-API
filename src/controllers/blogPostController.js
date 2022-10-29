const blogPostService = require('../services/blogPostService');

const getAllPost = async (_req, res) => {
  const allPost = await blogPostService.getAllPost();
  return res.status(200).json(allPost);
};

const getByIdPost = async (req, res) => {
  const { id } = req.params;
  const postById = await blogPostService.getByIdPost(id);
  if (postById.err) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(postById);
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req.headers;
  const newPost = await blogPostService.createPost({ title, content, categoryIds, userId });
  if (newPost.err) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  return res.status(201).json(newPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostService.deletePost(id, req.headers.user);
  if (post.err === 'NOT_EXISTS') {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  if (post.err === 'ERRO_AUTHORIZATION') {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  return res.status(204).end();
};

const getBySearch = async (req, res) => {
  const { q } = req.query;
  const post = await blogPostService.getBySearch(q);
  return res.status(200).json(post);
};

const updatePostID = async (req, res) => {
  const { id } = req.params;
  const email = req.headers.user;
  const update = await blogPostService.updatePostID({ id, email, ...req.body });
  if (update.err) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  getByIdPost(req, res);
};

module.exports = {
  getAllPost,
  getByIdPost,
  deletePost,
  getBySearch,
  createPost,
  updatePostID,
};
