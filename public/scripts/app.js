
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

$(document).ready(function() {
  $(function() {
    $("#search-text").focus();
  });

  $(".categories-button").on("click", function() {
    // Scroll to a certain element
    // event.preventDefault();
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


