import { Router } from "express";
import userController from '../controllers/users.controller.js';
import validate from "../validators/validate.js";
import { createUserSchema } from "../validators/user.validate.js";
import {authtenticateToken } from '../middlewares/authenticate.js';
 
const router = Router();

router
.route('/')
.get(userController.getUsers)
.post(validate(createUserSchema, 'body'), userController.createUser);

router
.route('/:id')
.get(authtenticateToken, userController.getUser)
.put(authtenticateToken, userController.updateUser)
.delete(authtenticateToken, userController.deleteUser)
.patch(authtenticateToken, userController.activateInactivate);

router.get('/:id/tasks', authtenticateToken, userController.getTasks);
router.get('/:list/pagination', userController.getPagination);
export default router;