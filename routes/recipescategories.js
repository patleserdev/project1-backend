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

/**
 *  Ajouter un régime
 */
router.post('/', async (req, res) => {

    if (!checkBody(req.body, ['name', 'label'])) {
        return res.json({ result: false, error: "Champs manquants ou invalides" })
    }

   
    const newRC = new Recipecategorie({
        name: req.body.name,
        label: req.body.label,
    })
    try
    {
        const addRC = await newRC.save()
        if (addRC) {
            res.json({ result: true })
        }
        else {
            res.json({ result: false, error: "Erreur lors de l'ajout de la catégorie de recettes" })
        }
    }
    catch(e)
    {
        res.json({ result: false,error:e.errmsg })
    }
    
})

module.exports = router;