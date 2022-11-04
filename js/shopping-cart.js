// Show in a swal2 the codes are get from a JSON
// but they could be fetched from a database

// GLOBALS
// coupons from data/coupons.js

function showUserCodes() {
  let swalHtml = '';
  for (let code in coupons) {
    console.log('CODE: ' + code);
    console.log('COUPONS[code]: ' + coupons[code]);
    swalHtml += `<button class="btn-link" onClick="includePromoCode('${code}')"> ${code} </button>`;
  }
  Swal.fire({
    icon: 'info',
    title: 'Your promotion codes',
    html: 'Click on one:<br/>' + swalHtml,
    width: 600,
    padding: '2em',
    color: '#716add',
    cancelButtonText: 'Cancel',
    showCancelButton: true,
  });
}
// Include the selected code inside the input
function includePromoCode(code) {
  let swalHTML = coupons[code].Description;
  let swalHTML2 =
    '<p style="font-size: 1.2rem;">Code ' + code + ' selected!</p>';
  Swal.fire({
    title: swalHTML,
    html: swalHTML2,
    timer: 5000,
  });
  document.getElementById('inputPromotionCode').value = code;
}

// Show the products in the DOM
function handleInput() {
  let inputPromotionCode = document.getElementById('inputPromotionCode');
  if (inputPromotionCode.value === '') {
    Swal.fire({
      title: 'Please, select your promotion code',
      timer: 2000,
    });

    inputPromotionCode.classList.add('input-red');
    inputPromotionCode.placeholder = '👇 Select your code 👇';
  } else {
    showProducts(inputPromotionCode.value);
  }

}
function showProducts(code) {
  // Remove the card
  let divContainer = document.getElementById('container');
  divContainer.textContent = '';

  // Go to the products page
  switch (coupons[code].Products) {
    case 'watches':
      window.location.href = 'watches.html?' + code;
      break;
    case 'speakers':
      window.location.href = 'speakers.html?' + code;
      break;
    case 'headphones':
      window.location.href = 'headphones.html?' + code;
      break;
    default:
      break;
  }
}
