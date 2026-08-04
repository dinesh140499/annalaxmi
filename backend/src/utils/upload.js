const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath=path.join(__dirname,"../uploads")

if(!fs.existsSync(uploadPath)){
  fs.mkdirSync(uploadPath,{recursive:true})
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png|webp/;

  const extname = allowed.test(
    path.extname(file.originalname).toLocaleLowerCase(),
  );

  const mimetype = allowed.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"));
  }
};

exports.upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
