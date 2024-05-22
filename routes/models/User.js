const mongoose = require("mongoose"); //Mongoose
const bcrypt = require("bcrypt"); //bcrypt


//schema för användare
 const userSchema = new mongoose.Schema ({
    username: { 
        type: String, //typ string
        require: true, //måste
        unique: true, //måste va unik
        trim: true, //ta bort mellanrum
    },

    password: {
        type: String, //typ string
        require: true, //måste
    },

    account_created: {
        type: Date, //typ datum
        default: Date.now //skpas som default nuvarende datum och tid
    }
 });


 //Hasha lösenord innan spara
userSchema.pre("save", async function(next) { //pre-hook (körs innan något sparas till databsen)
    try{
        if(this.isNew || this.isModified(password)) { //om det är nytt eller ändrat
            const hashedPassword = await bcrypt.hash(this.password, 10); //hasha med hjälp av bcrypt
            this.password = hashedPassword; //tilldelar hashed till password
        }
        next() //next
    }catch(error) { //vid error
        next(error) 
    }
});



 //användra regristreras
userSchema.statics.register = async function(username, password) {
    try {
        const user = new this({username, password}); //ny användare
        await user.save(); //Spara
        return user; 
    } catch (error) { //vid error
        throw error;
    }
};




 //skapar model
const User = mongoose.model("User", userSchema); 
module.exports = User; 