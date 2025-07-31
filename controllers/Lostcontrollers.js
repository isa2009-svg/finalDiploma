const pool = require('../config/db');

async function addLostItem(req, res) {
  try {
    const { title, description, location, date_lost, phone } = req.body;
    const image = req.file?.filename;
    const email = req.user.email; // 👈 Токеннен алынған email

    if (!title || !description || !location || !date_lost || !phone || !image ) {
      console.log(title,description,location,date_lost,phone,image)
      return res.status(400).json({ message: 'Барлық өрістер толтырылуы тиіс' });
    }

    const query = `
      INSERT INTO lost_items (title, description, location, date_lost, phone, image, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [title, description, location, date_lost, phone, image, email];
    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Жарияланды', item: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
}
async function getUserLostItems(req, res) {
  try {
    const email = req.params.email;
    const result = await pool.query(
      'SELECT * FROM lost_items WHERE email = $1 ORDER BY id DESC',
      [email]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Қате:', err.message);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
}
async function getAllLostItems(req, res) {
  try {
    const result = await pool.query('SELECT * FROM lost_items ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Қате:', err.message);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
}
async function getLostItemById(req, res) {
  console.log(">>>>>>>>>>>>>>>>>>>")
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM lost_items WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Зат табылмады' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Қате:', err.message);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
}


module.exports = {
  getAllLostItems,
  addLostItem,
  getUserLostItems,
  getLostItemById
};