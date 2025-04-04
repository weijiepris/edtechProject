// src/services/student/routes.ts

import { Router } from 'express';
import { isLoggedIn } from '../../middleware/auth';
import { getClasses } from './routes';

const router = Router();

router.use(isLoggedIn);
router.get('/class', getClasses);

export default router;
