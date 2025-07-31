const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Токен мүлде жоқ болса
  if (!authHeader) {
    return res.status(401).json({ error: 'Token берілмеген' });
  }

  // "Bearer TOKEN" форматында ма?
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Токен форматы дұрыс емес' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // req.user.email сияқты қолдана аласыз
    next();
  } catch (err) {
    console.error('JWT тексеру қатесі:', err.message);
    res.status(403).json({ error: 'Жарамсыз токен' });
  }
}

module.exports = authMiddleware;
