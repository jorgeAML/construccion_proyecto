const mongoose = require("mongoose"),
    {Schema} = mongoose;

const compraBlockSchema = new Schema({
    pedido: {
        type: Number,
        required: true,
        unique: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("GastosBlock", compraBlockSchema);
//ADD Centavos