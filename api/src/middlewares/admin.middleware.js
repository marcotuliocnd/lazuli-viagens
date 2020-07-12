import jwt from 'jsonwebtoken';

export default function AdminMiddleware(req, res, next) {
  const token = req.header('authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ success: false, errors: [{ msg: 'Conexão recusada' }] });
  }

  try {
    const decoded = jwt.verify(token.slice(7, token.length), process.env.APP_SECRET);

    if (decoded.role !== 'admin') {
      return res
        .status(401)
        .json({ success: false, errors: [{ msg: 'Conexão recusada' }] });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, errors: [{ msg: 'Conexão recusada' }] });
  }
}
