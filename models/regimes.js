const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const regimeSchema = new Schema({
    name: {type: String ,unique: true,trim:true},
    label : String,
    type: String
});

// Compile model from schema
const Regime = mongoose.model("Regime", regimeSchema);
module.exports = Regime;