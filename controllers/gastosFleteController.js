const GastosFlete = require('../models/fletes');

module.exports = {
    index: (req, res, next) => {
        GastosFlete.find({}).sort({fecha: -1})
       .then(gastosfletes => {
        res.locals.gastosfletes = gastosfletes;
        
        next();
       })
       .catch(error => {
        console.log(`Error fetching pagos de fletes: ${error.message}`)
        next(error);
    })
    },
    indexView: (req, res) => {
        res.render("gastosFlete/index", {title:"Compra de Fletes"});
    },
    new: (req, res) => {
        res.render("gastosFlete/new", {title:"Ingreso de compra de Fletes"});
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
        GastosFlete.create(userParams)
            .then(gastosfletes => {
                res.locals.redirect = "/verComprasFlete";
                res.locals.gastosfletes = gastosfletes;
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
        GastosFlete.findById(pagosId)
            .then(gastosfletes => {
                res.render("gastosFlete/edit", {
                    gastosfletes: gastosfletes,
                    title: "Edicion de pagos de fletes"
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
        GastosFlete.findByIdAndUpdate(pagosId, {
            $set: pagosParams
        })
        .then(gastosfletes => {
            res.locals.redirect = '/verComprasFlete';
            res.locals.gastosfletes = gastosfletes;
            next();
        })
        .catch(error => {
            console.log(`Error updating gastos by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let pagosId = req.params.id;
        GastosFlete.findByIdAndRemove(pagosId)
            .then(() => {
                res.locals.redirect = "/verComprasFlete";
                next();
            })
            .catch(error => {
                console.log(`Error al eliminar registro de pagos por ID ${error.message}`);
                next();
            })
    }
}