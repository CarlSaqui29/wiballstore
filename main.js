//-------------add-to-cart-------------//
let products = [
  {name: 'Golden State', tag: 'g', price: 15, inCart: 0},
  {name: 'Chicago Bulls', tag: 'gg', price: 150, inCart: 0},
  {name: 'Boston Celtics', tag: 'ggg', price: 1500, inCart: 0}
];
let num_reload = [];//to redisplay item inca
let nr = JSON.parse(localStorage.getItem('nr'));//fix_1
if (nr != null) {
 for (var x = 0; x < nr.length; x++){
    num_reload[x] = nr[x];
  }
}

function get_clicked(index, name){

  document.querySelector(".modal-footer .btn").style.display = 'block';
  document.querySelector(".total").style.display = 'block';
  let nr = JSON.parse(localStorage.getItem('nr'));
  if (nr == null) {
    num_reload.push(index);
    localStorage.setItem('nr', JSON.stringify(num_reload));
  }
  if (nr != null) {
    var find = JSON.parse(localStorage.getItem('p' + index));
    if (find != null) {
      return;
    }else{
      nr.push(index);
      localStorage.setItem('nr', JSON.stringify(nr));
    }
    
  }
  cartNumbers(products[index], index);
  totalCost(products[index]);
  displayCart(index);
  document.querySelector('.empty-modal').style.display = 'none';
  
}
function onload(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers == null){
    document.querySelector('.modal-header span').textContent = 0;
    document.querySelector('.num-item-cart p').textContent = 0;
    document.querySelector('.num-item-cart_2 p').textContent = 0;
    document.querySelector('.empty-modal').style.display = 'block';
  }else{
    document.querySelector('.modal-header span').textContent = productNumbers;
    document.querySelector('.num-item-cart p').textContent = productNumbers;
    document.querySelector('.num-item-cart_2 p').textContent = productNumbers;
    document.querySelector('.empty-modal').style.display = 'none';
    document.querySelector(".modal-footer .btn").style.display = 'block';
  }
  if (productNumbers == 0) {ezero();}
}
function cartNumbers(product, index) {// add the number items in cart
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if(productNumbers){//check if there is product already or not
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.modal-header span').textContent = productNumbers + 1;
    document.querySelector('.num-item-cart p').textContent = productNumbers + 1;
    document.querySelector('.num-item-cart_2 p').textContent = productNumbers + 1;
  }else{
    localStorage.setItem('cartNumbers', 1); 
    document.querySelector('.modal-header span').textContent = 1;
    document.querySelector('.num-item-cart p').textContent = 1;
    document.querySelector('.num-item-cart_2 p').textContent = 1;
  }
  setItems(product, index);
}
function setItems(product, index){
  let cartItems = localStorage.getItem('p' + index);
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if(cartItems[product.tag] == undefined){//checkif the other product is clicked
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  }else{
    product.inCart = 1;
    cartItems = {[product.tag]: product}
  }
  localStorage.setItem("p" + index, JSON.stringify(cartItems));
}
function totalCost(product){
  let cartCost = localStorage.getItem('totalCost');
  if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  }else{
    localStorage.setItem("totalCost", product.price);
  }
}
function displayCart(index){
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers == 0) {
    document.querySelector('.empty-modal').style.display = 'block';
  }
  if (index == null){
    let nr = JSON.parse(localStorage.getItem('nr'));
    if (nr != null) {
      for (var x = 0; x < nr.length; x++){
        displayCart(nr[x]); //recursion dispay products onload
      }
      return;
    }
  }

  let cartItems = localStorage.getItem("p" + index);
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".products");
  let totaltext = document.querySelector(".total");
  let cartCost = localStorage.getItem('totalCost');
  cartCost = parseInt(cartCost);

  style_cart();
  if (cartItems) {
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += 
      ` <div class="products">
          <div class="row-cart ${item.name}">
              <div class="column-cart">
                <img src="image/${item.tag}.png">
                <h3>${item.name}<br><span>₱${item.price}.00</span></h3>
                <i class="fas ${item.tag} fa-times"></i>  
              </div>
          </div>
        </div>`
    });
    totaltext.innerHTML = '';
    totaltext.innerHTML +=
    `<h4><span style="color: grey;" class="text-info">Total:</span> ₱${cartCost}.<span class="small">00</span></h4>`
  }

  $('.g').click(function(){
    nr = JSON.parse(localStorage.getItem('nr'));
    var index = nr.indexOf(0);
    nr.splice(index, 1);
    localStorage.setItem('nr', JSON.stringify(nr));
    localStorage.removeItem('p0');
    localStorage.setItem('cartNumbers', productNumbers = productNumbers - 1);
    localStorage.setItem('totalCost', cartCost = cartCost - 15);
    $('.Golden').remove();
    style_cart();
    dcchange();
    CC();
    if (productNumbers == 0) {ezero();}
  });
  $('.gg').click(function(){
    nr = JSON.parse(localStorage.getItem('nr'));
    var index = nr.indexOf(1);
    nr.splice(index, 1);
    localStorage.setItem('nr', JSON.stringify(nr));
    localStorage.removeItem('p1');
    localStorage.setItem('cartNumbers', productNumbers = productNumbers - 1);
    localStorage.setItem('totalCost', cartCost = cartCost - 150);
    $('.Chicago').remove();
    style_cart();
    dcchange();
    CC();
    if (productNumbers == 0) {ezero();}
  });
  $('.ggg').click(function(){
    nr = JSON.parse(localStorage.getItem('nr'));
    var index = nr.indexOf(2);
    nr.splice(index, 1);
    localStorage.setItem('nr', JSON.stringify(nr));
    localStorage.removeItem('p2');
    localStorage.setItem('cartNumbers', productNumbers = productNumbers - 1);
    localStorage.setItem('totalCost', cartCost = cartCost - 1500);
    $('.Boston').remove();
    style_cart();
    dcchange();
    CC();
    if (productNumbers == 0) {ezero();}
  });
}
function ezero(){
  document.querySelector('.empty-modal').style.display = 'block';
  document.querySelector(".modal-footer .btn").style.display = 'none';
  document.querySelector(".total").style.display = 'none';
}
function dcchange(){
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  localStorage.setItem('cartNumbers', productNumbers);
  document.querySelector('.modal-header span').textContent = productNumbers;
  document.querySelector('.num-item-cart p').textContent = productNumbers;
  document.querySelector('.num-item-cart_2 p').textContent = productNumbers;
}
function CC(){
  let totaltext = document.querySelector(".total");
  let cartCost = localStorage.getItem('totalCost');
  cartCost = parseInt(cartCost);
  totaltext.innerHTML = '';
  totaltext.innerHTML +=
  `<h4><span style="color: grey;" class="text-info">Total:</span> ₱${cartCost}.<span class="small">00</span></h4>`
}
function style_cart(){
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers == 1) {
    document.querySelector(".ph li p").style.padding = ".01vw .6vw";
    document.querySelector('.num-item-cart_2 p').style.padding = ".1px 7px";
    document.querySelector(".modal-header span").style.padding = "1px 8px ";
  }else{
    document.querySelector(".ph li p").style.padding = ".01vw .4vw";
    document.querySelector('.num-item-cart_2 p').style.padding = "1px 6px";
    document.querySelector(".modal-header span").style.padding = "1px 6px ";
  }
}
onload();
displayCart();




//---------------modal---------------------//
  $('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
  $('#myModal').modal('handleUpdate') 
})
//--------------popover------------------//
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
//--------------menu------------------//
var ov_side = document.getElementById("overlay-side");

function close_nav() {
  $('.btnn').toggleClass("click");
  $('.sidebar').toggleClass("show");
  document.getElementById("overlay-side").style.display = "none";
}
$('.btnn').click(function(){
  $(this).toggleClass("click");
  $('.sidebar').toggleClass("show");
  if (ov_side.style.display == "block") {
    ov_side.style.display = "none";
  }else{
    ov_side.style.display = "block";
  }
});

$('.sidebar ul li').click(function(){
  $(this).addClass("active").siblings().removeClass("active");
});
//----------------collapse-------------------//
function collapse_show(){
  $('.panel-collapse').collapse('show');
}
function collapse_hide(){
  $('.panel-collapse').collapse('hide');
}
//---------------item_follow------------------//
function item_follow(n){
  if (n == 1) {
    $('.NO-item-1').css('margin-top', "-10px");
    $('.contain-1 img').css('margin-top', "-1vw");
    $('.contain-1 img').css('box-shadow', "1px 12px 20px rgba(0, 0, 0, 0.1)");
  }else{
    $('.NO-item-2').css('margin-top', "-10px");
    $('.contain-2 img').css('margin-top', "-1vw");
    $('.contain-2 img').css('box-shadow', "1px 12px 20px rgba(0, 0, 0, 0.1)");
  }
}
function item_down(n){
  if (n == 1) {
    $('.NO-item-1').css('margin-top', "0px");
    $('.contain-1 img').css('margin-top', "0vw");
    $('.contain-1 img').css('box-shadow', "none");
  }else{
    $('.NO-item-2').css('margin-top', "0px");
    $('.contain-2 img').css('margin-top', "0vw");
    $('.contain-2 img').css('box-shadow', "none");
  }
}
//------------------reveal-animation----------//
/*ScrollReveal().reveal('.nav_one', {
    origin: 'top',
    distance: '60px',
    delay: 375,
    duration: 500,
    reset: false,
    mobile: false
});
ScrollReveal().reveal('.parallax', {
    origin: 'right',
    distance: '10px',
    delay: 375,
    duration: 500,
    reset: false,
    mobile: false
});
ScrollReveal().reveal('.two_6, .two_4', {
    origin: 'right',
    distance: '100px',
    delay: 375,
    duration: 500,
    reset: false,
    mobile: false
});
ScrollReveal().reveal('.slogan, .one_6, .one_4', {
    origin: 'left',
    distance: '100px',
    delay: 375,
    duration: 500,
    reset: false,
    mobile: false
});
ScrollReveal().reveal('.sec_2, .sec_5, .row_5, .rise, .panel, .sec_3, .row_3', {
    origin: 'bottom',
    distance: '100px',
    delay: 375,
    duration: 500,
    reset: false,
    mobile: false
});*/
//------------------accordion-mobile----------//
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("activated");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
//--------------swiper------------------//
var mySwiper = new Swiper('.swiper-container', {//swiper
  speed: 1000,// speed of slides 
  //spaceBetween: 0,
  slidesPerView: 3,
  autoplay: {//autoplay
    delay: 4500,
    disableOnInteraction: true,
  },
  direction: 'horizontal',
  loop: true,

  pagination: {// If we need pagination
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  navigation: {// Navigation arrows
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: { // And if we need scrollbar
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    // when window width is <= 499px
    299: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    // when window width is <= 999px
    650: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1001: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  }
});
//bug if add to cart 3 and minus 1 then reload then add again - fix see fix_1
//but if add item the delete then add the deleted item
//un finiseh - do not allowed utton to be twix clicked.