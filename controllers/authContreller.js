


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1 ', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Бұл email қолданылып жатыр' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashedPassword]
    );

    const token = jwt.sign({ name, email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ message: 'Тіркеу сәтті өтті', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Email немесе пароль дұрыс емес' });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email немесе пароль дұрыс емес' });
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
}

module.exports = {
  registerUser,
  loginUser
};
