import {Router} from 'express';
import { proxyMiddleware } from '../controller/GatewayController.js';

const router = Router();

router.use('/:serviceName/*', proxyMiddleware);

export default router;
