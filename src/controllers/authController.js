const authService = require('../services/authService');

module.exports = {
    register: async (req, res) => {
        try {
            const result = await authService.register(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const result = await authService.login(req.body.username, req.body.password);
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    },
    
    logout: async (req, res) => {
        try {
            const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header
            const result = await authService.logout(token); // Gọi service để xử lý đăng xuất
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    },
};
