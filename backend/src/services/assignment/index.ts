import express from 'express';
import { fetchAssignmentWithSubmission, getAssignmentById, submitAssignment } from './routes';
import { isLoggedIn } from '../../middleware/auth';

const router = express.Router();

router.use(isLoggedIn);
router.get('/:id', getAssignmentById);
router.get('/:classId/grades', fetchAssignmentWithSubmission);
router.post('/:id/submit', submitAssignment);

export default router;
