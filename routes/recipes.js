var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/checkBody');
const Recipe = require('../models/recipes');

/**
 *  Afficher toutes les recettes
 */
router.get('/', async (req, res) => {

    const recipes = await Recipe.find({})

    res.json({ result: true, data: recipes })

})

module.exports = router;