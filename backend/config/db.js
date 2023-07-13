const mongoose = require("mongoose");
//Vs70QbsCLQQcw1BC

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ptc4v0a.mongodb.net/`
    );

    console.log("Banco conectado");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

module.exports = conn;
