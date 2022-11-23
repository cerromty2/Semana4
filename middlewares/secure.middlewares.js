const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.auth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next(createError(401, "unauthorized: missing auth header"));
  }

  const token = authorization.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, "super secret!");

    User.findById(decoded.sub)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          next(createError(401, "unauthorized: invalid user"));
        }
      })
      .catch(next);
  } catch (err) {
    next(createError(401, "unauthorized: invalid token"));
  }
};
