import Trip from '../models/Trip';
import User from '../models/User';

export default {
  async store(req, res) {
    try {
      const user = await User.findOne({
        cpf: req.body.cpf,
      });
      const trip = new Trip({ user_id: user.id, ...req.body });

      await trip.save();

      return res
        .status(200)
        .json({ success: true, data: trip });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async update(req, res) {
    try {
      const trip = await Trip.updateOne(
        { _id: req.params.id },
        req.body,
        { new: true },
      );

      return res
        .status(200)
        .json({ success: true, data: trip });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },

  async list(req, res) {
    try {
      const { user } = req;
      const { page = 1, limit = 4 } = req.query;

      const query = {};

      if (user.role !== 'admin') {
        query.user_id = user.id;
      }

      const trips = await Trip
        .find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .populate('user_id')
        .exec();

      return res
        .status(200)
        .json({ success: true, data: trips });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  },
};
