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

    const formattedDatas=[]
    recipesCategories.map((rc)=> formattedDatas.push({id:rc._id,name: rc.name,label:rc.label}))
    res.json({ result: true, data: formattedDatas })

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

/**
 *  Modifier un régime
 */
router.put('/:id', async (req, res) => {

    if (!checkBody(req.body, ['name', 'label'])) {
        return res.json({ result: false, error: "Champs manquants ou invalides" })
    }
    const rc = new Recipecategorie({
        name: req.body.name,
        label: req.body.label,

    })
    try
    {
        const updateRc = await Recipecategorie.findOneAndUpdate({_id : req.params.id},{ $set: { 
            name: rc.name ,
            label: rc.label ,
        } })
        if (updateRc) {
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

    await Recipecategorie.findByIdAndDelete(req.params.id, function (error) {
        if (error) {
            res.json({ result: false, error: err })
        }
        else {
            res.json({ result: true })
        }
    });

})


module.exports = router;