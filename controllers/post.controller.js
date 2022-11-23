const createError = require("http-errors");
const Post = require("../models/post.model");

module.exports.create = (req, res, next) => {
  Post.create(req.body)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  const page = req.query.page;

  Post.find()
    .then((posts) => {
      if (page) {
        const perPage = 2;
        const from = (page - 1) * perPage;
        const to = from + perPage;

        res.json(posts.slice(from, to));
      } else {
        res.json(posts);
      }
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        next(createError(404, "post not found"));
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        next(createError(404, "post not found"));
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id).then((post) => {
    res.status(204).send();
  })
    .catch(next);
};
