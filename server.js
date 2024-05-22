"use strict"

const express = require("express");  //Express
const cors = require("cors"); //CORS (cross orgin resource sharing) så vi kan hämta informationen från webbsidan.
const app = express(); //express app
const port = process.env.PORT || 3000; //Port från .env med backup 3000
const mongoose = require("mongoose"); //Mongoose

//const jwt = require("jsonwebtoken");//jwt json web token
const authRoutes = require("./routes/authRoutes"); //authRoutes


app.use(cors()); //cors app
app.use(express.json());  //json


require("dotenv").config(); //dotenv


app.use("/api", authRoutes); //hantera /api med authRoutes




//startar
app.listen(port, () => {
    console.log("Server started on: " + port)
});