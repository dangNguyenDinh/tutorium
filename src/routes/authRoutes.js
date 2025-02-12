const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Đường dẫn đúng tới file authMiddleware
const router = express.Router();

// Route đăng ký
router.post('/register', register);

// Route đăng nhập
router.post('/login', login);

// Route đăng xuất
router.post('/logout', authMiddleware, logout);

// Route xác thực token
router.post('/verify-token', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Token hợp lệ', user: req.user });
});

module.exports = router;
