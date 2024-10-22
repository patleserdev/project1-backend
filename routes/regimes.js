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


module.exports = router;