import { isLoggedIn } from '../../middleware/auth';
import { Router } from '../../expressModule';
import { getChatPartners } from './routes';
const router = Router();

router.use(isLoggedIn);
router.get('/', getChatPartners);

export default router;
