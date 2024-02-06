import pool from "../db/pool.js";

export const postProfilePic = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded." });
  try {
    const query = `INSERT INTO pictures (name, path) VALUES ($1, $2) RETURNING *`;
    const values = [req.file.originalname, `/uploads/${req.file.filename}`];
    const { rows } = await pool.query(query, values);
    res
      .status(201)
      .send(
        `<div><h2>Here's the picture:</h2><img src='/uploads/${req.file.filename}'/></div>`
      );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const postCatPics = async (req, res) => {
  if (!req.files || req.files.length === 0)
    return res.status(400).json({ message: "No files uploaded." });

  try {
    const imagesPromises = req.files.map(async (file) => {
      const query = `INSERT INTO pictures (name, path) VALUES ($1, $2) RETURNING *`;
      const values = [file.originalname, `/uploads/${file.filename}`];
      const { rows } = await pool.query(query, values);
      return `<img style="max-width: 100%" src='/uploads/${file.filename}'/>`;
    });

    const resolvedImages = await Promise.all(imagesPromises);

    res
      .status(201)
      .send(
        `<div><h2>Here are the pictures:</h2>${resolvedImages.join("")}</div>`
      );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getPics = async (req, res) => {
  const pics = [];
  try {
    const query = "SELECT * FROM pictures";
    const { rows } = await pool.query(query);
    rows.forEach((row) =>
      pics.push(
        `<img style="max-width: 100%" src=${row.path} alt=${row.name}/>`
      )
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  res
    .status(200)
    .send(
      `<div><h2>Here are all the uploaded pictures:</h2>${pics.join("")}</div>`
    );
};
