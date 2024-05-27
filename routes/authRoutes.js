"use strict"

const express = require("express"); //Express
const router = express.Router(); //router
const mongoose = require("mongoose"); //Mongoose
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");//jwt
require("dotenv").config(); //dotenv

const User = require("./models/User"); //User från models/User
const Meny = require("./models/meny"); 
const book = require("./models/book");
const review = require("./models/review");

//ansluta dastabas
mongoose.set("strictQuery", false);


mongoose.connect(process.env.URL).then(() => { //ansluter med url i env
    console.log("connected to databse");
}).catch ((error) => { //error
    console.error("error when connecting to database, " + error)
})



router.post("/register", async (request, response) => {//vid /register
    try {
        const {username, password, account_created} = request.body; //hämtar username, password
        console.log("1")

        //Validering för användarkonton
        const existingUser = await User.findOne({ username }); //kollar om användaren redan finns

        if (existingUser) { //om den finns
            return response.status(400).json({ error: "Username or email already exists" }); //error
        }

        if (username.length < 5 || username.length > 20) {//om mindre än 6, eller mer än 20
            console.log("2")
            return response.status(400).json({error: "Username has to be 6-20 characters"});//error
        }

        if (password.length < 7 ) { //om mindre än 7
            return response.status(400).json({error: "Password has to be atleast 7 characters"});
        }

        if (!/[A-ZÅÄÖ]/.test(password)) { //innheåller ingens stor bokstav 
            return response.status(400).json({ error: "Password must contain one uppercase letter" });
        }
        
        if (!/[0-9]/.test(password)) { //innehåller ingen siffra
            return response.status(400).json({ error: "Password must contain one number" });
        }
        
        //spara 
        const user = new User({username, password}); //ny användare
        await user.save(); //spara
        
        response.status(201).json({message: "User created"}); //meddelande

        


    } catch (error) { //vid error
        response.status(500).json({error: "Server error"})
    }
});



//login
router.post("/login", async (request, response) => { //vid /login
    try {
        const {username, password} = request.body; //hämtar username och password

        //Validering input
        if (username.length < 6 || username.length > 20) { //Längd användarnamn
            return response.status(400).json({error: "Username has to be 7-20 characters"})
        }


        if (password.length < 8 ) { //Längd lösenord
            return response.status(400).json({error: "Password has to be atleast 8 characters"})
        }

        if (!/[A-ZÅÄÖ]/.test(password)) {//innehåller ingen stor bokstav
            return response.status(400).json({ error: "Password must contain one uppercase letter" });
        }
        
        if (!/[0-9]/.test(password)) {//innehåller ingen siffra
            return response.status(400).json({ error: "Password must contain one number" });
        }
        

        //Validering inlogg

        //Användare
        const user = await User.findOne({username}); //kollar om user finns i databsen
        if(!user) { //om user ej finns
            return response.status(401).json({error: "Invalid Username"}) //error
        }

        //Lösenord
        const matchPassword = await user.comparePassword(password); //kollar lösenord om de matchar 
        if (!matchPassword) { //om de inte mnatchar
            return response.status(401).json({error: "Invalid Password"}) //error
        }

        else{
            //jwt skapas
            const payloadUser = {username: username}; //skapar payloadUser
            const token = jwt.sign(payloadUser, process.env.JWT_SECRET_KEY, {expiresIn: "1h"}) //skapar en token, giltig 1h.
            const recivedToken = { //skapar recivedToken som jag sen kan hämta token ifrån
                message: "Logged in",
                token: token
            }
            response.status(200).json({recivedToken})//respone med status 200 och skickar med answear objektet
        }



    } catch (error) {//vid error
        response.status(500).json({error: error.message }) //error
        console.log("error login")
    }
});


router.get("/meny", async (request, response) => { //vid /meny GET
    try {
        const itemsMeny = await Meny.find({}); //hämtar alla i meny
        response.json(itemsMeny); //skickar som response
    }catch (error) { //vid error
        response.status(500).json({error: 2});
    }
})


router.post("/meny", async (request, response) => { //vid /meny POST
    try {
        const { name, description, price, type } = request.body; //hämtar name, description, price och type från body. 
        const newItem = new Meny({ name, description, price, type }); //skapar med meny som model
        await newItem.save(); //sparar
        response.status(201).json({ message: "Item created" }); //meddelande
    }catch (error) { //vid error
        response.status(500).json({error: 1});
        console.log(error)
    }
})

router.delete("/meny:id", async (request, response) => { //vid /meny:id DELETE

    let idData = request.params.id;  //sätter idData till id:et
  

    try {
        const deletedItem = await Meny.findByIdAndDelete(idData); //hitta och radera baserat på idData. 

        return response.json({ message: "item deleted" }); //Meddellande
    }catch (error) { //vid error
        response.status(400).json({message: "failed delete"}); 
        console.log(error);
    }
})


router.put("/meny:id", async (request, response) => { //vid meny:id PUT

    let idData = request.params.id; //sätter idData till id:et

    try {
        const { name, description, price, type } = request.body; //hämtar name, description, price och type från body. 

        //hitta rätt baserat på idData och uppdatera dess värden. 
        await Meny.findByIdAndUpdate(idData, { name, description, price, type}, { new: true });

        return response.json({ message: "updated"}); //meddelande
    }catch (error) { //vid error
        response.status(400).json({message: "failed to update"}); 
        console.log(error);
    }
})


router.get("/booking", async (request, response) => { //vid /booking GET
    try {
        const bookings = await book.find({}); //hämtar all bookningar
        response.json(bookings); //response bookings 
    }catch (error) { //vid error
        response.status(500).json({error}); //meddelande
    }
})


router.post("/booking", async (request, response) => { //vid /booking POST
    try {
        const { email, phone, firstName, lastName, numberGuests, bookDate } = request.body; //hämtar allt från body. 
        const booking = new book({ email, phone, firstName, lastName, numberGuests, bookDate }); //skapar med book som model
        await booking.save(); //sparar
        response.status(201).json({ message: "booking created" }); //message
    }catch (error) { //vid error
        response.status(500).json({error}); //meddelande
        console.log(error)
    }
})


router.delete("/booking:id", async (request, response) => { //vid /booking DELETE

    let idData = request.params.id; //sätter idData till id:et
  
    try {
        const deletedBooking = await book.findByIdAndDelete(idData); //hitta baserat på idData och radera

        return response.json({ message: "booking deleted" }); //meddelande
    }catch (error) { //vid error
        response.status(400).json({message: "failed delete"});  //meddelande
        console.log(error);
    }
})

router.get("/review", async (request, response) => { //vid /review GET
    try {
        const reviews = await review.find({}); //hämtar alla reviews
        response.json(reviews); //response reviews i json format
    }catch (error) { //error
        response.status(500).json({error}); //meddelande
    }
})

router.post("/review", async (request, response) => { //vid /review POST
    try {
        const { name, rating, message } = request.body; //hämtar allt som krävs från body
        const reviews = new review({ name, rating, message }); //ny skapas med review som model
        await reviews.save(); //sparar
        response.status(201).json({ message: "review created" }); //meddelande
    }catch (error) { //vid error
        response.status(500).json({error}); //meddelande
        console.log(error)
    }
})



//router
module.exports = router;