const mongoose = require("mongoose");
const username = "devnksgtd_db_user";
const password = "varETr7ADnxh2opI";
const clusterName = "api";
const dbname = "NKSGTĐ_APIS";

const url = `mongodb+srv://${username}:${password}@${clusterName}.uovtxms.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connect database successful");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
