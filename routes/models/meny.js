
const mongoose = require("mongoose"); //Mongoose
const bcrypt = require("bcrypt"); //bcrypt

//schema för användare
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
        type: Number, //typ datum
        require: true, //måste
    },

    type: {
        type: String,
        require: true,
    }
 });



  //skapar model
const Meny = mongoose.model("Meny", menySchema); 
module.exports = Meny; 