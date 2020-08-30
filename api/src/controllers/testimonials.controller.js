import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import moment from 'moment';

import Testimonial from '../models/Testimonial';

export default {
  async create(req, res) {
    try {
      const { file, body } = req;
      const testimonial = new Testimonial({ ...body, image: file.filename  });

      await testimonial.save();

      return res
        .status(200)
        .json({ success: true, data: testimonial });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async read(req, res) {
    try {
      const data = await Testimonial
        .find()
        .sort({ createdAt: -1 })
        .exec();

      return res
        .status(200)
        .json({ success: true, data });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async update(req, res) {
    try {
      const { body, file, params } = req;

      const query = body;

      if (file && file.filename) {
        query.photo = file.filename;
      }

      const data = await Testimonial.updateOne(
        { _id: params.id },
        query,
        { new: true },
      );

      return res
        .status(200)
        .json({ success: true, data });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async delete(req, res) {
    try {
      const data = await Testimonial.deleteOne({ _id: req.params.id });
      return res
        .status(200)
        .json({ success: true, data });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },
};
