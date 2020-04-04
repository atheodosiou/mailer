const express = require('express');
const router = express.Router();

//Import controllers
const controller = require('../controllers/main');
router.get('/',controller.welcome)
router.post('/send',controller.sendMail);

module.exports=router;