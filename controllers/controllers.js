import path from "path";
import fs from "fs/promises";

export const postProfilePic = async (req, res) => {
  if (!req.file) return res.sendStatus(400);
  console.log(req.file);

  const oldPath = path.resolve(req.file.path);
  const newPath = path.resolve(req.file.destination, req.file.originalname);

  try {
    fs.rename(oldPath, newPath);
    res
      .status(201)
      .send(
        "<div><h2>Here's the picture:</h2><img src='/uploads/" +
          req.file.originalname +
          "'/></div>"
      );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
