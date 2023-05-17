const ComiteAsovenal = require('../models/comiteAsovenal');
//.aggregate([{$group:{_id:null, inversion:{$sum:"$total"}}}])
//ComiteAsovenal.find({}).sort({fecha: -1})
async function test ()
{
    const res = await ComiteAsovenal.find({})
        .sort({mes:1}).limit(2);
    console.log(res);
    return true;
}
test();

module.exports = {
    index: (req, res, next) => {
        ComiteAsovenal.find({}).sort({fecha: -1})
        .then(comiteasovenals => {
            res.locals.comiteasovenals = comiteasovenals;
            next();
        })
        .catch(error => {
            console.log(`Error fetching pagos comite asovenal: ${error.message}`)
            next(error);
        })
    },
    indexView: (req, res) => {
        res.render("comiteAsovenal/index", {title:"Pagos comite asovenal"});
    },
    new: (req, res) => {
        res.render("comiteAsovenal/new", {title:"Ingreso de pagos comite asovenal"});
    },
    create: (req, res, next) => {
        let userParams = {
            fecha: req.body.fecha,
            mes: req.body.mes,
            year: req.body.year,
            direccion: req.body.direccion,
            familia: req.body.familia,
            cantidad: req.body.cantidad,
            recibo: req.body.recibo
        };
        ComiteAsovenal.create(userParams)
            .then(comiteasovenals => {
                res.locals.redirect = "/verPagosAsovenal";
                res.locals.comiteasovenals = comiteasovenals;
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
        ComiteAsovenal.findById(pagosId)
            .then(comiteasovenals => {
                res.render("comiteAsovenal/edit", {
                    comiteasovenals: comiteasovenals,
                    title: "Edicion de pagos Asovenal"
                });
            })
            .catch(error => {
                console.log(`Error fetching pagos by ID: ${error.message}`)
            });
    },
    update: (req, res, next) => {
        let pagosId = req.params.id,
        pagosParams = {
            fecha: req.body.fecha,
            mes: req.body.mes,
            year: req.body.year,
            direccion: req.body.direccion,
            familia: req.body.familia,
            cantidad: req.body.cantidad,
            recibo: req.body.recibo
        };
        ComiteAsovenal.findByIdAndUpdate(pagosId, {
            $set: pagosParams
        })
        .then(comiteasovenals => {
            res.locals.redirect = '/verPagosAsovenal';
            res.locals.comiteasovenals = comiteasovenals;
            next();
        })
        .catch(error => {
            console.log(`Error updating gastos by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let pagosId = req.params.id;
        ComiteAsovenal.findByIdAndRemove(pagosId)
            .then(() => {
                res.locals.redirect = "/";
                next();
            })
            .catch(error => {
                console.log(`Error al eliminar registro de pagos por ID ${error.message}`);
                next();
            })
    }
}