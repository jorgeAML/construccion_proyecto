const mongoose = require('mongoose'),
    {Schema} = mongoose;

const compraArmalitSchema = new Schema({
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
        required: true
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
compraArmalitSchema.virtual("Precio").get(function(){
    if(this.centavos < 10) {
        return `Q${this.precio}.0${this.centavos}`;
    } else {
        return `Q${this.precio}.${this.centavos}`;
    }
});
module.exports = mongoose.model("GastosHierroAcerado", compraArmalitSchema);