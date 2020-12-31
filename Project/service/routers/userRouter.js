const { Router } = require('express'); 
const{ userDBController} = require('../controllers/user.ctrl');

const userRouter = new Router();  

userRouter.get('/', userDBController.getUsers);
userRouter.get('/:id', userDBController.getUser)
userRouter.post('/', userDBController.addUser);
// userRouter.post('/:id', userDBController.addMyFavorites);       //We use post because we add new Object Plant to myFavorites
userRouter.put('/:id', userDBController.updateUser);
userRouter.delete('/:id', userDBController.deleteUser);


module.exports = {userRouter};