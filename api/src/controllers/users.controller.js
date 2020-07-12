import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import Role from '../models/Role';

function generateToken(payload = {}) {
  return jwt.sign(
    payload,
    process.env.APP_SECRET,
  );
}

export default {
  async updateAvatar(req, res) {
    try {
      const { file, user } = req;
      await User.updateOne(
        { _id: user.id },
        { avatar: file.filename },
      );

      return res
        .status(200)
        .json({ avatar_url: `${process.env.BASE_URL}/public/avatar/${file.filename}` });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async updatePassword(req, res) {
    try {
      const { lastPassword, password, passwordConfirm } = req.body;

      const user = await User.findOne({ _id: req.user.id });

      const match = await bcrypt.compare(lastPassword, user.password);
      if (!match) {
        return res
          .status(400)
          .json({
            success: false,
            errors: [
              {
                field: 'password',
                rule: 'invalid',
                message: 'Senha incorreta',
              },
            ],
          });
      }

      if (password !== passwordConfirm) {
        return res
          .status(400)
          .json({
            success: false,
            errors: [
              {
                field: 'password',
                rule: 'invalid',
                message: 'Senhas não coincidem',
              },
            ],
          });
      }

      const passwordSalt = await bcrypt.genSalt();
      const passwordCrypted = await bcrypt.hash(password, passwordSalt);

      await User.updateOne(
        { _id: req.user.id },
        { password: passwordCrypted },
      );

      return res
        .status(200)
        .json({ success: true });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ sucess: false, message: 'Internal Server Error' });
    }
  },

  async updateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(422)
          .json({
            success: false,
            errors: errors.array(),
          });
      }

      let user = await User.findOne({ _id: req.user.id });
      if (!user) {
        return res
          .status(400)
          .json({
            success: false,
            errors: [
              {
                field: '',
                rule: 'invalid',
                message: 'E-mail ou senha inválida',
              },
            ],
          });
      }

      await User.updateOne(
        { _id: req.user.id },
        { ...req.body },
      );

      user = await User.findOne({ _id: req.user.id });

      const role = await Role.findOne({ _id: user.role }).lean();

      delete user._doc.password;

      const token = {
        type: 'Bearer',
        token: generateToken({
          id: user._id,
          email: user.email,
          name: user.name,
          fidelity: user.fidelity || null,
          role: role.slug,
        }),
      };

      return res
        .status(200)
        .json({
          success: true,
          user,
          token,
        });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async deleteUser(req, res) {
    try {
      const data = await User.deleteOne({ _id: req.params.id });
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
