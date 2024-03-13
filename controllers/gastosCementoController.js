const GastosCemento = require('../models/cemento');

module.exports = {
    index: (req, res, next) => {
        GastosCemento.find({}).sort({fecha: -1})
       .then(gastoscementos => {
        res.locals.gastoscementos = gastoscementos;
        
        next();
       })
       .catch(error => {
        console.log(`Error fetching pagos de cementos: ${error.message}`)
        next(error);
    })
    },
    indexView: (req, res) => {
        res.render("gastosCemento/index", {title:"Compra de Cemento"});
    },
    new: (req, res) => {
        res.render("gastosCemento/new", {title:"Ingreso de compra de Cemento"});
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
        GastosCemento.create(userParams)
            .then(gastoscementos => {
                res.locals.redirect = "/verComprasCemento";
                res.locals.gastoscementos = gastoscementos;
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
        GastosCemento.findById(pagosId)
            .then(gastoscementos => {
                res.render("gastosCemento/edit", {
                    gastoscementos: gastoscementos,
                    title: "Edicion de pagos de Cementos"
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
        GastosCemento.findByIdAndUpdate(pagosId, {
            $set: pagosParams
        })
        .then(gastoscementos => {
            res.locals.redirect = '/verComprasCemento';
            res.locals.gastoscementos = gastoscementos;
            next();
        })
        .catch(error => {
            console.log(`Error updating gastos by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let pagosId = req.params.id;
        GastosCemento.findByIdAndRemove(pagosId)
            .then(() => {
                res.locals.redirect = "/verComprasCemento";
                next();
            })
            .catch(error => {
                console.log(`Error al eliminar registro de pagos por ID ${error.message}`);
                next();
            })
    }
}