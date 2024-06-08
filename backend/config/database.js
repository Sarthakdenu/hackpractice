const mongoose = require('mongoose');
require('dotenv').config();

exports.connectdb = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Successfully connected with the database");
    })
    .catch((err) => {
        console.log("Error while connecting with the Database");
        console.log(err);
        process.exit(1);
    });
};
