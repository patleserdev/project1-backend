var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/checkBody');
const Ingredient = require('../models/ingredients');
const IngredientCategorie = require('../models/ingredientsCategories');

/**
 *  Afficher tous les ingrédients
 */
router.get('/', async (req, res) => {

    const ingredients = await Ingredient.find({})

    res.json({ result: true, data: ingredients })

})

/**
 *  Afficher les ingrédients par catégorie
 */
router.get('/:categorie', async (req, res) => {

    if (!checkBody(req.params, ['categorie'])) {
        return res.json({ result: false, error: "Champs manquants ou invalides" })
    }

    const ingredients = await Ingredient.find({ 'categorie.name': req.params.categorie })
        .populate('IngredientCategorie')
    res.json({ result: true, data: ingredients })

})

/**
 *  Ajouter un ingrédient
 */
router.post('/new', async (req, res) => {

    if (!checkBody(req.body, ['name', 'categorie'])) {
        return res.json({ result: false, error: "Champs manquants ou invalides" })
    }

    if (req.body.picture) {
        //penser à ajouter les images des ingrédients
    }

    // recup id
    console.log(req.body.name)
    const categorie = await IngredientCategorie.findOne({ name: req.body.categorie })

    if (!categorie) {
        return res.json({ result: false, error: "Catégorie inconnue" })
    }
    const newIngredient = new Ingredient({
        name: req.body.name,
        categorie: categorie._id,
        picture: req.body.picture | null
    })
    const addIngredient = await newIngredient.save()
    if (addIngredient) {
        res.json({ result: true })
    }
    else {
        res.json({ result: false, error: "Erreur lors de l'ajout de l'ingrédient." })
    }
})

/**
 *  Modifier un ingrédient
 */
router.put('/edit/:id', async (req, res) => {

    if (!checkBody(req.body, ['name', 'categorie'])) {
        return res.json({ result: false, error: "Champs manquants ou invalides" })
    }

    if (req.body.picture) {
        //penser à ajouter les images des ingrédients
    }

    // recup id
    const categorie = await IngredientCategorie.findOne({ name: req.body.name })

    if (!categorie) {
        return res.json({ result: false, error: "Catégorie inconnue" })
    }

    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id , { name: req.body.name,categorie:categorie._id },
        function (err, docs) {
            if (err){
            console.log(err)
            }
            else{
            console.log("Ingrédient modifié: ", docs);
            }
            });

    const updateIngredient = await ingredient.save()
    if (updateIngredient) 
    {
        res.json({ result: true })
    }
    else {
        res.json({ result: false, error: "Erreur lors de la modification de l'ingrédient." })
    }
})

/**
 *  Supprimer un ingrédient
 */
router.delete('/:id', async (req, res) => {

    await Ingredient.findByIdAndDelete(req.params.id, function (error, doc) {
        if (error) {
            res.json({ result: false, error: err })
        }
        else {
            res.json({ result: true })
        }
    });

})


module.exports = router;