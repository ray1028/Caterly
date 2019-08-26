
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
    let orderObj = JSON.parse(document.cookie.trim().split("=")[1].slice(2));
    $("#myModal").modal("toggle");

  });
};

// main driver function
const mainProgram = () => {
  clickToAdd();
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
});


