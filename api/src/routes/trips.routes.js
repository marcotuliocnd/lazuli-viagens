import { Router } from 'express';

import tripsController from '../controllers/trips.controller';
import adminMiddleware from '../middlewares/admin.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const routes = Router();

routes.post('/', adminMiddleware, tripsController.store);
routes.get('/', authMiddleware, tripsController.list);

export default routes;
