const mongoose = require("mongoose");
const username = "devnksgtd_db_user";
const password = "varETr7ADnxh2opI";
const clusterName = "api";
const dbname = "NKSGTĐ_APIS";

const url = `mongodb+srv://${username}:${password}@${clusterName}.uovtxms.mongodb.net/${dbname}?retryWrites=true&w=majority`;
console.log(url);
const connect = async () => {
    try {
        await mongoose.connect(url);

        console.log("✅ Mongo Connected");
    } catch (err) {
        console.error("❌ Mongo Connect Error");
        console.error(err.name);
        console.error(err.message);
        console.error(err);
        throw err;
    }
};
module.exports = { connect };
