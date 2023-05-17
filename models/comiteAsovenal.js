const mongoose = require('mongoose'),
    {Schema} = mongoose;

const pagosComiteAsovenalSchema = new Schema ({
    fecha: {
        type: Date,
        required: true
    },
    mes: {
        type: String,
        required:true
    },
    year: {
        type: Number,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    familia: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    recibo: {
        type: Number,
        required: true,
        unique: true
    }
});


module.exports = mongoose.model("comiteAsovenal", pagosComiteAsovenalSchema);