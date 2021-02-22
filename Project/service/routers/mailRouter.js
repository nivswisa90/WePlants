const { Router } = require('express');
const { mailDBController } = require('../controllers/mail.ctrl');
const mailRouter = new Router();

mailRouter.post('/', mailDBController.sendMail);

module.exports = { mailRouter };