const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const app = express();
app.use(bodyParser.json());


// Phục vụ file tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, '../public')));

// Kết nối cơ sở dữ liệu
sequelize.sync({ force: false })
    .then(() => console.log('Cơ sở dữ liệu đã sẵn sàng!'))
    .catch((err) => console.error('Không thể kết nối cơ sở dữ liệu:', err));

// Sử dụng routes
app.use('/api/auth', authRoutes);

// Route để phục vụ các file JavaScript từ thư mục src/api
app.get('/api/login.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'api/login.js'));
});

app.get('/api/register.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'api/register.js'));
});

app.get('/api/logout.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'api/logout.js'));
});

app.get('/api/verify-token.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'api/verify-token.js'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));
