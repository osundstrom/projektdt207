
const mongoose = require("mongoose"); //Mongoose

//schema för användare
const reviewSchema = new mongoose.Schema ({
    name: { 
        type: String, //typ string
        require: true, //måste
        
    },

    rating: {
        type: Number, 
        require: true, 
    },

    message: {
        type: String, 
        require: true, 
    },

 });



  //skapar model
const review = mongoose.model("review", reviewSchema); 
module.exports = review; 