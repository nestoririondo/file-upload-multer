import multer from "multer";

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(Error("Invalid file type!"), false);
  }
};

export const uploadPic = multer({ dest: "uploads/", fileFilter });