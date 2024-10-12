const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IngredientCategorieSchema = new Schema({
    name: {type: String ,unique: true,trim:true},
    description:String

});

// Compile model from schema
const IngredientCategorie = mongoose.model("IngredientCategorie", IngredientCategorieSchema);
module.exports = IngredientCategorie;