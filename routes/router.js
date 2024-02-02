import express from "express";
import { uploadPic } from "../utils/multer.js";
import { postProfilePic, postCatPics, getPics } from "../controllers/controllers.js";

const router = express.Router();

router.post("/upload-profile-pic", uploadPic.single('profile_pic'), postProfilePic);
router.post("/upload-cat-pics", uploadPic.array('cat_pics'), postCatPics);
router.get("/get-pics", getPics);

export default router;
