const axios = require('axios').default;
const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=Jerusalem&appid=d05a397d0948217a290c8d036e95886e`;


exports.weatherController = {
    getWeather(req, res) {
        axios.get(weatherAPI)
        .then(docs => {
            res.json(docs.data);
        })
        .catch((err) => console.log(`Error getting the weather from API: ${err}`));
    }
}