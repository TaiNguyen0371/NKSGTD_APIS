const mongoose = require("mongoose");
const username = "devnksgtd_db_user";
const password = "varETr7ADnxh2opI";
const clusterName = "api";
const dbname = "NKSGTĐ_APIS";

const url = `mongodb+srv://${username}:${password}@${clusterName}.7g5v70z.mongodb.net/?appName=api`;
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
