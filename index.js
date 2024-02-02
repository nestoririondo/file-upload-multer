import express from "express";
import router from "./routes/router.js";
import 'dotenv/config';

const app = express();
const port = 3000;

const path = "C:\\Users\\Néstor\\Documents\\MEGA\\MegaSyncFiles\\Coding\\Bootcamp\\Week_9\\file-upload-multer";

app.use(express.json());
app.use(express.static(path));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
