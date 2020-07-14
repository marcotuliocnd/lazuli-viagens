import { Router } from 'express';

import roleRoutes from './routes/role.routes';
import appRoutes from './routes/app.routes';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import tripsRoutes from './routes/trips.routes';

const routes = Router();

routes.use('/', appRoutes);
routes.use('/roles', roleRoutes);
routes.use('/auth', authRoutes);
routes.use('/trips', tripsRoutes);
routes.use('/users', usersRoutes);

export default routes;
