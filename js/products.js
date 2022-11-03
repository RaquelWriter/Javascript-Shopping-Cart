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
  if (inputQty.value < 10) {
    inputQty.value++;
    inputQty.placeholder = inputQty.value;
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

  // Pick data from the DOM
  let inputQty = document.getElementById(product).value;
  let price = document.getElementById('price_' + product).innerText;
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
  } else {
    Object.assign(cart, { [product]: { Quantity: inputQty,
      Price: price
    } });
  }

  // Show the qty added to the cart:
  let message = document.getElementById('message' + '_' + product);
  message.innerHTML = 'You have ' + cart[product].Quantity + ' in your cart.';

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
  let IVA = total * 0.15;
  console.log(IVA);
  totalWithDiscount = total - parseFloat(total * coupons[codeInURL].Discount).toFixed(2);
  swalHTML += ('<p>Coupon applied: ' + codeInURL + '<br>Discount: ' + coupons[codeInURL]['Discount']* 100 + '%</p>');
  swalHTML += ('<p>Ammount due:<br><del>' + total + '</del> <div id="total-with-discount">' + totalWithDiscount + ' €</div></p>');
  swalHTML += ('<p>IVA (15%): ' + IVA + ' €</p>');
  swalHTML += ('<div id="you-saved">You save: ' + parseFloat(total - totalWithDiscount).toFixed(2) + ' €</div>');
  swalHTML += ('<div><p>(CHECKOUT) <img id ="img-visa-mastercard" src="./images/visa-mastercard.jpg" alt="visa-mastercard" /></p></div>');
  Swal.fire({
/*     imageUrl: './images/304955_1.jpg', */
    title: 'Items in your cart',
    html: swalHTML
  })
}
