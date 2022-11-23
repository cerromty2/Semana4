const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  //id: {
  //  type: String,
  //},
  title: {
    type: String,
    required: "text is required",
    minlength: 5
  },
  text: {
    type: String,
    required: 'text is required',
    minlength: 5
  },
  author: {
    type: String,
    required: 'text is required',
  }
  /*image: {
    type: String
  }*/
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id;
      return ret;
    }
  }
});


const Post = mongoose.model('Post', schema);
module.exports = Post;