const GastosArenaPiedrin = require('../models/arenaPiedrin');

module.exports = {
    index: (req, res, next) => {
        GastosArenaPiedrin.find({}).sort({fecha: -1})
       .then(gastosarenapiedrins => {
        res.locals.gastosarenapiedrins = gastosarenapiedrins;
        
        next();
       })
       .catch(error => {
        console.log(`Error fetching pagos de cementos: ${error.message}`)
        next(error);
    })
    },
    indexView: (req, res) => {
        res.render("gastosArenaPiedrin/index", {title:"Compra de Arena y piedrin"});
    },
    new: (req, res) => {
        res.render("gastosArenaPiedrin/new", {title:"Ingreso de compra de Arena y piedrin"});
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
        GastosArenaPiedrin.create(userParams)
            .then(gastosarenapiedrins => {
                res.locals.redirect = "/verComprasArenaPiedrin";
                res.locals.gastosarenapiedrins = gastosarenapiedrins;
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
        GastosArenaPiedrin.findById(pagosId)
            .then(gastosarenapiedrins => {
                res.render("gastosArenaPiedrin/edit", {
                    gastosarenapiedrins: gastosarenapiedrins,
                    title: "Edicion de pagos de Arena y Piedrin"
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
        GastosArenaPiedrin.findByIdAndUpdate(pagosId, {
            $set: pagosParams
        })
        .then(gastosarenapiedrins => {
            res.locals.redirect = '/verComprasArenaPiedrin';
            res.locals.gastosarenapiedrins = gastosarenapiedrins;
            next();
        })
        .catch(error => {
            console.log(`Error updating gastos by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let pagosId = req.params.id;
        GastosArenaPiedrin.findByIdAndRemove(pagosId)
            .then(() => {
                res.locals.redirect = "/verComprasArenaPiedrin";
                next();
            })
            .catch(error => {
                console.log(`Error al eliminar registro de pagos por ID ${error.message}`);
                next();
            })
    }
}