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

    const formattedDatas=[]
    recipes.map((recipe)=> formattedDatas.push({id:recipe._id,name: recipe.name,unit:recipe.unit}))
    res.json({ result: true, data: formattedDatas })


})

module.exports = router;