// Importando el Router para subrutas
import { Router } from 'express';

// Importando al controlador Home
import userController from '@server/controllers/userController';

// Creando instancia del router
const router = new Router();
/* GET users listing. */
router.get('/', userController.index);

export default router;
