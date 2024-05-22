const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  postText: {
    type: String,
    required: "You need to leave a post!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  postAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
      }
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
