// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done(users => {
//     for (user of users) {
//       $("<div>")
//         .text(user.name)
//         .appendTo($("body"));
//     }
//   });
// });

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
        localStorage.setItem("cart", JSON.stringify(cartStorage));
      } else {
        cartStorage.push(orderObj);
        localStorage.setItem("cart", JSON.stringify(cartStorage));
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

// main
$(document).ready(function() {
  mainProgram();

  //AJAX method to update the page with the time of the order.
  $(".restaurant-confirm").on("click", function(event) {
    event.preventDefault;
    $(() => {
      $.ajax({
        method: "POST",
        url: "/home/restaurants/1",
        data: { time: $("#time").val() },
        success: function() {
          $(".estimated-time").text(time.value);
        },
        error: function() {
          alert("An AJAX error has occured");
        }
      });
    });
  });

  // alert((new Date($(".date-value").html())));

  // $(".date-value").html($(this)(new Date($(".date-value").html())));
  $("#categories-container-main a").on("click", e => {
    e.preventDefault();
    let x = $(this.activeElement)[0];
    let y = $(x).attr("data-id");

    $(".side-content-container").css("visibility", "hidden");
    $(`#${y}`).css("visibility", "visible");
  });
});




































































$(document).ready(() => {
  $(".img-wrapper").hover(function() {
    $(this).find(".fa-arrow-right").css("visibility","visible");
    // const x = $(this).find(".fa-arrow-right");
    // console.log(x);
  });
  $(".img-wrapper").mouseleave(function() {
    $(this).find(".fa-arrow-right").css("visibility","hidden");
    console.log("out");
  });

  $(".button-down").click(function() {
    $('html').animate({scrollTop:$(document).height()}, 'slow');
  });
});













