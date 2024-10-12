var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/checkBody');

const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.get('/', (req, res) => {
 
    res.json({result:true,message:'no action'})
 
})

 

module.exports = router;