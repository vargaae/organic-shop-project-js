/*
=============== 
ORGANIC SHOP PROJECT - Modern javascript - plain / vanilla.js 2021
Project is based on the video syllabus of Webmania.cc
===============
*/
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', function (event) {
    nav.classList.toggle('menu-active');
    burger.classList.toggle('fi-align-justify');
    burger.classList.toggle('fi-arrow-left');
    console.log(this)
});

nav.addEventListener('mouseleave', () => {
    nav.classList.remove('menu-active')
    burger.classList.remove('fi-arrow-left');
    burger.classList.add('fi-align-justify');
})

let products = [];

const productsSection = document.getElementById('products');

fetch('https://hur.webmania.cc/products.json')
    .then(response => response.json())
    .then(data => {
        products = data.products
        products.forEach(product => {
            let content = productsSection.innerHTML
            content += `<div>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <img src="${product.picture}">
            <h3>${product.price}</h3>`
            if (product.stock) {
                content += `<a id="${product.id}" class="addToCart">Kosárba teszem</a>`
            }
            else {
                content += `Nem rendelhető`
            }
            content += `</div>`
            productsSection.innerHTML = content

            const addToCartButtons = document.getElementsByClassName('addToCart')

            const buttonCount = addToCartButtons.length;

            for (let i = 0; i < buttonCount; i++) {
                addToCartButtons[i].addEventListener('click', addToCart)
            }
        })
    })
    .catch(error => console.error(error))

    const cart = {};

const addToCart = (event) => {
    let target = event.target.id ? event.target.id : event.target.dataset.id

    if (cart[target] == undefined) {
        cart[target] = 1;
    } else {
        cart[target]++;
    }
}

const discountMinimumAmount = 30000
const discountMinimumPieces = 12
const discount = 0.1

const refreshCartItems = () => {
    cartItems.innerHTML = ''
    let total = 0, maxPieces = 0
    for (const id in cart) {
        const currentProduct = products.find(product => product.id == id)
        cartItems.innerHTML += `<li>
<button data-id="${currentProduct.id}">+</button>
${cart[id]} db - ${currentProduct.name} * ${currentProduct.price} Ft/db</li>`

        total += currentProduct.price * cart[id]

        maxPieces = cart[id] > maxPieces ? cart[id] : maxPieces
    }

    if (total > discountMinimumAmount || maxPieces >= discountMinimumPieces) {
        cartItems.innerHTML += `<li>Kedvezmény: ${(total * discount).toLocaleString()} Ft</li>`
    }

    cartItems.innerHTML += `<li>Összesen: ${total.toLocaleString()} Ft</li>`
}

const cartIcon = document.getElementById('cart-icon')
const cartContent = document.getElementById('cart-content')
const cartItems = document.getElementById('cart-items')

cartIcon.addEventListener('click', function () {
    cartContent.classList.toggle('active');
    refreshCartItems()
})

cartItems.addEventListener('click', (event) => {
    addToCart(event)
    refreshCartItems()
})
/*
=============== 
TEST PART
===============
*/
const addToCartTest = () => {
    console.warn('addToCartTest függvény futása')
}
const addToCartTest2 = () => console.warn('addToCartTest függvény futása')

const multiplier = (num1, num2) => {
    return num1 * num2
}

const multiplier2 = (num1, num2) => num1 * num2

const oldStyle = function () {
    console.log('oldStyle függvény futása')
}