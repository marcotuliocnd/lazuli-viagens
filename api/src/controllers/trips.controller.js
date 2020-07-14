import Trip from '../models/Trip';

export default {
  async store(req, res) {
    try {
      const trip = new Trip(req.body);

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

  async list(req, res) {
    try {
      const { user } = req;

      const query = {};

      if (user.role !== 'admin') {
        query.user_id = user.id;
      }

      const trips = await Trip.find(query);

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
