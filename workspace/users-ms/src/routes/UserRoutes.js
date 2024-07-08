import {Router} from 'express';
import { UserController } from '../controller/UserController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post("/users", authMiddleware, UserController.save);
router.get("/users", authMiddleware, UserController.findAll);
router.get("/users/posts", authMiddleware, UserController.findAllUsersAndPosts);
router.get("/users/:username", UserController.findUserByName);
router.get("/ping", UserController.ping);

export default router;