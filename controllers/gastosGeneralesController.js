const GastosGenerales = require('../models/gastosGenerales');
//db.gastosgenerales.aggregate([{$group:{_id:null, inversion:{$sum:"$total"}}}])
module.exports = {
    index: (req, res, next) => {
        GastosGenerales.find({})
            .then(gastosgenerales => {
                res.locals.gastosgenerales = gastosgenerales;
                next();
            })
            .catch(error => {
                console.log(`Error fetching Gatos generales: ${error.message}`)
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render("gastosGenerales/index", {title:"Gastos Generales de Construccion"});
    },
    new: (req, res) => {
        res.render("gastosGenerales/new", {title:"Ingreso de gastos"});
    },
    create: (req, res, next) => {
        let userParams = {
            cantidad: req.body.cantidad,
            descripcion: req.body.descripcion,
            precioUnitario: req.body.precioUnitario,
            centavos: req.body.centavos,
            total: req.body.total,
            fecha: req.body.fecha,
            distribuidor: req.body.distribuidor,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            fechaEmision: {
                dia: req.body.dia,
                mes: req.body.mes,
                year: req.body.year,
            }
        };
        GastosGenerales.create(userParams)
            .then(gastosgenerales => {
                res.locals.redirect = '/verGastos';
                res.locals.gastosgenerales = gastosgenerales;
                    next();
            })
            .catch(error => {
                console.log(`Error saving gastos ${error.message}`);
                    next(error);
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath)res.redirect(redirectPath);
        else next();
    },
    edit: (req, res, next) => {
        let gastosId = req.params.id;
        GastosGenerales.findById(gastosId)
            .then(gastosgenerales => {
                res.render("gastosGenerales/edit", {
                    gastosgenerales: gastosgenerales,
                    title: "Edicion de gastos"
                });
            })
            .catch(error => {
                console.log(`Error fetching gastos by ID: ${error.message}`)
            });
    },
    update: (req, res, next) => {
        let gastosId = req.params.id,
            gastosParams = {
                cantidad: req.body.cantidad,
                descripcion: req.body.descripcion,
                precioUnitario: req.body.precioUnitario,
                centavos: req.body.centavos,
                total: req.body.total,
                fecha: req.body.fecha,
                distribuidor: req.body.distribuidor,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                fechaEmision: {
                    dia: req.body.dia,
                    mes: req.body.mes,
                    year: req.body.year,
                }
            };
            GastosGenerales.findByIdAndUpdate(gastosId, {
                $set: gastosParams
            })
                .then(gastosgenerales => {
                    res.locals.redirect = `/verGastos`;
                    res.locals.gastosgenerales = gastosgenerales;
                    next();
                })
                .catch(error =>{
                    console.log(`Error updating gastos by ID: ${error.message}`);
                    next(error);
                })
    },
    delete: (req, res, next) => {
        let gastosId = req.params.id;
        GastosGenerales.findByIdAndRemove(gastosId)
            .then(() => {
                res.locals.redirect = "/verGastos";
                next();
            })
            .catch(error => {
                console.log(`Error al eliminar registro de gasto por ID ${error.message}`);
                next();
            })
    }

}