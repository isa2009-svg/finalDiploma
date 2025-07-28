const express = require('express');
const router = express.Router();
const upload = require('../Midllewhere/upload');
const { getAllLostItems, addLostItem } = require('../controllers/Lostcontrollers');

router.post('/add', upload.single('image'), addLostItem);

router.get('/all', getAllLostItems); // 👈 Міне осы

module.exports = router;
