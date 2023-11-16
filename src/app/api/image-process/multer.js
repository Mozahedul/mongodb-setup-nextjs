import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./images");
  },
  filename(req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname.replace(fileExt, "").toLowerCase() + "-" + Date.now();
    cb(null, fileName + fileExt);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 10,
  },
  fileFilter(req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null);
    } else {
      cb(new Error("Only jpg, jpeg, and png image file format are allowed"));
    }
  },
});

export default upload;
