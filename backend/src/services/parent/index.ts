import { Router } from 'express';
import { isLoggedIn } from '../../middleware/auth';
import {
  getChildAssignmentsByClass,
  getChildGradesByClass,
  getChildrenByClass,
  getParentChildClasses
} from './routes';

const router = Router();

router.use(isLoggedIn);
router.get('/child/classes', getParentChildClasses);
router.get('/child/class/:classId', getChildrenByClass);
router.get('/class/:classId/assignments/:childId', getChildAssignmentsByClass);
router.get('/class/:classId/assignments/:childId/grades', getChildGradesByClass);

export default router;
