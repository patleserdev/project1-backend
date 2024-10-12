const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mesureSchema = new Schema({
    name: {type: String ,unique: true,trim:true},
    unit : {type: String,unique:true,trim:true}

});

// Compile model from schema
const Mesure = mongoose.model("Mesure", mesureSchema);
module.exports = Mesure;