const express = require('express');  
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authContreller');

router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);

module.exports = router;
