const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../models/accounts');
require('dotenv').config();

module.exports = {
    register: async (data) => {
        const { username, password, email, role_account } = data;

        // Kiểm tra xem username đã tồn tại chưa
        const existingUser = await Account.findOne({ where: { username } });
        if (existingUser) throw new Error('Tên đăng nhập đã tồn tại.');

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Mật khẩu đã mã hóa:", hashedPassword);
        // Lưu tài khoản mới vào cơ sở dữ liệu
        await Account.create({
            username,
            password: hashedPassword,
            email,
            role_account,
        });

        return { message: 'Đăng ký thành công!' };
    },

    login: async (username, password) => {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await Account.findOne({ where: { username } });
        if (!user) throw new Error('Tên đăng nhập không tồn tại.');

        // Kiểm tra mật khẩu
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword && !password) throw new Error('Mật khẩu không đúng.');

        // Tạo JWT token
        const token = jwt.sign(
            { account_id: user.account_id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '30s' }
        );

        return { message: 'Đăng nhập thành công!', token };
    },
};
