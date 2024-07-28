const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.URL)
    .then(console.log("connected to db"))
    .catch( (error) => {
        console.log("db connection failed");
        process.exit(1)
    })
} 