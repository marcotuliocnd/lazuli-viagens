import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import mailConfig from '../config/mail.config.json';
import emailTemplate from '../config/email.templates';

import User from '../models/User';
import Role from '../models/Role';

function generateToken(payload = {}) {
  return jwt.sign(
    payload,
    process.env.APP_SECRET,
  );
}

function generatePassword(size) {
  let password = '';
  for (let i = 0; i < size; i += 1) {
    password += Math.floor(Math.random() * 16).toString(16);
  }
  return password;
}

export default {
  async register(req, res) {
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

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success: false,
            errors: [
              {
                field: 'email',
                rule: 'exists',
                message: 'Email já está sendo utilizado por outro usuário',
              },
            ],
          });
      }

      const passSalt = await bcrypt.genSalt();
      const passCrypted = await bcrypt.hash(req.body.password, passSalt);

      const role = await Role.findOne({ slug: 'user' }).lean();

      user = new User({
        ...req.body,
        password: passCrypted,
        role: role._id,
      });

      await user.save();
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
        .json('Internal Server Error');
    }
  },

  async login(req, res) {
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

      const user = await User.findOne({ email: req.body.email });

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

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
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

      const role = await Role.findOne({ _id: user.role }).lean();

      user._doc.role = role;

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
        .json('Internal Server Error');
    }
  },

  async recover(req, res) {
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

      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const randomPassword = generatePassword(10);
        const passSalt = await bcrypt.genSalt();
        const password = await bcrypt.hash(randomPassword, passSalt);

        user.password = password;
        await user.save();

        const transport = nodemailer.createTransport(
          {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              type: 'OAuth2',
              user: 'naoresponder@artmakerdesign.com.br',
              serviceClient: mailConfig.client_id,
              privateKey: mailConfig.private_key,
            },
          },
        );

        const mailOptions = {
          from: 'Lazuli Viagens <naoresponder@artmakerdesign.com.br',
          to: user.email,
          subject: 'Lazuli Viagens - Redefinição de senha',
          html: emailTemplate.recover(user.name, randomPassword),
        };

        await transport.sendMail(mailOptions);
      }

      return res
        .status(200)
        .json({
          success: true,
        });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json('Internal Server Error');
    }
  },
};
