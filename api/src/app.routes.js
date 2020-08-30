import { Router } from 'express';

import roleRoutes from './routes/role.routes';
import appRoutes from './routes/app.routes';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import tripsRoutes from './routes/trips.routes';
import fidelityRoutes from './routes/fidelity.routes';
import contactRoutes from './routes/contact.routes';
import testimonialsRoutes from './routes/testimonials.routes';

const routes = Router();

routes.use('/', appRoutes);
routes.use('/roles', roleRoutes);
routes.use('/auth', authRoutes);
routes.use('/trips', tripsRoutes);
routes.use('/users', usersRoutes);
routes.use('/contact', contactRoutes);
routes.use('/testimonials', testimonialsRoutes);
routes.use('/fidelities', fidelityRoutes);

export default routes;
