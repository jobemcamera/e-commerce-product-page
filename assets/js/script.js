// Carrinho
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

// Ativa a aba do carrinho
cartIcon.onclick = () => {
    cart.classList.add("active")
};

// Desativa a aba do carrinho
closeCart.onclick = () => {
    cart.classList.remove("active")
};


// Remover do carrinho
var removeCartButton = document.getElementsByClassName('cart-remove')
for (var i = 0; i < removeCartButton.length; i++) {
    var button = removeCartButton[i]
    button.addEventListener('click', removeCartItem)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}


// Alterando a quantidade de produtos no carrinho
var quantityInput = document.getElementsByClassName('cart-quantity')
for (var i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i]
    input.addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}


// Adicionando no carrinho
var addCart = document.getElementsByClassName("add-icon")
for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i]
    button.addEventListener("click", addCartClicked)
}  

function addCartClicked(event) {
    var button = event.target
    var products = button.parentElement
    var title = products.getElementsByClassName('product-title')[0].innerText
    var price = products.getElementsByClassName('price')[0].innerText
    // a função não está retornando o diretório da imagem VERIFICAR
    var imgScr = products.getElementsByClassName('product-img')[0].scr;
    addProductsCart(title, price, imgScr)
    updateTotal()
}

function addProductsCart(title, price, imgScr) {
    var cartShop = document.createElement('div')
    cartShop.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemsName = cartItems.getElementsByClassName('cart-product-title')
    // verifica se já existe o item no carrinho
    for (var i = 0; i < cartItemsName.length; i++) {
        if (cartItemsName[i].innerText == title) {
            alert('Você já adicionou este item ao carrinho.')
            return;
        }
    }
    var cartBoxContent = `
                        <img scr="${imgScr}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class="fa-solid fa-trash cart-remove"></i>`
    // inserindo o conteúdo html dentro da div (cart-box) criada
    cartShop.innerHTML = cartBoxContent
    cartItems.append(cartShop)
    cartShop.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartShop.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}


// Botão de finalizar compra
document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)

function buyButtonClicked() {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    if (cartContent.hasChildNodes()) {
        alert('Seus produtos estão na aba de pagamento!')
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
    } else {
        alert('Você não possui itens no carrinho.')
    }
    updateTotal()
}


// Atualizando o total
function updateTotal () {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartDetail = cartContent.getElementsByClassName('cart-box')
    var total = 0
    for (var i = 0; i < cartDetail.length; i++) {
        var cartBox = cartDetail[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        // formatando o preço do tipo texto em tipo float
        var priceRS = priceElement.innerText.replace('R$', '')
        var priceDot = priceRS.replace('.', '')
        var price = priceDot.replace(',', '.')
        parseFloat(price)
        var quantity = quantityElement.value
        total = total + (price * quantity)  
    }
    
    // criando o formato de moeda do Brasil
    var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    })

    document.getElementsByClassName('total-price')[0].innerText = formatter.format(total)
}