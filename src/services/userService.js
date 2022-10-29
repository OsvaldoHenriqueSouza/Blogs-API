const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
  const verifyIfEmailExisting = await User.findOne({ where: { email } });
  if (verifyIfEmailExisting) {
    return { err: 'EXISTS' };
  }
  const result = await User.create({ displayName, email, password, image });
  return result;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return { err: 'USER_NOT_FOUND' };
  }
  return user;
};

const getAllUser = async () => {
  const allUser = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUser;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) {
    return { err: 'USER_NOT_FOUND' };
  }
  return user;
};

const deleteUser = async (email) => {
  await User.destroy({ where: { email } });
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  getUserByEmail,
  deleteUser,
};
