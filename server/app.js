import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from '@s-routes/index';
import usersRouter from '@s-routes/users';

//Webpack Modules
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';
import webpackDevConfig from '../webpack.dev.config';

//Consultar el modo en que se esta ejecutando la aplicacion 
const env = process.env.NODE_ENV || 'development';

//Se crea la aplicacion express
var app = express();

//Verificando el modo de ejecucion de la aplicacion 
if(env === 'development'){
  console.log('>Executing in Development Mode: Webpack Hot Reloading');
  //Paso 1
  //Agregando la ruta del HMR
  //reload=true Habilita la recarga del frontend cuando hay cambios en el codigo fuente del frontend
  //timeout=1000ms Tiempo de espera entre regarga y recarga de la pagina 
  webpackConfig.entry =['webpack-hot-middleware/client?reload=true&timeout=1000', 
webpackConfig.entry];

//Paso 2
//Agregando el plugin
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

//Paso 3
//Crear el compilador de webpack
const compiler = webpack(webpackConfig);

//Paso 4
//Agregando el Middleware a la cadena de Middlewares de la aplicacion
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output.publicPath
}));

//Paso 5
//Agregando el webpack Hot Middleware
app.use(WebpackHotMiddleware(compiler));
}
else{
  console.log('>Executing in Production Mode...');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Sirve el contenido estatico
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..','public')));

//Sirve el contenido dinamico
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
