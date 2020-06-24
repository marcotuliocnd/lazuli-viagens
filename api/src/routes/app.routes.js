import { Router } from 'express';

import AppController from '../app.controller';

const routes = Router();
const appController = new AppController();

routes.get('/', appController.status);

export default routes;
