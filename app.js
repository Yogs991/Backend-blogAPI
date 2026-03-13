require('dotenv').config();
const express = require("express");
// const path = require('node:path');
// const passport = require('passport');
const cors = require("cors");
const app = express();

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

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

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/user-comments", commentRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error)=>{
    if(error){
        console.log(error);
    }
    console.log(`App is listening on port ${PORT}`);
})