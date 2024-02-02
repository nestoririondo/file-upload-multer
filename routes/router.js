import express from "express";
import { uploadPic } from "../utils/multer.js";
import { postProfilePic, postCatPics, getPics } from "../controllers/controllers.js";

const router = express.Router();

router.post("/upload-profile-pic", uploadPic.single('profile_pic'), postProfilePic);
router.post("/upload-cat-pics", uploadPic.array('cat_pics'), postCatPics);
router.get("/get-pics", getPics);

export default router;


// Insert a link into your HTML that will point to /get-pics & create GET a route handler for /get-pics
// This route handler should get all the pictures previously uploaded in the database and return them as a list of links to the user. The user should be able to click on a link, and view the picture