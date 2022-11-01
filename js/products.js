// GLOBALS:
// cart from data/cart.js
// coupons from data/coupons.js

// Coupon code is in the url like ?DF9709DH
// Remove the ? of the code to get the code
let codeInURL = (window.location.search).slice(1);
console.log(codeInURL);

//Resultado:
//producto=camiseta&color=azul&talla=s
function addOne(num) {
  let inputQty = document.getElementById(num);
  console.log(num.value);
  if (inputQty.value < 10) {
    inputQty.value++;
    inputQty.placeholder = inputQty.value;
    console.log(typeof inputQty.value, inputQty.value);
  } else {
    Swal.fire({
      title: 'Please, select a number between 0 and 10'
    })
  }
}

function minusOne(num) {
  let inputQty = document.getElementById(num);
  if (inputQty.value > 0) {
    inputQty.value--;
    inputQty.placeholder = inputQty.value;
    console.log(typeof inputQty.value, inputQty.value);
  } else {
    null;
  }
}

/*
    =========
    addToCart
    =========
    product -> id of product, taken from the DOM
    cart -> global from ./data/cart.js
*/
function addToCart(product) {

  let showCartButton = '<div class="show-cart"><button type="button" class="btn btn-outline-primary" onclick="showCart()"><img id="showCartIco" src="./images/Shopping_cart_font_awesome.png" alt="cart"><br>Show cart</button></div>';
  document.getElementById('showCartButton').innerHTML = showCartButton;

  console.log('CART: ' + cart);
  console.log('PRODUCT: ' + product);
  // Pick data from the DOM
  let inputQty = document.getElementById(product).value;
  let price = document.getElementById('price_' + product).innerText;
  console.log('Cantidad: ' + inputQty + ' / ID product: ' + product + ' / Price: ' + price);

  // Check if the quantity is in the range and it's not a NaN
  if (inputQty < 0 || inputQty > 10) {
    inputQty = "0";
    Swal.fire({
      title: 'Please, select a number between 0 and 10'
    });
    return;
  }

  // Add the product and qty to the cart
  if (cart[product] !== undefined) {
    cart[product].Quantity = inputQty;
    console.log(JSON.stringify(cart));
  } else {
    Object.assign(cart, { [product]: { Quantity: inputQty,
      Price: price
    } });
    console.log(JSON.stringify(cart));
  }

  // Show the qty added to the cart:
  let message = document.getElementById('message' + '_' + product);
  message.innerHTML = 'You have ' + cart[product].Quantity + ' in your cart.';
  console.log('CART: ' + JSON.stringify(cart));

  // If the qty is 0 delete the message
  // &nbsp; is neccesary to not collapse the structure.
  if (cart[product].Quantity == 0) {
    message.innerHTML = '&nbsp;';
  }

  // Allow only the ussage of 1 coupon per type of product
}


/*
  SHOWCART
  Fires a swal 2 and gives the total with the discount.
*/
function showCart(){

  let swalHTML = '';
  let total = 0;
  let discount = 0.0;
  let totalWithDiscount = 0.0;
  for (let item in cart){
    let imgItem = '<img src="./images/' + item + '.jpg" alt="" height = "150"/>';
    total += Number(cart[item].Price).toFixed(2) * cart[item].Quantity;
    discount = parseFloat(cart[item].Discount);
    swalHTML += (imgItem + '<br>Quantity: ' + cart[item].Quantity + '<br>Price/U: ' + cart[item].Price + ' €<br>');
  }
  totalWithDiscount = total - parseFloat(total * coupons[codeInURL].Discount).toFixed(2);
  swalHTML += ('<p>Coupon applied: ' + codeInURL + '<br>Discount: ' + coupons[codeInURL]['Discount']* 100 + '%</p>');
  swalHTML += ('<p>Ammount due:<br><del>' + total + '</del> <div id="total-with-discount">' + totalWithDiscount + ' €</div></p>');
  swalHTML += ('<div id="you-saved">You save: ' + parseFloat(total - totalWithDiscount).toFixed(2) + ' €</div>');
  swalHTML += ('<div><p>(CHECKOUT) <img id ="img-visa-mastercard" src="./images/visa-mastercard.jpg" alt="visa-mastercard" /></p></div>');
  Swal.fire({
/*     imageUrl: './images/304955_1.jpg', */
    title: 'Items in your cart',
    html: swalHTML
  })
}
