
const express = require('express');
const router = express.Router();
const upload = require('../Midllewhere/upload2');
const verifyToken = require('../Midllewhere/verifyToken');

const { getAllLostItems, addLostItem, getAllFoundItems, addFoundItem, getUserLostItems,getLostItemById } = require('../controllers/Lostcontrollers2');

router.post('/add', verifyToken, upload.single('image'), addFoundItem);


router.get('/user/:email', getUserLostItems);
router.get('/allfound', getAllFoundItems);
router.get('/:id', getLostItemById);
module.exports = router;

