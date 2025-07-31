const pool = require('../config/db');

async function addComment(req, res) {
  console.log("dfdfdf");
 
  try {
    const { postId } = req.params; // бұрын itemId еді
    const { text } = req.body;
    const email = req.user.email;
    const userId = req.user.userId;

    if (!text) {
      return res.status(400).json({ message: 'Комментарий мәтіні қажет' });
    }

    const result = await pool.query(
      `INSERT INTO comments (post_id, user_id, email, text)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [postId, userId, email, text]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('addComment қатесі:', err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
}

async function getComments(req, res) {
  try {
    const { postId } = req.params; // бұрын itemId еді

    const result = await pool.query(
      `SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC`,
      [postId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('getComments қатесі:', err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
}

module.exports = { addComment, getComments };
