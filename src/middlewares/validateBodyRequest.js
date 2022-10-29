const verifyLengthDisplayName = async (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
  
const verifyFormatEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

const verifyLengthPassword = async (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400)
    .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

const verifyAllFieldLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const verifyNameCategories = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  next();
};

const verifyAllFieldPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const verifyAllFieldUpdatePost = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  verifyLengthDisplayName,
  verifyFormatEmail,
  verifyLengthPassword,
  verifyAllFieldLogin,
  verifyNameCategories,
  verifyAllFieldPost,
  verifyAllFieldUpdatePost,
};
