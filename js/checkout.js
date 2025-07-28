// Lấy phần tử HTML nơi hiển thị sản phẩm và tổng tiền
const checkoutList = document.getElementById("checkout-list");
const checkoutTotal = document.getElementById("checkout-total");

// Lấy dữ liệu giỏ hàng từ localStorage, nếu chưa có thì trả về mảng rỗng
const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0; // Biến lưu tổng số tiền
let html = '<ul class="list-group mb-4">'; // Chuỗi HTML để hiển thị danh sách sản phẩm

// Duyệt từng sản phẩm trong giỏ hàng
cart.forEach(item => {
    const subtotal = item.price * item.quantity; // Tính thành tiền cho từng sản phẩm
    total += subtotal; // Cộng vào tổng tiền

    // Thêm dòng sản phẩm vào danh sách HTML
    html += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
            <img src="${item.image}" class="me-2 product-img rounded" width="60">
            <div>
                <strong>${item.name}</strong><br>
                SL: ${item.quantity} x ${item.price.toLocaleString()} đ
            </div>
        </div>
        <span>${subtotal.toLocaleString()} đ</span>
    </li>
    `;
});

html += '</ul>'; // Kết thúc danh sách

// Hiển thị danh sách sản phẩm ra giao diện
checkoutList.innerHTML = html;

// Hiển thị tổng tiền
checkoutTotal.textContent = total.toLocaleString() + ' đ';


// ======= XỬ LÝ KHI NGƯỜI DÙNG NHẤN NÚT "THANH TOÁN" =======

// Gắn sự kiện submit vào form thanh toán
document.getElementById("checkout-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn không cho trang bị reload lại

    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }

    // Thông báo thanh toán thành công
    alert("✅ Thanh toán thành công! Cảm ơn bạn đã mua hàng.");

    // Xóa giỏ hàng khỏi localStorage
    localStorage.removeItem("cart");

    // Chuyển hướng về trang chủ hoặc trang khác tùy ý
    window.location.href = "index.html";
});

function muaHangVaThanhToan() {
    // Tùy theo cấu trúc giỏ hàng, đây là ví dụ cơ bản:
    const product = {
        id: 1,
        name: "Nike Air Max",
        price: 2000000,
        quantity: 1
    };

    // Lưu vào localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Chuyển sang trang thanh toán
    window.location.href = "checkout.html";
}
