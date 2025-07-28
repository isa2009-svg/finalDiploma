const express = require('express');
const router = express.Router();
const upload = require('../Midllewhere/upload2');
const { getAllLostItems, addLostItem, getAllFoundItems, addFoundItem } = require('../controllers/Lostcontrollers2');

router.post('/add', upload.single('image'), addFoundItem);

router.get('/allfound', getAllFoundItems); // 👈 Міне осы

module.exports = router;