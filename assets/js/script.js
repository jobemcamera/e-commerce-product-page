// Carrinho
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Ativa a aba do carrinho
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Desativa a aba do carrinho
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Aguarda a págia estar pronta
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}


// Página pronta
function ready () {
    // remover do carrinho
    var removeCartButton = document.getElementsByClassName('cart-remove');
    console.log(removeCartButton)
    for (var i = 0; i < removeCartButton.length; i++) {
        var button = removeCartButton[i];
        button.addEventListener('click', removeCartItem)
    }

    // Alterando a quantidade de produtos no carrinho
    var quantityInput = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }

    // adicionar no carrinho
    var addCart = document.getElementsByClassName("add-icon");
    for (var i=0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }  
    
    // Botão de finalizar compra
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

// Finalizar compra
function buyButtonClicked() {
    alert('Sua produtos estão na aba de pagamento!')
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// Remover do carrinho
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();

}

// Alterando a quantidade de itens
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Adicionando ao carrinho
function addCartClicked(event) {
    var button = event.target;
    var products = button.parentElement;
    var title = products.getElementsByClassName('product-title')[0].innerText;
    var price = products.getElementsByClassName('price')[0].innerText;
    var productImg = products.getElementsByClassName('product-img')[0].scr;
    addProductsCart(title, price, productImg)
}

// Adicionando produto ao carrinho
function addProductsCart(title, price, productImg) {
    var cartShop = document.createElement('div');
    cartShop.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsName = cartItems.getElementsByClassName('cart-product-title')
    for (var i = 0; i < cartItemsName; i++) {
        if (cartItemsName[i].innerText == title) {
            alert('Você já adicionou este item ao carrinho.');
            return;
        }
    }
    var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class="fa-solid fa-trash cart-remove"></i>`;
    cartShop.innerHTML = cartBoxContent;
    cartItems.append(cartShop);
    cartShop.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShop.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// Atualizando o total
function updateTotal () {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartDetail = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartDetail.length; i++) {
        var cartBox = cartDetail[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('R$ ', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = 'R$ ' + total;
}