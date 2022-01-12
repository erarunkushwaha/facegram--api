const express = require("express");
const {
  createPost,
  getAllPosts,
  removePost,
} = require("../controllers/postController");
const { uploadProductImage } = require("../controllers/uploadsController");
const router = express.Router();

router.route("/").post(createPost).get(getAllPosts);
router.route("/:postId").delete(removePost);

module.exports = router;
