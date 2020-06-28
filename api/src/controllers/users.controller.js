import bcrypt from 'bcryptjs';
import User from '../models/User';

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
};
