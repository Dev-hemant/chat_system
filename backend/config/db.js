const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/mernchat", {});
        // mongoose.set('strictQuery', true);
        console.log(`mongoDB Connected : ${conn.connection.host}`);
    } catch (error) {
        console.log("error = ", error);
        process.exit();
    }
}

module.exports = connectDB;