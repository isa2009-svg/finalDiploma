const express = require('express');
const router = express.Router();
const verifyToken = require('../Midllewhere/verifyToken');
const { addComment, getComments } = require('../controllers/2_commentController');

// Комментарий қосу (тек тіркелгендерге)
router.post('/:postId', verifyToken, addComment);

// Комментарийлерді алу (барлығына)
router.get('/:postId', getComments); 
module.exports = router;
