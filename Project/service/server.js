const express = require("express");
const app = express();
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
cors_proxy = require('cors-anywhere');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// initialize routes
const { plantRouter } = require("./routers/plantRouter");
const { userRouter } = require("./routers/userRouter");
const { weatherRouter } = require("./routers/weatherRouter");
const { mailRouter } = require("./routers/mailRouter");

// cors and cookies settings
app.use(cors({ credentials: true, origin: 'https://affectionate-curran-223dfc.netlify.app', methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"], preflightContinue: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials: true');
    res.set('Content-Type', 'application/json');
    next();
});

app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));

// logout function
app.use('/api/users/logout', function (req, res) {
    res.clearCookie('token');
    res.json('Successfully logout');
});
// routes
app.use('/api/plants', plantRouter);
app.use('/api/users', userRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/mail', mailRouter);
app.get('*', (req, res) => { res.send('Welcome to WePlants heroku server'); });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log('Express server is running on Port - ', port));