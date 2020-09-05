import Users from '../models/User';
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

  async list(req, res) {
    try {
      const fidelity = await Fidelity.find();

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

  async matchingFidelity(req, res, next, matchByFn = false) {
    try {
      const users = await Users.find({
        $or: [{ fidelity: { $ne: null } }, { fidelity: { $exists: true } }],
      });

      console.log(`> Processing ${users.length} users!`)
      
      let index = 0;
      for (const user of users) {
        console.log(`> Processing ${index++}/${users.length}!`)
        const value = parseInt(user.value, 10);

        if (value < 300) {
          user.fidelity_level = 1;
        } else if (value >= 300 && value < 600) {
          user.fidelity_level = 2;
        } else if (value >= 600 && value < 1200) {
          user.fidelity_level = 3;
        } else if (value < 2400 && value >= 1200) {
          user.fidelity_level = 4;
        } else if (value >= 2400) {
          user.fidelity_level = 5;
        } else {
          user.fidelity_level = 1;
        }

        await user.save();
      }

      console.log(`> Finished`)

      if (!matchByFn) {
        const data = await Users.find();

        return res.json({ success: true, data });
      }
    } catch (err) {
      console.error(err.message)

      if (!matchByFn) {
        return res.status(500).json({ success: false });
      }
    }
  }
}
