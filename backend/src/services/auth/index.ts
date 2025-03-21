import { isLoggedIn } from '../../middleware/auth';
import { Router } from '../../expressModule';
import { login, logout, register, test } from './routes';
const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

router.use(isLoggedIn);
router.get('/', test);

export default router;
