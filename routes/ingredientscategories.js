var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/checkBody');
const IngredientCategorie = require('../models/ingredientsCategories');

/**
 *  Afficher tous les ingrédients
 */
router.get('/', async (req, res) => {

    const categories = await IngredientCategorie.find({})

    res.json({ result: true, data: categories })

})



/**
 *  Ajouter une catégorie d'ingrédients
 */
router.post('/new', async (req, res) => {

    if (!checkBody(req.body, ['name', 'description'])) {
        return res.json({ result: false, error: "Champs manquants ou invalides" })
    }


    const newCategorie = new IngredientCategorie({
        name: req.body.name,
        description: req.body.description,
        
    })
    const addCategorie = await newCategorie.save()
    if (addCategorie) {
        res.json({ result: true })
    }
    else {
        res.json({ result: false, error: "Erreur lors de l'ajout de la catégorie." })
    }
})

/**
 *  Editer une catégorie d'ingrédients
 */
router.put('/edit/:id', async (req, res) => {

    if (!checkBody(req.body, ['name', 'description'])) {
        return res.json({ result: false, error: "Champs manquants ou invalides" })
    }


    const categorie = await IngredientCategorie.findByIdAndUpdate(req.params.id , { name: req.body.name,description:req.body.description },
        function (err, docs) {
            if (err){
            console.log(err)
            }
            else{
            console.log("Catégorie modifiée: ", docs);
            }
            });

    const updateCategorie = await categorie.save()
    if (updateCategorie) {
        res.json({ result: true })
    }
    else {
        res.json({ result: false, error: "Erreur lors de la modification de la catégorie." })
    }
})

/**
 *  Supprimer un ingrédient
 */
router.delete('/:id', async (req, res) => {

    await IngredientCategorie.findByIdAndDelete(req.params.id, function (error) {
        if (error) {
            res.json({ result: false, error: err })
        }
        else {
            res.json({ result: true })
        }
    });

})



module.exports = router;