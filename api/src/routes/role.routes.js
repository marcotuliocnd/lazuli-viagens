import { Router } from 'express';

import RoleController from '../controllers/role.controller';

const routes = Router();
const roleController = new RoleController();

routes.post('/', roleController.store);

export default routes;
