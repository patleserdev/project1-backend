var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/checkBody');
const Regime = require('../models/regimes');
const { findOneAndUpdate } = require('../models/mesures.js');

/**
 *  Afficher toutes les catégories de recettes
 */
router.get('/', async (req, res) => {

    const regimes = await Regime.find({})

    const formattedDatas=[]
    regimes.map((regime)=> formattedDatas.push({id:regime._id,name: regime.name,label:regime.label,type:regime.type}))
    res.json({ result: true, data: formattedDatas })

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

/**
 *  Modifier un régime
 */
router.put('/:id', async (req, res) => {

    if (!checkBody(req.body, ['name', 'label','type'])) {
        return res.json({ result: false, error: "Champs manquants ou invalides" })
    }
    const regime = new Regime({
        name: req.body.name,
        label: req.body.label,
        type: req.body.type
    })
    try
    {
        const updateRegime = await Regime.findOneAndUpdate({_id : req.params.id},{ $set: { 
            name: regime.name ,
            label: regime.label ,
            type: regime.type 
        } })
        if (updateRegime) {
            res.json({ result: true , message: "update ok" })
        }
        else {
            res.json({ result: false, error: "Erreur lors de la modification du régime." })
        }
    }
    catch(e)
    {
        res.json({ result: false,error:e.errmsg })
    }
    
})

/**
 *  Supprimer une mesure
 */
router.delete('/:id', async (req, res) => {

    await Regime.findByIdAndDelete(req.params.id, function (error) {
        if (error) {
            res.json({ result: false, error: err })
        }
        else {
            res.json({ result: true })
        }
    });

})


module.exports = router;