document.getElementById('logoutButton').addEventListener('click', () => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    if (!token) {
        alert('Không tìm thấy token. Vui lòng đăng nhập lại.');
        window.location.href = '/index.html'; // Chuyển hướng đến trang đăng nhập
        return;
    }

    fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // Đảm bảo token được truyền đúng định dạng
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === 'Đăng xuất thành công!') {
                localStorage.removeItem('token'); // Xóa token khỏi client
                window.location.href = '/index.html'; // Chuyển hướng đến trang đăng nhập
            } else {
                window.location.href = '/index.html'; 
                alert('Het phien dang nhap');
            }
        })
        .catch((error) => {
            console.error('Lỗi khi đăng xuất:', error);
            alert('Đăng xuất thất bại. Vui lòng thử lại.');
        });
});