require('dotenv/config');
const userService = require('../services/userService');
const { createToken } = require('../utils/createToken');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const create = await userService.createUser({ displayName, email, password, image });
  if (create.err) {
    return res.status(409).json({ message: 'User already registered' });
  }
  const token = createToken(email, create.id);
  return res.status(201).json({ token });
};

const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (user.err) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = createToken(email, user.id);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllUser = async (_req, res) => {
  const allUser = await userService.getAllUser();
  return res.status(200).json(allUser);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (user.err) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  await userService.deleteUser(req.headers.user);
  return res.status(204).end();
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  getUserByEmail,
  deleteUser,
};
