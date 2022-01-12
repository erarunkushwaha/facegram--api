require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const morgan = require("morgan");

const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dlp9g75ol",
  api_key: "396767177712233",
  api_secret: "YIDQN9mCwGMgOJzd4NJIkWk17bs",
});

const connectDB = require("./db/connect");

const postRouter = require("./routes/postRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(morgan("tiny"));

app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/posts", postRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URl);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
