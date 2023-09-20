const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    age: {
        type: Number,
        require: true
    },
    telefone: {
        type: Number,
        require:true
    },
    race: {
    type: String,
    require: true
    },
});

module.exports = mongoose.model('User',userSchema);