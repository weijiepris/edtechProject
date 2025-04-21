import { Router } from 'express';
import { isLoggedIn } from '../../middleware/auth';
import { getSubmissionsByClass, getTeacherClasses, gradeSubmission } from './routes';

const router = Router();

router.use(isLoggedIn);
router.get('/class', getTeacherClasses);
router.get('/class/:courseUuid/submissions', getSubmissionsByClass);
router.post('/submission/:id/grade', gradeSubmission);

export default router;
