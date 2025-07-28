document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let tbody = document.getElementById("cart-body");
    let total = 0;
    tbody.innerHTML = "";

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.image}" width="80"></td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()}₫</td>
            <td><input type="number" value="${item.quantity}" min="1" class="form-control w-50 mx-auto" onchange="updateQuantity(${index}, this.value)"></td>
            <td>${itemTotal.toLocaleString()}₫</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Xóa</button></td>
        `;
        tbody.appendChild(row);
    });

    document.querySelector('.text-danger.fw-bold').textContent = total.toLocaleString() + '₫';
}

function updateQuantity(index, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Hàm thanh toán – Chuyển qua trang checkout.html
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("🛒 Giỏ hàng của bạn đang trống!");
        return;
    }

    // Chuyển hướng sang trang thanh toán
    window.location.href = "checkout.html";
}
