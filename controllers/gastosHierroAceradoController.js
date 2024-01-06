const GastosHierroAcerado = require('../models/hierroAcerado');

module.exports = {
    index: (req, res, next) => {
        GastosHierroAcerado.find({}).sort({fecha: -1})
       .then(gastoshierroacerados => {
        res.locals.gastoshierroacerados = gastoshierroacerados;
        
        next();
       })
       .catch(error => {
        console.log(`Error fetching pagos de Hierro Acerado: ${error.message}`)
        next(error);
    })
    },
    indexView: (req, res) => {
        res.render("gastosHierroAcerado/index", {title:"Compra de Hierro Acerado"});
    },
    new: (req, res) => {
        res.render("gastosHierroAcerado/new", {title:"Ingreso de compra de Hierro Acerado"});
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
        GastosHierroAcerado.create(userParams)
            .then(gastoshierroacerados => {
                res.locals.redirect = "/verComprasHierroAcerado";
                res.locals.gastoshierroacerados = gastoshierroacerados;
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
        GastosHierroAcerado.findById(pagosId)
            .then(gastoshierroacerados => {
                res.render("gastosHierroAcerado/edit", {
                    gastoshierroacerados: gastoshierroacerados,
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
        GastosHierroAcerado.findByIdAndUpdate(pagosId, {
            $set: pagosParams
        })
        .then(gastoshierroacerados => {
            res.locals.redirect = '/verComprasHierroAcerado';
            res.locals.gastoshierroacerados = gastoshierroacerados;
            next();
        })
        .catch(error => {
            console.log(`Error updating gastos by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let pagosId = req.params.id;
        GastosHierroAcerado.findByIdAndRemove(pagosId)
            .then(() => {
                res.locals.redirect = "/verComprasHierroAcerado";
                next();
            })
            .catch(error => {
                console.log(`Error al eliminar registro de pagos por ID ${error.message}`);
                next();
            })
    }
}