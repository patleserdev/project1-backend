const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeCategorieSchema = new Schema({
    name: {type: String ,unique: true,trim:true},
    label : String

});

// Compile model from schema
const RecipeCategorie = mongoose.model("RecipeCategorie", recipeCategorieSchema);
module.exports = RecipeCategorie;