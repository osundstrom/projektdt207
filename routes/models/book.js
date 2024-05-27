const mongoose = require("mongoose"); //Mongoose
const bcrypt = require("bcrypt"); //bcrypt

//schema för booking
const bookSchema = new mongoose.Schema ({
    email: { 
        type: String, //typ string
        require: true, //måste
    },

    phone: {
        type: String, //typ string
        require: true, //måste
    },

    firstName: {
        type: String, //typ datum
        require: true, //måste
    },

    lastName: {
        type: String,
        require: true,
    },

    numberGuests: {
        type: Number,
        require: true,
    },

    bookDate: {
        type: Date,
        require: true,
    }


 });



  //skapar model
const book = mongoose.model("book", bookSchema); 
module.exports = book; 