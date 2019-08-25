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
  $(".categories-button").on("click", function() {
    // Scroll to a certain element
    // event.preventDefault();
    document.querySelector("#categories-page").scrollIntoView({
      behavior: "smooth"
    });
  });
});
