const mongoose = require("mongoose");
//Vs70QbsCLQQcw1BC

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect("mongodb://0.0.0.0:27017/reactgram");

    console.log("Banco conectado");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

module.exports = conn;
