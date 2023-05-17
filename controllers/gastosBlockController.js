const gastosBlock = require('../models/gastosBlock');
const GastosBlock = require('../models/gastosBlock');

module.exports = {
    index: (req, res, next) => {
       GastosBlock.find({}).sort({fecha: -1})
       .then(gastosblocks => {
        res.locals.gastosblocks = gastosblocks;
        next();
       })
       .catch(error => {
        console.log(`Error fetching pagos de block: ${error.message}`)
        next(error);
    })
    },
    indexView: (req, res) => {
        res.render("gastosBlock/index", {title:"Compra de block"});
    },
    new: (req, res) => {
        res.render("gastosBlock/new", {title:"Ingreso de compra de block"});
    },
    create: (req, res, next) => {
        let userParams = {
            pedido: req.body.pedido,
            cantidad: req.body.cantidad,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            precio: req.body.precio,
            total: req.body.total,
        };
        GastosBlock.create(userParams)
            .then(gastosblocks => {
                res.locals.redirect = "/verComprasBLocks";
                res.locals.gastosblocks = gastosblocks;
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
        GastosBlock.findById(pagosId)
            .then(gastosblocks => {
                res.render("gastosBlock/edit", {
                    gastosblocks: gastosblocks,
                    title: "Edicion de pagos de block"
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
        };
        GastosBlock.findByIdAndUpdate(pagosId, {
            $set: pagosParams
        })
        .then(gastosblocks => {
            res.locals.redirect = '/verComprasBlocks';
            res.locals.gastosblocks = gastosblocks;
            next();
        })
        .catch(error => {
            console.log(`Error updating gastos by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let pagosId = req.params.id;
        GastosBlock.findByIdAndRemove(pagosId)
            .then(() => {
                res.locals.redirect = "/verComprasBlocks";
                next();
            })
            .catch(error => {
                console.log(`Error al eliminar registro de pagos por ID ${error.message}`);
                next();
            })
    }
}