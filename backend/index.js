const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
require("dotenv").config();
const connectDB = require('./config/db');
connectDB()
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
app.use(express.json());
app.use(cookieParser());//read and write cookies sent by browser
app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use((req, res, next) => {
    console.log("This is a middleware");
    next();
})
app.use((req, res, next) => {
    console.log("This is a middleware2");
    next();
})
app.use(session({
    secret: process.env.SESSION_SECRET || "classroom-secret",   //is used to sign the session ID cookie.
    resave: false,  //avoid unnecessary session savings
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));
app.get('/', (req, res) => {
    res.cookie('cookieName', 'thisIsSecret');
    res.send("Server is running");
});
app.get('/cookie', (req, res) => {
    console.log(req.cookies);
    res.send('Cookie route');
})

const JWT_SECRET = process.env.JWT_SECRET || "teaching-secret";
app.get('/jwt',(req,res)=>{
    let token = jwt.sign({user:'Syamala',branch:'CSE'},JWT_SECRET);
    res.cookie('mytoken',token,{httpOnly:true});
    console.log(token);
    res.send('jwt route');

});
app.get('/jwt-verify',(req,res)=>{
    let token = req.cookies.mytoken;
    let data = jwt.verify(token,JWT_SECRET);
    console.log(data);
    res.send('Jwt verify route');
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});


