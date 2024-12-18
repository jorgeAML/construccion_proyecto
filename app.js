const mongoose = require('mongoose');
mongoose.connect(
    "mongodb://localhost:27017/db_gastos_construccion",
    {useNewUrlParser:true}
);
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to mongodb using Mongoose!");
});
mongoose.Promise = global.Promise;

const port = 3002;
const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const layouts = require('express-ejs-layouts');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const homeController = require('./controllers/homeController');
const gastosController = require('./controllers/gastosGeneralesController');
const pagosComiteAsovenal = require('./controllers/comitePagosController');
const PagosAgua2022Asovenal = require("./controllers/comitePagosAgua2022Controller");
const PagosBlock = require("./controllers/gastosBlockController");
const PagosFlete = require("./controllers/gastosFleteController");
const PagosHierroAcerado = require('./controllers/gastosHierroAceradoController');
const PagosCemento = require('./controllers/gastosCementoController');
const PagosArenaPiedrin = require('./controllers/gastosArenaPiedrinController');
const PagosPlomeriaDrenaje = require('./controllers/gastosPlomeriaController');
//CONTROLLERS
app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.use('/', router);
app.set('port', process.env.port || 3002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.bodyParser());
app.use(layouts);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));




router.get('/', homeController.respondWithIndex);
//Gastos generales
router.get('/verGastos', gastosController.index, gastosController.indexView);
router.get('/guardarGastos', gastosController.new);
router.post('/gastosGenerales/create', gastosController.create, gastosController.redirectView);
//Editar gastos generales
router.get('/gastosGenerales/:id/edit', gastosController.edit);
router.put('/gastosGenerales/:id/update', gastosController.update, gastosController.redirectView);
//Eliminar registro de gastos generales
router.delete('/gastosGenerales/:id/delete', gastosController.delete, gastosController.redirectView);

/*PAGOS ASOVENAL COMITE*/
router.get('/verPagosAsovenal', pagosComiteAsovenal.index, pagosComiteAsovenal.indexView);
router.get('/savePagosAsovenal', pagosComiteAsovenal.new);
router.post('/comiteAsovenal/guardarPago', pagosComiteAsovenal.create, pagosComiteAsovenal.redirectView);
router.get('/comiteAsovenal/:id/edit', pagosComiteAsovenal.edit);
router.put('/comiteAsovenal/:id/update', pagosComiteAsovenal.update, pagosComiteAsovenal.redirectView);
router.delete('/comiteAsovenal/:id/delete', pagosComiteAsovenal.delete, pagosComiteAsovenal.redirectView);

/*PAGOS AGUA ASOVENAL*/
router.get('/verAgua22Asovenal', PagosAgua2022Asovenal.index, PagosAgua2022Asovenal.indexView);
router.get('/saveAgua22Asovenal', PagosAgua2022Asovenal.new);
router.post('/agua2022Asovenal/guardarPago', PagosAgua2022Asovenal.create, PagosAgua2022Asovenal.redirectView);
router.get('/agua2022Asovenal/:id/edit', PagosAgua2022Asovenal.edit);
router.put('/agua2022Asovenal/:id/update', PagosAgua2022Asovenal.update, PagosAgua2022Asovenal.redirectView);
router.delete('/agua2022Asovenal/:id/delete', PagosAgua2022Asovenal.delete, PagosAgua2022Asovenal.redirectView);

/*PAGOS BLOCK*/
router.get('/verComprasBLocks', PagosBlock.index, PagosBlock.indexView);
router.get('/saveGastosBlock', PagosBlock.new);
router.post('/gastosBlock/guardarPago', PagosBlock.create, PagosBlock.redirectView);
router.get('/gastosBlock/:id/edit', PagosBlock.edit);
router.put('/gastosBlock/:id/update', PagosBlock.update, PagosBlock.redirectView);
router.delete('/gastosBlock/:id/delete', PagosBlock.delete, PagosBlock.redirectView);

/*PAGOS FLETES*/
router.get('/verComprasFlete', PagosFlete.index, PagosFlete.indexView);
router.get('/saveGastosFlete', PagosFlete.new);
router.post('/gastosFlete/guardarPago', PagosFlete.create, PagosFlete.redirectView);
router.get('/gastosFlete/:id/edit', PagosFlete.edit);
router.put('/gastosFlete/:id/update', PagosFlete.update, PagosFlete.redirectView);
router.delete('/gastosFlete/:id/delete', PagosFlete.delete, PagosFlete.redirectView);

/*PAGOS HIERRO ACERADO*/
router.get('/verComprasHierroAcerado', PagosHierroAcerado.index, PagosHierroAcerado.indexView);
router.get('/saveGastosHierroAcerado', PagosHierroAcerado.new);
router.post('/gastosHierroAcerado/guardarPago', PagosHierroAcerado.create, PagosHierroAcerado.redirectView);
router.get('/gastosHierroAcerado/:id/edit', PagosHierroAcerado.edit);
router.put('/gastosHierroAcerado/:id/update', PagosHierroAcerado.update, PagosHierroAcerado.redirectView);
router.delete('/gastosHierroAcerado/:id/delete', PagosHierroAcerado.delete, PagosHierroAcerado.redirectView);
/*PAGOS CEMENTO*/
router.get('/verComprasCemento', PagosCemento.index, PagosCemento.indexView);
router.get('/saveGastosCemento', PagosCemento.new);
router.post('/gastosCemento/guardarPago', PagosCemento.create, PagosCemento.redirectView);
router.get('/gastosCemento/:id/edit', PagosCemento.edit);
router.put('/gastosCemento/:id/update', PagosCemento.update, PagosCemento.redirectView);
router.delete('/gastosCemento/:id/delete', PagosCemento.delete, PagosCemento.redirectView);
/*PAGOS ARENA Y PIEDRIN*/
router.get('/verComprasArenaPiedrin', PagosArenaPiedrin.index, PagosArenaPiedrin.indexView);
router.get('/saveGastosArenaPiedrin', PagosArenaPiedrin.new);
router.post('/gastosArenaPiedrin/guardarPago', PagosArenaPiedrin.create, PagosArenaPiedrin.redirectView);
router.get('/gastosArenaPiedrin/:id/edit', PagosArenaPiedrin.edit);
router.put('/gastosArenaPiedrin/:id/update', PagosArenaPiedrin.update, PagosArenaPiedrin.redirectView);
router.delete('/gastosArenaPiedrin/:id/delete', PagosArenaPiedrin.delete, PagosArenaPiedrin.redirectView);
/*PAGOS PLOMERIA Y DRENAJE*/
router.get('/verComprasPlomeriaDrenaje', PagosPlomeriaDrenaje.index, PagosPlomeriaDrenaje.indexView);
router.get('/saveGastosPlomeriaDrenaje', PagosPlomeriaDrenaje.new);
router.post('/gastosPlomeriaDrenaje/guardarPago', PagosPlomeriaDrenaje.create, PagosPlomeriaDrenaje.redirectView);
router.get('/gastosPlomeriaDrenaje/:id/edit', PagosPlomeriaDrenaje.edit);
router.put('/gastosPlomeriaDrenaje/:id/update', PagosPlomeriaDrenaje.update, PagosPlomeriaDrenaje.redirectView);
router.delete('/gastosPlomeriaDrenaje/:id/delete', PagosPlomeriaDrenaje.delete, PagosPlomeriaDrenaje.redirectView);
/*PAGOS PRODUCTOS ELECTRICOS*/

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Proyecto base de datos gastos esta activo en el puerto http://localhost:${app.get("port")}`);
});
//start the app with nodemon app.js