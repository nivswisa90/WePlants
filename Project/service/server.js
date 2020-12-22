const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {plantRouter} = require("./routers/plantRouter");
// const fetch = require('node-fetch');

// (async () => {
//   const response = await fetch('https://trefle.io/api/v1/plants?token=GgCIrLPYyakGqb0RqAgJYVZgiisNvhgBHTgXMQ5NymY');
//   const json = await response.json();
//   console.log(json);
// })();

app.use(express.json());
app.use(express.urlencoded({extended: true})); 


app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Methods', 'PUT');
    res.header('Access-Control-Allow-Origin','*');
    res.set('Content-Type', 'application/json');
    next();
    
});

app.use('/api/plants', plantRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
   });


app.listen(port, () => console.log('Express server is running on Port - ', port));