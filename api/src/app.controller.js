export default class AppController {
  status(req, res) {
    return res.status(200).json({
      success: true,
      mode: process.env.NODE_ENV,
    });
  }
}
