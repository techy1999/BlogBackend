const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment author is required"],
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "Comment blog is required"],
    },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

module.exports = mongoose.model("Comment", commentSchema);
