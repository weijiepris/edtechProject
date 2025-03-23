import { isLoggedIn } from '../../middleware/auth';
import { Router } from '../../expressModule';
import { getAccount, login, logout, register, validate } from './routes';
const router = Router();

router.get('/', validate);
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

router.use(isLoggedIn);
router.get('/account', getAccount);

export default router;
