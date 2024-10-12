var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/checkBody');
const User = require('../models/users');

const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/',async (req, res)=>{
    
    const users= await User.find({})

    res.json({result:true, data: users})
 
})


// ajouter un utilisateur

// supprimer un utilisateur

// modifier un utilisateur

// se connecter

// se déconnecter
 

module.exports = router;