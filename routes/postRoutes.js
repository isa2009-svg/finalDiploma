const express = require('express');
const upload = require('../Midllewhere/upload');
const router = express.Router();
// const authMiddleware = require('../Midllewhere/AuthMidllewhere');
const verifyToken = require('../Midllewhere/verifyToken');

const { postRegis } = require('../controllers/postContreller');

// Маршрутты /add деп өзгертіңіз
router.post('/add', verifyToken, upload.single('image'), postRegis);

module.exports = router;


