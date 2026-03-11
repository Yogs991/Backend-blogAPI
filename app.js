require('dotenv').config();
const path = require('node:path');
const express = require("express");
// const passport = require('passport');
const cors = require("cors");
const routes = require("./routes/router");
const app = express();


app.use(cors(
    {
        origin:[
            "http://localhost:5173",
        ],
        credentials: true,
        methods: ["GET","POST","PATCH","DELETE"],
        allowedHeaders:["Content-Type", "Authorization"]
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error)=>{
    if(error){
        console.log(error);
    }
    console.log(`App is listening on port ${PORT}`);
})