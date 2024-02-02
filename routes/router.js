import express from "express";
import { uploadProfilePic } from "../middlewares/multer.js";
import { postProfilePic } from "../controllers/controllers.js";

const router = express.Router();

router.post("/upload-profile-pic", uploadProfilePic, postProfilePic);

export default router;

