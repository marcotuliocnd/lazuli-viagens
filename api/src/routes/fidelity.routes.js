import { Router } from 'express';
import { schedule } from 'node-cron';

import FidelityController from '../controllers/fidelity.controller';
import adminMiddleware from '../middlewares/admin.middleware';

const routes = Router();
const fidelityController = new FidelityController();

routes.post('/', adminMiddleware, fidelityController.store);

routes.get('/', adminMiddleware, fidelityController.list);

routes.get('/matching', fidelityController.matchingFidelity);

schedule('50 6 * * *', async () => {
  await fidelityController.matchingFidelity(null, null, null, true);
}, null, true, 'America/Sao_Paulo');
fidelityController.matchingFidelity(null, null, null, true);


export default routes;
