var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', Author: 'Isaac Estrada', appName: 'WebApp PWPCII' });
});

/* Agregando una nueva ruta*/
router.get('/greeting', function(req, res, next){
  res.status(200).json({message: 'Estas creando una nueva ruta PWPCII'})
})
module.exports = router;
