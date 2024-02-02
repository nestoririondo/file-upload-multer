import multer from "multer";

const upload = multer({ dest: "uploads/" });

export const uploadProfilePic = upload.single("profile_pic");