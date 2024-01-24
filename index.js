const mongoose = require('mongoose');
const express =require('express');
const dotenv = require ('dotenv');
const schoolRoute = require('./src/routes')
// const moment = require('moment');

// console.log(moment());

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(schoolRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})


//To establish the connection
mongoose.connect(process.env.Database_Name)
    .then(() => {
        console.log("connected to database")
    }).catch((error) => {
        console.log("not connected");
});

