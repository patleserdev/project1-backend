var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/checkBody');
const Mesure = require('../models/mesures');



/**
 *  Afficher toutes les mesures
 */
router.get('/', async (req, res) => {

    const mesures = await Mesure.find({})

    res.json({ result: true, data: mesures })

})



/**
 *  Ajouter une mesure
 */
router.post('/new', async (req, res) => {

    if (!checkBody(req.body, ['name', 'unit'])) {
        return res.json({ result: false, error: "Champs manquants ou invalides" })
    }


    const newMesure = new Mesure({
        name: req.body.name,
        unit: req.body.unit,
        
    })
    const addMesure = await newMesure.save()
    if (addMesure) {
        res.json({ result: true })
    }
    else {
        res.json({ result: false, error: "Erreur lors de l'ajout de la mesure." })
    }
})

/**
 *  Editer une mesure
 */
router.put('/edit/:id', async (req, res) => {

    if (!checkBody(req.body, ['name', 'unit'])) {
        return res.json({ result: false, error: "Champs manquants ou invalides" })
    }


    const mesure = await Mesure.findByIdAndUpdate(req.params.id , { name: req.body.name,unit:req.body.unit },
        function (err, docs) {
            if (err){
            console.log(err)
            }
            else{
            console.log("Mesure modifiée", docs);
            }
            });

    const updateMesure = await mesure.save()
    if (updateMesure) {
        res.json({ result: true })
    }
    else {
        res.json({ result: false, error: "Erreur lors de la modification de la mesure." })
    }
})

/**
 *  Supprimer une mesure
 */
router.delete('/:id', async (req, res) => {

    await Mesure.findByIdAndDelete(req.params.id, function (error) {
        if (error) {
            res.json({ result: false, error: err })
        }
        else {
            res.json({ result: true })
        }
    });

})

module.exports = router;