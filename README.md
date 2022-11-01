# Javascript-Shopping-Cart

Javascript demo for a Shopping Cart.

## INSTRUCTIONS

Start with shopping-cart.html

## Files

### shopping-cart.html

The codes of the promotion are inside a global object 'cart' in ./data/codes.js
The shopping-cart is stored locally in ./data/cart.js

This should be changed to a cloud database.
The purpose of this demo is to show only the Front End javascript coding for
managing a shopping-cart and promotion codes.

### headphones.html speakers.html and watches.html

Each promotion code goes to these different web pages.
The input for the quantity has a range between 1 and 10.
Input type number gets by default arrows in the input box.
To avoid this and use my own + and - I used a CSS for it:
<code>
/*
  Solution for using type number with min and max values in DOM
  and avoid the arrows, preserving the small size
*/
input[type='number'] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
}
</code>
### shopping-cart.js

The button + and - goes to addOne() and minusOne() functions in products.js

Manage only the coupons.
Pass the code selected in the URL, like: watches.HTML?709709DH

### products.js

<code>
let codeInURL = (window.location.search).slice(1);
</code>
Take the code from the URL.

addOne() minusOne()
take the quantity input from the DOM

addToCart()
    product -> id of product, taken from the DOM
    cart -> global from ./data/cart.js
Check if the data is correct and if it is:
Stores the quantity and products the user selects in global object 'cart'.

Allow only the usage of 1 coupon per type of product, because when the user
select another coupon the global 'cart' gets empty.

showCart()
Calculate the total and the discount.
Fires the swal2 (https://sweetalert2.github.io/)
with the information of the data stored in the 'cart'
Finally shows a (CHECKOUT). Not implemented as it's Backend.

## CSS
Some notes about the CSS:

The website is fully responsive.
I use the bootstrap row-cols system for that.

Also when the size is less than 700, the cart button at the begining of the webpage stays fixed on the top with a media query:
<code>
@media (max-width: 700px) {
  .show-cart {
    position: fixed;
    text-align: center;
    margin: 0 auto;
    transform: translate(-50%, -50%);
    top: 12%;
    left: 50%;
    z-index: 100;
  }
</code>

The text and the images use mainly rem for a better responsive performance.
