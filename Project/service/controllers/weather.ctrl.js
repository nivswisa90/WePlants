const axios = require('axios').default;
const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=Jerusalem&appid=e3947eefa7b3cd248a12c0ace3487e18`;

exports.weatherController = {
    getWeather(req, res) {
        axios.get(weatherAPI)
            .then(docs => {
                res.json(docs.data);
            })
            .catch((err) => console.log(`Error getting the weather from API: ${err}`));
    }
}