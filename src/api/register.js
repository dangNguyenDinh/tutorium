document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Lấy giá trị từ form
        const username = document.getElementById('regUsername').value.trim();
        const password = document.getElementById('regPassword').value.trim();
        const email = document.getElementById('regEmail').value.trim();

        // Kiểm tra dữ liệu đầu vào
        if (!username || !password || !email) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        // Gọi API đăng ký
        try {
            const response = await registerUser({ username, password, email, role_account: 'learner' });

            // Hiển thị thông báo từ API
            alert(response.message);

            // Nếu đăng ký thành công, chuyển hướng đến trang đăng nhập
            if (response.success) {
                window.location.href = '/login.html'; // Chuyển hướng đến trang đăng nhập
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
            alert('Đăng ký thất bại. Vui lòng thử lại.');
        }
    });

    // Hàm gọi API đăng ký
    async function registerUser(userData) {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        // Kiểm tra phản hồi từ API
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Đăng ký thất bại');
        }

        return res.json();
    }
});