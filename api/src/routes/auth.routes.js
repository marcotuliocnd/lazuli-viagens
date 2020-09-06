import { Router } from 'express';
import { check } from 'express-validator';

import AuthController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const routes = Router();

routes.post('/register', [
  check('name').not().isEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 8 }),
  check('cpf').not().isEmpty(),
  check('rg').not().isEmpty(),
  check('cellphone').isMobilePhone(),
  check('birthdate_at').not().isEmpty(),
], AuthController.register);

routes.post('/login', [
  check('email').isEmail(),
  check('password').isLength({ min: 8 }),
], AuthController.login);

routes.get('/me', authMiddleware, AuthController.auth);

routes.post('/recover', [
  check('email').isEmail(),
], AuthController.recover);

export default routes;
