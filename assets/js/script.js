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


// Adicionar no carrinho
var addCart = document.getElementsByClassName("add-icon")
for (var i=0; i < addCart.length; i++) {
    var button = addCart[i]
    button.addEventListener("click", addCartClicked)
}

function addCartClicked (event) {
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText
    var price = shopProducts.getElementsByClassName("price")[0].innerText
    var productImage = shopProducts.getElementsByClassName("product-img")[0].scr
    addProductToCart(title, price, productImage)
}

function addProductToCart(title, price, productImage) {
    var cartContent = document.getElementById('cart-content-id')

    //div cart-box
    var cartBox = document.createElement('div')
    cartBox.classList.add('cart-box')

    cartContent.appendChild(cartBox)

    // imagem
    var imgItems = document.createElement('img')
    imgItems.setAttribute('scr', productImage)
    imgItems.classList.add('cart-img')    
    console.log(productImage)

    cartBox.appendChild(imgItems)

    // div detail-box
    var detailBox = document.createElement('div')
    detailBox.classList.add('detail-box')

    cartBox.appendChild(detailBox)

    // titulo
    var titleItems = document.createElement('div')
    titleItems.classList.add('cart-product-title')
    var titleContent = document.createTextNode(title)
    titleItems.appendChild(titleContent)
    console.log(titleContent)

    detailBox.appendChild(titleItems)

    // preço
    var priceItems = document.createElement('div')
    priceItems.classList.add('cart-price')
    var priceContent = document.createTextNode(price)
    priceItems.appendChild(priceContent)
    console.log(priceContent)

    detailBox.appendChild(priceItems)  
  
    // icone lixeira (div cart-box)
    var delItems = document.createElement("i")
    delItems.classList.add('fa-solid', 'fa-trash', 'cart-remove')

    cartBox.appendChild(delItems)

    // input type number
    var quantityItems = document.createElement('input')
    quantityItems.setAttribute('type', 'number', value=1)
    quantityItems.classList.add('cart-quantity')
    
    detailBox.appendChild(quantityItems)
}

//<div class="cart-box">
//    <img src="assets/img/cort_les_paul.jpg" alt="" class="cart-img">
//    <div class="detail-box">
//        <div class="cart-product-title">Guitarra Cort CR300 ATB Aged Vintage Burst</div>
//        <div class="cart-price">R$ 4.365,00</div>
//        <input type="number" value="1" class="cart-quantity">
//    </div>
//    <!-- Ícone de lixeira para excluir conteúdo -->
//    <i class="fa-solid fa-trash cart-remove"></i>
//</div>
