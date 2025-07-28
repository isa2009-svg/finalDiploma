const pool = require('../config/db');

exports.postRegis = async (req, res) => {
  const { title, description, location, date_lost, phone } = req.body;
  const image = req.file?.filename;

  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    const newPost = await pool.query(
      `INSERT INTO lostitems (title, description, location, date_lost, phone, image)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, location, date_lost, phone, image]
    );
    res.status(201).json(newPost.rows[0]);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

