const pool = require('../config/db');

exports.addFoundItem = async (req, res) => {
  try {
    const { title, description, location, date_lost, phone } = req.body;
    const image = req.file?.filename;
    const email = req.user.email; // 👈 Токеннен алынған email

    if (!title || !description || !location || !date_lost || !phone || !image) {
       console.log(title,description,location,date_lost,phone,image)
      return res.status(400).json({ message: 'Барлық өрістер толтырылуы тиіс' });
    }

    const query = `
      INSERT INTO tabulganzat (title, description, location, date_lost, phone, image,email)
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
};

exports.getUserLostItems = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await pool.query(
      'SELECT * FROM tabulganzat WHERE email = $1 ORDER BY id DESC',
      [email]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Қате:', err.message);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

// Барлық жоғалған заттарды алу
exports.getAllFoundItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tabulganzat ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Қате:', err.message);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

exports. getLostItemById = async(req, res) => {
  console.log(">>>>>>>>>>>>>>>>>>>")
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tabulganzat WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Зат табылмады' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Қате:', err.message);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
}

// LostController2.js
exports.addComment = async (req, res) => {
  try {
    const { message } = req.body;
    const itemId = req.params.id;
    const userEmail = req.user.email;

    if (!message) {
      return res.status(400).json({ message: 'Комментарий бос болмауы керек' });
    }

    const result = await pool.query(
      'INSERT INTO comments (message, item_id, email) VALUES ($1, $2, $3) RETURNING *',
      [message, itemId, userEmail]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};
  
