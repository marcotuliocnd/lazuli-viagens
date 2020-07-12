import Role from '../models/Role';

export default class RoleController {
  async store(req, res) {
    try {
      const role = new Role({
        name: req.body.name,
      });

      await role.save();

      return res
        .status(200)
        .json({ success: true, data: role });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }
}
