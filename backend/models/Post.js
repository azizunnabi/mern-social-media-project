const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    postTitle: {
      required: true,
      type: String,
    },
    postDescription: {
      required: true,
      type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);
const PostModel = mongoose.model("post", postSchema);
module.exports = PostModel;
