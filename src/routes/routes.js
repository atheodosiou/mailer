const express = require('express');
const router = express.Router();

//Import controllers
const controller = require('../controllers/main');

router.post('/send',controller.sendMail);

module.exports=router;