const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 5000000 },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      const outputPath = path.join(__dirname, "../public/images/products/", file.filename);
      await sharp(file.path)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);
      // Remove original file, keep the resized one for Cloudinary upload in next middleware/controller
      fs.unlinkSync(file.path);
      file.path = outputPath; 
    })
  );
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      const outputPath = path.join(__dirname, "../public/images/blogs/", file.filename);
      await sharp(file.path)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);
      // Remove original file, keep the resized one for Cloudinary upload
      fs.unlinkSync(file.path);
      file.path = outputPath;
    })
  );
  next();
};
module.exports = { uploadPhoto, productImgResize, blogImgResize };
