import { isLoggedIn } from '../../middleware/auth';
import { Router } from '../../expressModule';
import { getProfile, updateProfile } from './routes';
const router = Router();

router.use(isLoggedIn);
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);

export default router;
