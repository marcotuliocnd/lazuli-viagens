import { Router } from 'express';
import multer from 'multer';

import AuthMiddleware from '../middlewares/auth.middleware';
import AdminMiddleware from '../middlewares/admin.middleware';
import UserController from '../controllers/users.controller';

const route = Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Por favor, envie apenas imagens!', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/avatar');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}_${uniqueSuffix}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter,
});

route.patch('/me/avatar', [upload.single('avatar'), AuthMiddleware], UserController.updateAvatar);
route.patch('/me/password', AuthMiddleware, UserController.updatePassword);
route.patch('/me', AuthMiddleware, UserController.updateUser);

route.delete('/:id', AdminMiddleware, UserController.deleteUser);
route.get('/', AdminMiddleware, UserController.list);
route.post('/', AdminMiddleware, UserController.store);
route.patch('/:id', AdminMiddleware, UserController.update);
route.get('/birthdate', AdminMiddleware, UserController.birthdate);
route.get('/birthdate-fix', UserController.fixBirthday);

export default route;
