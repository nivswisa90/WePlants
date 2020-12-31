const { Router } = require('express'); 
const{ userDBController} = require('../controllers/user.ctrl');

const userRouter = new Router();  

userRouter.get('/', userDBController.getUsers);
userRouter.get('/:id', userDBController.getUser)
userRouter.post('/', userDBController.addUser);
userRouter.put('/:id', userDBController.updateUser);
userRouter.delete('/:id', userDBController.deleteUserOrFavoritePlant);


module.exports = {userRouter};