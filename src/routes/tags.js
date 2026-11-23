import { Router } from 'express';
import * as tagsController from '../controllers/tagsController.js';

const router = Router();
router.get('/', tagsController.liste);
router.get('/:id', tagsController.detail);
export default router;