"use strict"

const express = require("express");  //Express
const cors = require("cors"); //CORS (cross orgin resource sharing) så vi kan hämta informationen från webbsidan.
const app = express(); //express app
const port = process.env.PORT || 3000; //Port från .env med backup 3000
const mongoose = require("mongoose"); //Mongoose

const jwt = require("jsonwebtoken");//jwt json web token
const authRoutes = require("./routes/authRoutes"); //authRoutes


app.use(cors()); //cors app
app.use(express.json());  //json


require("dotenv").config(); //dotenv


app.use("/api", authRoutes); //hantera /api med authRoutes



//skapar ett schema
const workexperienceSchema = new mongoose.Schema({
    companyname: {
        type: String, //typ
        required: [true, "Måste ha med företagsnamn"] //Måste ha, text för egen error
    },

    jobtitle: {
        type: String, //typ
        required: [true, "Måste ha med roll"] //Måste ha, text för egen error
    },

    location: {
        type: String, //typ
        required: [true, "Måste ha med plats"]//Måste ha, text för egen error
    },
    startdate: {
        type: Date, //typ
        required: [true, "Måste ha med startdatum"]//Måste ha, text för egen error
    },
    enddate: {
        type: Date, //typ
        required: [true, "Måste ha med slutdatum"]//Måste ha, text för egen error
    }
});

//Skapar en model
const workexperience = mongoose.model("Workexperience", workexperienceSchema);

//-------------------------------------------------------------//
//-------------------------------------------------------------//
//-------------------------GET------------------------------------//





//skyddad
app.get("/api/secret", validateToken, async (request, response) => { //skyddat route, krävs JWT token
    response.json({message: "skyddad"}); //svar
    console.log("skyddad"); //konsoll

    


})


//Funtkion för token
function validateToken(request, response, next) { //funktionen validate token
    const authHeader = request.headers["authorization"]; //hämtar authorization, alltså token
    const token = authHeader && authHeader.split(" ")[1]; //delar upp authorization 

    if (token == null) { //om token är null
        response.status(401).json({message: "Bad authorization, no token"}) //meddelande
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, username) => { //veriferar emot nyckeln i .env
        if (error) {//vid error
            return response.status(403).json({message: "bad JWT"});//meddelande
        }

        request.username = username //om godkänd token
        next();
    })
};



//startar
app.listen(port, () => {
    console.log("Server started on: " + port)
});