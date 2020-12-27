const { Router } = require('express'); 
const{ plantDBController} = require('../controllers/plant.ctrl');

const plantRouter = new Router();  

plantRouter.get('/', plantDBController.getPlants);
plantRouter.get('/:id', plantDBController.getPlant)
plantRouter.post('/', plantDBController.addPlant);
plantRouter.put('/:id', plantDBController.updatePlant);
plantRouter.delete('/:id', plantDBController.deletePlant);


module.exports = {plantRouter};