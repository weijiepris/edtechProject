import { isLoggedIn } from '../../middleware/auth';
import { Router } from '../../expressModule';
import { login, logout, register, test } from './routes';
const router = Router();

router.get('/login', login);
router.get('/register', register);
router.get('/logout', logout);

router.use(isLoggedIn);
router.get('/', test);
export default router;
