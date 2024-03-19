const mongoose = require('mongoose'),
    {Schema} = mongoose;

const compraArenaPiedrinSchema = new Schema({
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
    },
    empresa: {
        type: String,
        required: false
    },
    direccion: {
        type: String,
        required: false
    },
    telefono: {
        type: Number,
        required: false
    },
    centavos: {
        type: Number,
        required: true
    }
});

compraArenaPiedrinSchema.virtual("Precio").get(function(){
    if(this.centavos < 10) {
        return `Q${this.precio}.0${this.centavos}`;
    } else {
        return `Q${this.precio}.${this.centavos}`;
    }
})
module.exports = mongoose.model("GastosArenaPiedrin", compraArenaPiedrinSchema);