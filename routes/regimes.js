var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/checkBody');
const Regime = require('../models/regimes');

/**
 *  Afficher toutes les catégories de recettes
 */
router.get('/', async (req, res) => {

    const regimes = await Regime.find({})

    res.json({ result: true, data: regimes })

})

/**
 *  Ajouter un régime
 */
router.post('/', async (req, res) => {

    if (!checkBody(req.body, ['name', 'label','type'])) {
        return res.json({ result: false, error: "Champs manquants ou invalides" })
    }

   
    const newRegime = new Regime({
        name: req.body.name,
        label: req.body.label,
        type: req.body.type
    })
    try
    {
        const addRegime = await newRegime.save()
        if (addRegime) {
            res.json({ result: true })
        }
        else {
            res.json({ result: false, error: "Erreur lors de l'ajout du régime." })
        }
    }
    catch(e)
    {
        res.json({ result: false,error:e.errmsg })
    }
    
})


module.exports = router;