import multer from "multer";

const upload = multer({
  limits: {
      fileSize: 1000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please, upload only .jpg or .jpeg or .png file'));
      }
      cb(undefined, true);
  }
});

export default upload;