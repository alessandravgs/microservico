import {Router} from 'express';
import { ServiceRegistryController } from '../controller/ServiceRegistryController.js';

const router = Router();

router.get("/", ServiceRegistryController.getAllServices);
router.get("/services/:name", ServiceRegistryController.getServiceByName);
router.post("/register", ServiceRegistryController.registerService);

export default router;