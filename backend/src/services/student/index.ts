import { Router } from 'express';
import { isLoggedIn } from '../../middleware/auth';
import { getAssignmentsByClass, getClasses } from './routes';

const router = Router();

router.use(isLoggedIn);
router.get('/class', getClasses);
router.get('/assignment/:courseUuid', getAssignmentsByClass);

export default router;
