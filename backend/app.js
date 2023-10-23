require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

//JSON e formato de dado
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Upload
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//DB Collection
require("./config/db.js");

//Cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const router = require("./routes/Router.js");
app.use(router);

app.listen(port, () => {
  console.log(`Servidor on http://localhost:${port}`);
});
