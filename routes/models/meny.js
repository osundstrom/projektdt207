
const mongoose = require("mongoose"); //Mongoose

//schema för meny
const menySchema = new mongoose.Schema ({
    name: { 
        type: String, //typ string
        require: true, //måste
        
    },

    description: {
        type: String, //typ string
        require: true, //måste
    },

    price: {
        type: Number, //typ number
        require: true, //måste
    },

    type: {
        type: String, //typ string
        require: true, //måste
    }
 });



  //skapar model
const Meny = mongoose.model("Meny", menySchema); 
module.exports = Meny; 