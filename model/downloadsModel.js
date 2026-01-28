const mongoose = require('mongoose');

const downloadsSchema = new mongoose.Schema({
    recipeId : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    cuisine : {
        type : String,
        required : true
    },
    count : {
        type : Number,
        required : true
    },
    userMail : {
        type : String,
        required : true
    }
})

const downloads = mongoose.model('downloads', downloadsSchema)
module.exports = downloads;
