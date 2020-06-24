import { Router } from 'express';

import roleRoutes from './routes/role.routes';
import appRoutes from './routes/app.routes';
import authRoutes from './routes/auth.routes';

const routes = Router();

routes.use('/', appRoutes);
routes.use('/roles', roleRoutes);
routes.use('/auth', authRoutes);

export default routes;
