const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header Authorization

    if (!token) {
        return res.status(401).json({ message: 'Không có token, vui lòng đăng nhập lại.' });
    }

     // Kiểm tra xem token có trong danh sách đen không
     if (authService.isTokenBlacklisted(token)) {
        return res.status(401).json({ message: 'Token đã bị hủy, vui lòng đăng nhập lại.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Lỗi verify token:', err.message); // Log lỗi
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
        }

        // Gán thông tin người dùng vào request để sử dụng trong các route tiếp theo
        req.user = decoded;
        next();
    });
};
