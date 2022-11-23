const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: 'name is required'
  },
  email: {
    type: String, 
    required: "email es requerido",
  },
  password: {
    type: String,
    required: 'password es requerido',
    match: [PASSWORD_PATTERN, 'the password is invalid']
  },
  bio: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret._id;
      delete ret.password;
      return ret;
    }
  },
  toObject: {
    transform: function (doc, ret) {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret
    }
  }
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  }else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;