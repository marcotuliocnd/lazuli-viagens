import { Router } from 'express';

import FidelityController from '../controllers/fidelity.controller';
import adminMiddleware from '../middlewares/admin.middleware';

const routes = Router();
const fidelityController = new FidelityController();

routes.post('/', adminMiddleware, fidelityController.store);

export default routes;
