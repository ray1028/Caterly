$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(users => {
    for (user of users) {
      $("<div>")
        .text(user.name)
        .appendTo($("body"));
    }
  });
});

const clickToAdd = () => {

  $(".menu-item").click(function() {
    $("#myModal").modal("toggle");

    $("#cart-item").html(
      $(this)
        .children(".menu-item-1")
        .html()
    );

    let id = $(this)
      .children(".menu-item-1")
      .data("id");

    $("#cart-item").data("id", id);

    $("#cart-description").html(
      $(this)
        .children(".menu-item-3")
        .html()
    );
    $("#cart-quantity-box").val(1);
    currentPrice = $(".menu-item-2").html();
    currentPrice = (Number(currentPrice.slice(1)) / 1000).toFixed(2);
    $("#cart-total").html("$" + currentPrice);
  });
};

const cartAdd = () => {
  currentVal = $("#cart-quantity-box").val();
  $(".plus-btn").click(function() {
    ++currentVal;
    $("#cart-quantity-box").val(currentVal);
    $("#cart-total").html("$" + (currentVal * currentPrice).toFixed(2));
    let item = $("#cart-item")
      .html()
      .trim();

    orderObj = {
      id: $("#cart-item").data("id"),
      quantity: currentVal
    };

  });
};

const cartMinus = () => {
  currentVal = $("#cart-quantity-box").val();
  $(".minus-btn").click(function() {
    if (currentVal > 0) --currentVal;
    $("#cart-quantity-box").val(currentVal);
    $("#cart-total").html("$" + (currentVal * currentPrice).toFixed(2));

    orderObj = {
      id: $("#cart-item").data("id"),
      quantity: currentVal
    };
  });
};

const clearCartByClosingModal = () =>
  $("#myModal").on("hidden.bs.modal", function() {
    currentVal = 0;
    currentPrice = 0;
    $("#cart-quantity-box").val(0);
    $("#cart-total").html("$" + 0.0);
  });

const addItemToCart = () => {
  $("#addtocart").submit(e => {
    e.preventDefault();
  });

  $("#add-item").click(function() {

    let cartStorage = JSON.parse(localStorage.getItem("cart"));

    if (!cartStorage) {
      const tempArr = [];
      tempArr.push(orderObj);
      localStorage.setItem("cart", JSON.stringify(tempArr));
    } else {
      const found = cartStorage.find(ele => ele.id === orderObj.id);
      if (found) {
        found.quantity += orderObj.quantity;
        localStorage.setItem('cart', JSON.stringify(cartStorage));
      } else {
        cartStorage.push(orderObj);
        localStorage.setItem('cart', JSON.stringify(cartStorage));
      }
    }

  });
};

// main driver function
const mainProgram = () => {
  clickToAdd();
  cartAdd();
  cartMinus();
  clearCartByClosingModal();
  addItemToCart();
};

// const accountSid = "AC4424661674dfe2bf1d3db506ea2547f4";
// const authToken = "d177fedf74fa6765fe7f8ae1fd561ad2";
// const client = require("twilio")(accountSid, authToken);

// const sendText = function(body) {
//   client.messages
//     .create({
//       body: body,
//       from: "+16476948610",
//       to: "+16478785740"
//     })
//     .then(message => console.log(message.sid));
// };

// main
$(document).ready(function() {
  mainProgram();

  $(".restaurant-confirm").on("click", function() {
    alert("hi");
  });

  $("#categories-container-main a").on("click", (e) => {
    e.preventDefault();
    let x = $(this.activeElement)[0];
    let y = $(x).attr('data-id');

    $(".side-content-container")
      .css("visibility", "hidden");
    $(`#${y}`)
      .css("visibility", "visible");
  });
});
