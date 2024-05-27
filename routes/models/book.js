const mongoose = require("mongoose"); //Mongoose

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
        type: String, //typ string
        require: true, //måste
    },

    lastName: {
        type: String, //typ string
        require: true, //måste
    },

    numberGuests: {
        type: Number, //typ number
        require: true, //måste
    },

    bookDate: {
        type: Date, //typ date
        require: true, //måste
    }


 });



  //skapar model
const book = mongoose.model("book", bookSchema); 
module.exports = book; 