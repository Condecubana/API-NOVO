const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    telefone: {
        type: Number,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    agepet: {
        type: Number,
        require: true
    },
    race: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('User',userSchema);