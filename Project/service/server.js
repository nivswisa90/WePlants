const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {plantRouter} = require("./routers/plantRouter");
const {userRouter} = require("./routers/userRouter");
const {weatherRouter} = require("./routers/weatherRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Origin','*');
    res.set('Content-Type', 'application/json');
    next();
});

app.use('/api/plants', plantRouter);
app.use('/api/users', userRouter);
app.use('/api/weather', weatherRouter);
app.get('*', (req, res) => {res.send('Welcome to WePlants heroku server');});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log('Express server is running on Port - ', port));