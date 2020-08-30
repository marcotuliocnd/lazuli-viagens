import { Router } from 'express';
import multer from 'multer';

import AdminMiddleware from '../middlewares/admin.middleware';
import TestimonialsController from '../controllers/testimonials.controller';

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
    cb(null, './public');
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


route.post('/', [upload.single('photo'), AdminMiddleware], TestimonialsController.create);
route.get('/', TestimonialsController.read);
route.patch('/:id', [upload.single('photo'), AdminMiddleware], TestimonialsController.update);
route.delete('/:id', AdminMiddleware, TestimonialsController.delete);


export default route;
