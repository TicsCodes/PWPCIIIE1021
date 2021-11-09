import ExpHbs from 'express-handlebars';
import path from 'path';

// Exportando una funcion de configuracion
export default (app) => {
  // Se utilizara su contenido para el configurar el motor de plantilla
  // 1. Registrar el motor de plantillas
  app.engine(
    'hbs',
    ExpHbs({
      extname: '.hbs',
      defaultLayout: 'main',
    }),
  );
  // 2. Seleccionar el motor de plantillas recien registrado
  // Permite establecer valores a variables internas de handlebars
  app.set('view engine', 'hbs');
  // 3. Estableciendo la ruta de las vistas
  // views es la variable interna que permitira configurar cual sera la ruta
  app.set('views', path.join(__dirname, '..', 'views'));

  // Retornando el valor de entrada
  return app;
};
