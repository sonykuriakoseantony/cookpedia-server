const mongoose = require('mongoose');

const connectString = process.env.DB_URL;

mongoose.connect(connectString).then((res)=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log("Database connection failed", err);
});
