const { Op } = require('sequelize');
const { BlogPost, Category, User, PostCategory } = require('../models');

const getAllPost = async () => {
  const allPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return allPost;
};

// 

const getByIdPost = async (id) => {
  const postById = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  if (!postById) {
    return { err: 'NOT_EXISTS' };
  }
  return postById;
};

const createPost = async ({ title, content, categoryIds, userId }) => {
  const iteracaoCategoryIds = await Promise.all(categoryIds.map(async (item) => {
    const categories = await Category.findOne({ where: { id: item } });
    return categories;
  }));
  const result = iteracaoCategoryIds.some((item) => item !== null);
  if (!result) {
    return { err: 'NOT_EXISTS' };
  }
  const post = await BlogPost.create({ title, content, categoryIds, userId });
  await Promise.all(categoryIds.map(
    async (categoryId) => {
      console.log(post);
      await PostCategory.create({ postId: post.dataValues.id, categoryId });
    },
  ));
  return post;
};

const deletePost = async (id, email) => {
  const user = (await User.findOne({ where: { email } })).id;
  const post = await BlogPost.findByPk(id);
  if (!post) {
    return { err: 'NOT_EXISTS' };
  }
  if (user !== post.userId) {
    console.log('autorização');
    return { err: 'ERRO_AUTHORIZATION' };
  }
  await post.destroy();
  return post;
};

const getBySearch = async (q) => {
  const post = await BlogPost.findAll({
    where: {
      [Op.or]: {
        title: { [Op.like]: `%${q}%` },
        content: { [Op.like]: `%${q}%` },
      },
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const updatePostID = async ({ id, email, title, content }) => {
  const userId = (await User.findOne({ where: { email } })).id;
  const idUpdated = (await BlogPost.findByPk(id)).userId;
  if (userId !== idUpdated) {
    return { err: 'ERRO_AUTHORIZATION' };
  }
  const dateNow = new Date();
  const update = await BlogPost.update({ title, content, updated: dateNow }, { where: { id } });
  return update;
};

module.exports = {
  getAllPost,
  getByIdPost,
  deletePost,
  getBySearch,
  createPost,
  updatePostID,
};
