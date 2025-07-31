const jwt = require('jsonwebtoken')

  function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });

  const token = authHeader.split(' ')[1];
  console.log("🔥 Токен:", token);
  console.log(process.env.JWT_SECRET);
  
    const secret = process.env.JWT_SECRET
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    
    console.log("✅ Токен жарамды, decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Токен жарамсыз:", err.message);
    res.status(403).json({ error: 'Invalid token' });
  }
}
  module.exports = verifyToken;