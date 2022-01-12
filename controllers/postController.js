const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { uploadPostImage, deletePostimage } = require("./uploadsController");

const createPost = async (req, res) => {
  if (req.files) {
    const image = await uploadPostImage(req);
    console.log(image);
    if (image) {
      req.body.image = image;
    }
  }
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const getAllPosts = async (req, res) => {
  const post = await Post.find({}).sort({ createdAt: -1 }).exec();
  res.status(200).json({ post });
};

const removePost = async (req, res) => {
  const { postId: _id } = req.params;
  const { imageId } = req.body;

  const post = await Post.findOne({ _id });
  console.log(post);
  if (!post) {
    throw new CustomError.NotFoundError(`No post with id : ${_id}`);
  }

  await deletePostimage(imageId);
  post.remove();
  res.status(StatusCodes.OK).json({ msg: "success! post removed" });
};

module.exports = {
  createPost,
  getAllPosts,
  removePost,
};
