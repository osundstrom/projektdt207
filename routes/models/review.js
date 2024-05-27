
const mongoose = require("mongoose"); //Mongoose

//schema för reviews
const reviewSchema = new mongoose.Schema ({
    name: { 
        type: String, //typ string
        require: true, //måste
        
    },

    rating: {
        type: Number,  //typ number
        require: true, //måste
    },

    message: {
        type: String,  //typ string
        require: true, //måste
    },

 });



  //skapar model
const review = mongoose.model("review", reviewSchema); 
module.exports = review; 