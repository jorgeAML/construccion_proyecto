const mongoose = require('mongoose'),
    {Schema} = mongoose;

const pagosAguaAsovenalSchema = new Schema({
    recibo: {
        type: Number,
        required: true,
        unique: true
    },
    mes: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    cuenta: {
        type: Number,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    actual: {
        type: Number,
        required: true
    },
    anterior: {
        type: Number,
        required: true
    },
    consumo: {
        type: Number,
        required: true
    },
    exceso: {
        type: Number,
        required: true
    },
    pago: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Agua2022Asovenal", pagosAguaAsovenalSchema);