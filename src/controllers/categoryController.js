const categoriesService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = await categoriesService.createCategory(name);
  return res.status(201).json({ id: newCategory.null, name });
};

const getAllCategories = async (req, res) => {
  const allCategories = await categoriesService.getAllCategories();
  return res.status(200).json(allCategories);
};

module.exports = {
  createCategory,
  getAllCategories,
};
