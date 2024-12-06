const GastosPlomeriaDrenaje = require('../models/plomeria');

module.exports = {
    index: (req, res, next) => {
        GastosPlomeriaDrenaje.find({}).sort({fecha: -1})
       .then(gastosplomeriadrenajes => {
        res.locals.gastosplomeriadrenajes = gastosplomeriadrenajes;
        
        next();
       })
       .catch(error => {
        console.log(`Error fetching pagos de plomeria y drenajes: ${error.message}`)
        next(error);
    })
    },
    indexView: (req, res) => {
        res.render("gastosPlomeriaDrenaje/index", {title:"Compra de plomeria y accesorios de drenajes"});
    },
    new: (req, res) => {
        res.render("gastosPlomeriaDrenaje/new", {title:"Ingreso de compra de plomeria y drenaje"});
    },
    create: (req, res, next) => {
        let userParams = {
            pedido: req.body.pedido,
            cantidad: req.body.cantidad,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            precio: req.body.precio,
            total: req.body.total,
            empresa: req.body.empresa,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            centavos: req.body.centavos
        };
        GastosPlomeriaDrenaje.create(userParams)
            .then(gastosplomeriadrenajes => {
                res.locals.redirect = "/verComprasPlomeriaDrenaje";
                res.locals.gastosplomeriadrenajes = gastosplomeriadrenajes;
                next();
            })
            .catch(error => {
                console.log(`Error saving pagos ${error.message}`);
                    next(error);
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath)res.redirect(redirectPath);
        else next();
    },
    edit: (req, res, next) => {
        let pagosId = req.params.id;
        GastosPlomeriaDrenaje.findById(pagosId)
            .then(gastosplomeriadrenajes => {
                res.render("gastosPlomeriaDrenaje/edit", {
                    gastosplomeriadrenajes: gastosplomeriadrenajes,
                    title: "Edicion de pagos de hierro acerado"
                });
            })
            .catch(error => {
                console.log(`Error fetching pagos by ID: ${error.message}`)
            });
    },
    update: (req, res, next) => {
        let pagosId = req.params.id,
        pagosParams = {
            pedido: req.body.pedido,
            cantidad: req.body.cantidad,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            precio: req.body.precio,
            total: req.body.total,
            empresa: req.body.empresa,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            centavos: req.body.centavos
        };
        GastosPlomeriaDrenaje.findByIdAndUpdate(pagosId, {
            $set: pagosParams
        })
        .then(gastosplomeriadrenajes => {
            res.locals.redirect = '/verComprasPlomeriaDrenaje';
            res.locals.gastosplomeriadrenajes = gastosplomeriadrenajes;
            next();
        })
        .catch(error => {
            console.log(`Error updating gastos by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let pagosId = req.params.id;
        GastosPlomeriaDrenaje.findByIdAndRemove(pagosId)
            .then(() => {
                res.locals.redirect = "/verComprasPlomeriaDrenaje";
                next();
            })
            .catch(error => {
                console.log(`Error al eliminar registro de pagos por ID ${error.message}`);
                next();
            })
    }
}