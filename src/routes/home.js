import { Router } from 'express';
import * as homeController from '../controllers/homeController.js';

const router = Router();
router.get('/', homeController.accueil);
export default router;