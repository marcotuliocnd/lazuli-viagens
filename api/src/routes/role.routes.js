import { Router } from 'express';

import RoleController from '../controllers/role.controller';
import adminMiddleware from '../middlewares/admin.middleware';

const routes = Router();
const roleController = new RoleController();

routes.post('/', adminMiddleware, roleController.store);

export default routes;
