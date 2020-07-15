import Fidelity from '../models/Fidelity';

export default class RoleController {
  async store(req, res) {
    try {
      const fidelity = new Fidelity({
        name: req.body.name,
      });

      await fidelity.save();

      return res
        .status(200)
        .json({ success: true, data: fidelity });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }
}
