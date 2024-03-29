import multer from "multer";

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    const fileExt = file.originalname.slice(file.originalname.lastIndexOf('.') + 1);
    const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + uniqueId + "." + fileExt);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(Error("Invalid file type!"), false);
  }
};

export const uploadPic = multer({ storage, fileFilter });