// sản phẩm
function goToDetail(name, price, image, code) {
    const selectedProduct = { name, price, image, code };
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    window.location.href = 'detail.html';
}

// Lấy sản phẩm đã chọn từ localStorage
const product = JSON.parse(localStorage.getItem('selectedProduct'));

// Hiển thị thông tin lên trang
if (product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = 'Giá: ' + product.price.toLocaleString() + '₫';
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-code').textContent = product.code || 'N/A';
}

// Thêm vào giỏ hàng
function addToCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // So sánh theo mã sản phẩm (code), tránh trùng nếu có 2 sản phẩm trùng tên
    const existingIndex = cart.findIndex(item => item.code === product.code);

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            code: product.code,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert("🛒 Đã thêm vào giỏ hàng!");
}