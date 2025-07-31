

const express = require('express');
const router = express.Router();
const upload = require('../Midllewhere/upload');
const verifyToken = require('../Midllewhere/verifyToken');

const { getAllLostItems, addLostItem, getUserLostItems, getLostItemById  } = require('../controllers/Lostcontrollers');

router.post('/add', verifyToken, upload.single('image'), addLostItem);

router.get('/user/:email', getUserLostItems);

router.get('/all', getAllLostItems);

router.get('/:id', getLostItemById);



module.exports = router;
