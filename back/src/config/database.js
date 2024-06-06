const mongoose = require("mongoose");
const { logInColor } = require("../helpers/logs");


const { DB_URL, DB_PASSWORD } = process.env;

const connectDataBase = async () => {
    try {
        mongoose.set("strictQuery", false);
        const url = getMongoUrl(DB_URL, DB_PASSWORD);
        await mongoose.connect(url);
        logInColor("DB Connection successfully");
    } catch (error) {
        logInColor("Error", "red");
        logInColor(error.message, "red");
        throw new Error("Database is not connected");
    }
};

const getMongoUrl = (url, password) => {
    return url.replace("<password>", password);
};

module.exports = {
    connectDataBase,
};
