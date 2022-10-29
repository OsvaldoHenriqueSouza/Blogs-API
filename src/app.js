const express = require('express');
const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');
const { verifyLengthDisplayName, verifyFormatEmail,
verifyLengthPassword, verifyAllFieldLogin,
verifyNameCategories, verifyAllFieldPost,
verifyAllFieldUpdatePost } = require('./middlewares/validateBodyRequest');
const { validateJwt } = require('./auth/validateJwt');
// ...

const app = express();

app.use(express.json());

app.post('/login', verifyAllFieldLogin, userController.getUserByEmail);

app.post('/user', verifyLengthDisplayName, verifyFormatEmail,
verifyLengthPassword, userController.createUser);

app.get('/user', validateJwt, userController.getAllUser);

app.get('/user/:id', validateJwt, userController.getUserById);

app.post('/categories', validateJwt, verifyNameCategories, categoriesController.createCategory);

app.get('/categories', validateJwt, categoriesController.getAllCategories);

app.get('/post', validateJwt, blogPostController.getAllPost);

app.get('/post/search', validateJwt, blogPostController.getBySearch);

app.get('/post/:id', validateJwt, blogPostController.getByIdPost);

app.delete('/post/:id', validateJwt, blogPostController.deletePost);

app.delete('/user/me', validateJwt, userController.deleteUser);

app.put('/post/:id', validateJwt, verifyAllFieldUpdatePost, blogPostController.updatePostID);

app.post('/post', validateJwt, verifyAllFieldPost, blogPostController.createPost);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
