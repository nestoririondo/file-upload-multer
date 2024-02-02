import express from "express";
import router from "./routes/router.js";
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
