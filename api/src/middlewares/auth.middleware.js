import jwt from 'jsonwebtoken';

export default function AuthMiddleware(req, res, next) {
  const token = req.header('authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ success: false, errors: [{ msg: 'Conexão recusada' }] });
  }

  try {
    const decoded = jwt.verify(token.slice(7, token.length), process.env.APP_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, errors: [{ msg: 'Conexão recusada' }] });
  }
}
