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
};
