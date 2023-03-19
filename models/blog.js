const mongoose = require("mongoose");

// Blog Model
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 3,
      max: 10,
      required: [true, "Name is required"],
    },
    content: {
      type: String,
      min: 10,
      required: [true, "Content is required"],
    },
    image_url: {
      type: String,
      required: [true, "Image_url is required"],
    },
    video_url: {
      type: String,
      required: [true, "Video_url is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

// Pre hook to convert the date to a localized string before saving

blogSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Exporting farmerSchema as Farmer
module.exports = mongoose.model("Blog", blogSchema);
