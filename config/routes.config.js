const express = require("express");
const router = express.Router();

const users = require("../controllers/users.controller");
const posts = require("../controllers/post.controller");
const secure = require("../middlewares/secure.middlewares");

// Post CRUD

router.post('/posts', secure.auth, posts.create);
router.get('/posts', secure.auth, posts.list);
router.get('/posts/:id', secure.auth, posts.detail);
router.patch('/posts/:id', secure.auth, posts.update);
router.delete('/posts/:id', secure.auth, posts.delete);

//Users

router.post('/users', users.create);
router.post('/users/:id/validate', users.validate);
router.post('/login', users.login);


module.exports = router;