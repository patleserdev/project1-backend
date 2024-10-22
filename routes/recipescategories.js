var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/checkBody');
const Recipecategorie = require('../models/recipesCategories');

/**
 *  Afficher toutes les catégories de recettes
 */
router.get('/', async (req, res) => {

    const recipesCategories = await Recipecategorie.find({})

    res.json({ result: true, data: recipesCategories })

})

module.exports = router;