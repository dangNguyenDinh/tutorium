document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra xem token có tồn tại không
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Không tìm thấy token. Vui lòng đăng nhập lại.');
        window.location.href = '/index.html'; // Chuyển hướng đến trang đăng nhập
        return;
    }

    // Gọi API xác thực token
    verifyToken(token)
        .then((data) => {
            console.log('Token hợp lệ:', data);
            // Hiển thị nội dung trang home hoặc thực hiện các hành động khác
        })
        .catch((err) => {
            console.error('Lỗi xác thực:', err.message);
            localStorage.removeItem('token'); // Xóa token không hợp lệ
            window.location.href = '/index.html'; // Chuyển hướng đến trang đăng nhập
        });
});

// Hàm gọi API xác thực token
async function verifyToken(token) {
    const res = await fetch('/api/auth/verify-token', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
    });

    // Kiểm tra phản hồi từ API
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Lỗi xác thực token');
    }

    return res.json();
}