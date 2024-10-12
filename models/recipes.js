const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
    
    ing:  {type: mongoose.ObjectId, ref: 'IngredientCategorie' },
    mesure: {type: mongoose.ObjectId, ref: 'Mesure' },
    quantity: Number,
});


const recipeSchema = new Schema({
    name: String,
    defaultServing : Number,
    ingredients:  [ingredientsSchema],
    steps:[String],
    pictures:[String],
    timeToCook:Number,
    timeToPrepare:Number,
    time:Number,
    difficulty:Number
});

// Compile model from schema
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;