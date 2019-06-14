const router = require('express').Router();
const home = require('../controllers/home');
router.get('/api/v1',home.get)
module.exports=router;    