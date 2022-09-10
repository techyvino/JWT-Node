import express from "express";
import { config } from "dotenv";
import dbConnect from "./helpers/dbConnect.js";
import router from "./routes/auth.js";

const app = express();
config();
dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", router);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));
