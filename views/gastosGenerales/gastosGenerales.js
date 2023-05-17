const mongoose = require('mongoose');
//const double = require('@mongoosejs/double');
var SchemaTypes = mongoose.Schema.Types;

const gastosGeneralesSchema = new mongoose.Schema({
    cantidad: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precioUnitario: {
        type: SchemaTypes.Double,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    distribuidor: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    fechaEmision: {
        dia: {
            type: Number,
            required: true
        },
        mes: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
});
gastosGeneralesSchema.methods.getDistribuidor = function() {
    return `Distribuidor: ${this.distribuidor} Direccion: ${this.direccion} telefono: ${this.telefono}`;
};

module.exports = mongoose.model("GastosGenerales", gastosGeneralesSchema);