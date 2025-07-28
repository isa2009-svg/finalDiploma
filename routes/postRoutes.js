const express = require('express');
const upload = require('../Midllewhere/upload');
const router = express.Router();
const authMiddleware = require('../Midllewhere/AuthMidllewhere');
const { postRegis } = require('../controllers/postContreller');

// Маршрутты /add деп өзгертіңіз
router.post('/add', authMiddleware, upload.single('image'), postRegis);

module.exports = router;


