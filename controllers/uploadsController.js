const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const CustomError = require("../errors");

const uploadPostImage = async (req, res) => {
  const postImage = req.files.file;
  if (!postImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024 * 3;
  if (postImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload image smaller 3 MB");
  }

  const result = await cloudinary.uploader.upload(postImage.tempFilePath, {
    public_id: `${Date.now()}`,
    use_filename: true,
    folder: "file-upload",
  });
  fs.unlinkSync(postImage.tempFilePath);

  if (!result) {
    throw new CustomError.BadRequestError(
      "Something went wrong please try again"
    );
  }

  const { secure_url: url, public_id } = result;
  const obj = { url, public_id };
  return obj;
};

const deletePostimage = async (public_id) => {
  const result = await cloudinary.uploader.destroy(public_id);
  if (result == "ok") {
    return result;
  } else {
    return null;
  }
};

module.exports = {
  uploadPostImage,
  deletePostimage,
};
