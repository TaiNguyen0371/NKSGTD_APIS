const mongoose = require("mongoose");
const username = "nguyentai0371";
const password = "0Tainguyen0";
const clusterName = "cluster0";
const dbname = "NKSGTĐ_APIS";

const url = `mongodb+srv://devnksgtd_db_user:varETr7ADnxh2opI@api.7g5v70z.mongodb.net`;
const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connect database successful");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
