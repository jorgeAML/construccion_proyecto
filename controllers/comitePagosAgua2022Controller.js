const Agua2022Asovenal = require("../models/comiteAguaAsovenal");

module.exports = {
    index: (req, res, next) => {
       Agua2022Asovenal.find({}).sort({fecha: -1})
       .then(agua2022asovenals => {
        res.locals.agua2022asovenals = agua2022asovenals;
        next();
       })
       .catch(error => {
        console.log(`Error fetching pagos agua 2022 asovenal: ${error.message}`)
        next(error);
    })
    },
    indexView: (req, res) => {
        res.render("agua2022Asovenal/index", {title:"Pagos agua asovenal"});
    },
    new: (req, res) => {
        res.render("agua2022Asovenal/new", {title:"Ingreso de pagos agua asovenal"});
    },
    create: (req, res, next) => {
        let userParams = {
            recibo: req.body.recibo,
            mes: req.body.mes,
            year: req.body.year,
            fecha: req.body.fecha,
            cuenta: req.body.cuenta,
            direccion: req.body.direccion,
            actual: req.body.actual,
            anterior: req.body.anterior,
            consumo: req.body.consumo,
            exceso: req.body.exceso,
            pago: req.body.pago
            
        };
        Agua2022Asovenal.create(userParams)
            .then(agua2022asovenals => {
                res.locals.redirect = "/verAgua22Asovenal";
                res.locals.agua2022asovenals = agua2022asovenals;
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
        Agua2022Asovenal.findById(pagosId)
            .then(agua2022asovenals => {
                res.render("agua2022Asovenal/edit", {
                    agua2022asovenals: agua2022asovenals,
                    title: "Edicion de pagos agua Asovenal"
                });
            })
            .catch(error => {
                console.log(`Error fetching pagos by ID: ${error.message}`)
            });
    },
    update: (req, res, next) => {
        let pagosId = req.params.id,
        pagosParams = {
            recibo: req.body.recibo,
            mes: req.body.mes,
            year: req.body.year,
            fecha: req.body.fecha,
            cuenta: req.body.cuenta,
            direccion: req.body.direccion,
            actual: req.body.actual,
            anterior: req.body.anterior,
            consumo: req.body.consumo,
            exceso: req.body.exceso,
            pago: req.body.pago
        };
        Agua2022Asovenal.findByIdAndUpdate(pagosId, {
            $set: pagosParams
        })
        .then(agua2022asovenals => {
            res.locals.redirect = '/verAgua22Asovenal';
            res.locals.agua2022asovenals = agua2022asovenals;
            next();
        })
        .catch(error => {
            console.log(`Error updating gastos by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let pagosId = req.params.id;
        Agua2022Asovenal.findByIdAndRemove(pagosId)
            .then(() => {
                res.locals.redirect = "/verAgua22Asovenal";
                next();
            })
            .catch(error => {
                console.log(`Error al eliminar registro de pagos por ID ${error.message}`);
                next();
            })
    }
}