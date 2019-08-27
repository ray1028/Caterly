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
  // currentVal = 0;
  // currentPrice = 0;

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
    $("#cart-total").html("$" + currentPrice);
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

    console.log(cartStorage, orderObj);
    let cookieObj = JSON.parse(
      document.cookie
        .trim()
        .split("=")[1]
        .slice(2)
    );

    let userid = cookieObj.user_id;
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

// main
$(document).ready(function() {
  mainProgram();
});

$(document).ready(function() {
  //Button to bring page down
  $(".categories-button").on("click", function() {
    document.querySelector("#categories-page").scrollIntoView({
      behavior: "smooth"
    });
  });

  $("#categories-container-main .a1").on("click", (e) => {
    e.preventDefault();
    const temp = $("#categories-container-main .a1").attr("name");
    $(`#${temp}`).slideToggle();
  });

  $("#categories-container-main .a2").on("click", (e) => {
    e.preventDefault();
    const temp = $("#categories-container-main .a2").attr("name");
    $(`#${temp}`).slideToggle();
  });

  $("#categories-container-main .a3").on("click", (e) => {
    e.preventDefault();
    const temp = $("#categories-container-main .a3").attr("name");
    $(`#${temp}`).slideToggle();
  });

  $("#categories-container-main .a4").on("click", (e) => {
    e.preventDefault();
    const temp = $("#categories-container-main .a4").attr("name");
    $(`#${temp}`).slideToggle();
  });

});
