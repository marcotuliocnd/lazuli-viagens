import { Router } from 'express';

import Contact from '../controllers/contact.controller';

const routes = Router();

routes.post('/', Contact.recover);

export default routes;
