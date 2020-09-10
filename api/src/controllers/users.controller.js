import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import moment from 'moment';

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

async function fixBirthday() {
  try {
    const users = await User
      .find()
      .lean();

    for (const user of users) {
      await User.updateOne({
        _id: user._id,
      }, {
        birthday: moment(user.birthdate_at).add(3, 'hours').format('DD/MM'),
      });
    }
  } catch (err) {
    console.error(err.message);
  }
}

function generatePassword(size) {
  let password = '';
  for (let i = 0; i < size; i += 1) {
    password += Math.floor(Math.random() * 16).toString(16);
  }
  return password;
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

  async list(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const users = await User
        .find()
        .select('-password')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('role')
        .populate('fidelity')
        .sort({ createdAt: -1 })
        .exec();

      const nextPage = await User
        .find()
        .limit(limit * 1)
        .skip((page * 2 - 1) * limit)
        .sort({ createdAt: -1 })
        .count();

      return res
        .status(200)
        .json({ success: true, nextPage, data: users });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async store(req, res) {
    try {
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

      const role = await Role.findOne({ slug: req.body.role || 'user' }).lean();
      const randomPassword = generatePassword(10);
      const passSalt = await bcrypt.genSalt();
      const password = await bcrypt.hash(randomPassword, passSalt);

      const transport = nodemailer.createTransport(
        {
          host: 'br614.hostgator.com.br',
          port: 465,
          secure: true,
          auth: {
            user: 'naoresponder@lazuliviagens.com.br',
            pass: 'teste123teste123#',
          },
        },
      );

      const mailOptions = {
        from: 'Lazuli Viagens <naoresponder@artmakerdesign.com.br',
        to: req.body.email,
        subject: 'Lazuli Viagens - Conta criada',
        html: emailTemplate.create(req.body.name, randomPassword),
      };

      await transport.sendMail(mailOptions);
      user = new User({
        ...req.body, role: role._id, password, birthday: moment(req.body.birthdate_at).format('DD/MM'),
      });

      await user.save();

      return res
        .status(200)
        .json({ success: true, data: user });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async fixBirthday(req, res) {
    try {
      const users = await User
        .find()
        .lean();

      for (const user of users) {
        await User.updateOne({
          _id: user._id,
        }, {
          birthday: moment(user.birthdate_at).add(3, 'hours').format('DD/MM'),
        });
      }

      return res
        .status(200)
        .json({ success: true, data: users });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async update(req, res) {
    try {
      const query = req.body;
      if (req.body.birthdate_at) {
        query.birthdate_at = moment(req.body.birthdate_at).add(3, 'hours');
      }
      const user = await User.updateOne(
        { _id: req.params.id },
        query,
        { new: true },
      );

      await fixBirthday();

      return res
        .status(200)
        .json({ success: true, data: user });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async birthdate(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const users = await User
        .find({
          birthday: moment().format('DD/MM'),
        })
        .select('-password')
        .populate('role')
        .populate('fidelity')
        .sort({ createdAt: -1 })
        .exec();

      return res
        .status(200)
        .json({ success: true, data: users });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async comprovante(req, res) {
    const { file, user } = req;

    const transport = nodemailer.createTransport(
      {
        host: 'br614.hostgator.com.br',
        port: 465,
        secure: true,
        auth: {
          user: 'naoresponder@lazuliviagens.com.br',
          pass: 'teste123teste123#',
        },
      },
    );

    const userData = await User.findById(user.id);

    const mailOptions = {
      from: 'Lazuli Viagens <naoresponder@lazuliviagens.com.br',
      to: 'lazuliviagens@gmail.com',
      subject: `Lazuli Viagens - Comprovante de pagamento | ${userData.name}`,
      text: `${userData.name} - Documento: ${userData.cpf}`,
      attachments: [
        {
          filename: `${userData.name}_${userData.cpf}_${moment().format('DD/MM/YYYY')}_comprovante_${file.originalname}`,
          path: `${process.env.BASE_URL}/public/avatar/${file.filename}`,
        },
      ],
    };

    await transport.sendMail(mailOptions);

    return res.status(200).json({ success: true });
  },
};
