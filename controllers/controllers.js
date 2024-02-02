import path from "path";
import fs from "fs/promises";
import pool from "../db/pool.js";

export const postProfilePic = async (req, res) => {
  if (!req.file) return res.sendStatus(400);
  const oldPath = path.resolve(req.file.path);
  const newPath = path.resolve(req.file.destination, req.file.originalname);
  const encodedFilename = encodeURIComponent(req.file.originalname);
  try {
    await fs.rename(oldPath, newPath);
    const query = `INSERT INTO pictures (name, path) VALUES ($1, $2) RETURNING *`;
    const values = [req.file.originalname, `/uploads/${encodedFilename}`];
    const { rows } = await pool.query(query, values);
    res
      .status(201)
      .send(
        `<div><h2>Here's the picture:</h2><img src='/uploads/${encodedFilename}'/></div>`
      );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const postCatPics = async (req, res) => {
  if (!req.files || req.files.length === 0) return res.sendStatus(400);
  const images = [];
  try {
    await Promise.all(
      req.files.map(async (file) => {
        const encodedFilename = encodeURIComponent(file.originalname);
        const oldPath = path.resolve(file.path);
        const newPath = path.resolve(file.destination, file.originalname);
        await fs.rename(oldPath, newPath);
        images.push(
          `<img style="max-width: 100%" src='/uploads/${encodedFilename}'/>`
        );
        const query = `INSERT INTO pictures (name, path) VALUES ($1, $2) RETURNING *`;
        const values = [file.originalname, `/uploads/${encodedFilename}`];
        const { rows } = await pool.query(query, values);
      })
    );
    res
      .status(201)
      .send(`<div><h2>Here are the pictures:</h2>${images.join("")}</div>`);
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
