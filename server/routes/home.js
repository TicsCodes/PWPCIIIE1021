// Importando el Router para subrutas
import { Router } from 'express';

// Importando al controlador Home
import homeController from '@server/controllers/homeController';

// Creando la instancia de un router
const router = new Router();

// Get '/'
router.get('/', homeController.index);

// Get '/greeting'
router.get('/greeting', homeController.greeting);

// Exportando el router que maneja las subrutas para el controlador home
export default router;
