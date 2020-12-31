const { Router } = require('express');
const{ weatherController} = require('../controllers/weather.ctrl');


const weatherRouter = new Router();  

weatherRouter.get('/', weatherController.getWeather);

module.exports = {weatherRouter};