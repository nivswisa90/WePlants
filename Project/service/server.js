const express = require("express");
const app = express();
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

const {plantRouter} = require("./routers/plantRouter");
const {userRouter} = require("./routers/userRouter");
const {weatherRouter} = require("./routers/weatherRouter");
const {mailRouter} = require("./routers/mailRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Content-Type', 'application/json');
    next();
});

app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use('/api/users/logout', function(req, res) {
    res.clearCookie('token');
    res.json('Successfully logout');
});
app.use('/api/plants', plantRouter);
app.use('/api/users', userRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/mail', mailRouter);
app.get('*', (req, res) => {res.send('Welcome to WePlants heroku server');});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log('Express server is running on Port - ', port));