const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: {type: String ,unique: true,trim:true},
  categorie:{ type: mongoose.ObjectId, ref: 'IngredientCategorie',trim:true },
  picture:String,

});

// Compile model from schema
const Ingredient = mongoose.model("Ingredient", IngredientSchema);
module.exports = Ingredient;