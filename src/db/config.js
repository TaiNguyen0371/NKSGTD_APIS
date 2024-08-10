const mongoose = require("mongoose");
const username = "nguyentai0371";
const password = "0Tainguyen0";
const clusterName = "cluster0";
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
