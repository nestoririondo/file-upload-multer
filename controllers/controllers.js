import path from "path";
import fs from "fs/promises";

export const postProfilePic = async (req, res) => {
  if (!req.file) return res.sendStatus(400);
  const oldPath = path.resolve(req.file.path);
  const newPath = path.resolve(req.file.destination, req.file.originalname);

  try {
    await fs.rename(oldPath, newPath);
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

export const postCatPics = (req, res) => {
  if (!req.files) return res.sendStatus(400);
  let images = [];
  req.files.map(async (file) => {
    const oldPath = path.resolve(file.path);
    const newPath = path.resolve(file.destination, file.originalname);
    try {
      await fs.rename(oldPath, newPath);
      images.push("<img src='/uploads/" + file.originalname + "'/>");
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  res
    .status(201)
    .send("<div><h2>Here are the pictures:</h2>" + images.join("") + "</div>");
};
