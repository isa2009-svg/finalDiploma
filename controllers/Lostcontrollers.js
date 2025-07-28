const pool = require('../config/db');

exports.addLostItem = async (req, res) => {
  try {
    const { title, description, location, date_lost, phone } = req.body;
    const image = req.file?.filename;

    if (!title || !description || !location || !date_lost || !phone || !image) {
      return res.status(400).json({ message: 'Барлық өрістер толтырылуы тиіс' });
    }

    const query = `
      INSERT INTO lost_items (title, description, location, date_lost, phone, image)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [title, description, location, date_lost, phone, image];

    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Жарияланды', item: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

// Барлық жоғалған заттарды алу
exports.getAllLostItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM lost_items ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Қате:', err.message);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

