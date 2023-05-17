const mongoose = require('mongoose'),
    {Schema} = mongoose;


const gastosGeneralesSchema = new Schema({
    cantidad: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precioUnitario: {
        type: Number,
        required: true
    },
    centavos: {
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
            type: Number
            
        },
        mes: {
            type: String
            
        },
        year: {
            type: Number
            
        }
    },
});
gastosGeneralesSchema.methods.getDistribuidor = function() {
    return `Distribuidor: ${this.distribuidor} Direccion: ${this.direccion} telefono: ${this.telefono}`;
};
gastosGeneralesSchema.virtual("Precio").get(function(){
    if(this.centavos < 10) {
        return `Q${this.precioUnitario}.0${this.centavos}`;
    } else {
        return `Q${this.precioUnitario}.${this.centavos}`;
    }  
});
gastosGeneralesSchema.virtual("Total").get(function(){
    return `Q${this.total}.00`;
})

module.exports = mongoose.model("GastosGenerales", gastosGeneralesSchema);