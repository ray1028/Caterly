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
    let orderObj = JSON.parse(
      document.cookie
        .trim()
        .split("=")[1]
        .slice(2)
    );
    $("#myModal").modal("toggle");
  });
};

// main driver function
const mainProgram = () => {
  clickToAdd();
};

const accountSid = "AC4424661674dfe2bf1d3db506ea2547f4";
const authToken = "d177fedf74fa6765fe7f8ae1fd561ad2";
const client = require("twilio")(accountSid, authToken);

const sendText = function(body) {
  client.messages
    .create({
      body: body,
      from: "+16476948610",
      to: "+16478785740"
    })
    .then(message => console.log(message.sid));
};

// main
$(document).ready(function() {
  mainProgram();

  $(".restaurant-confirm").on("click", function() {
    alert("hi");
  });

  $("#categories-container-main .a1").on("click", e => {
    e.preventDefault();
    const temp = $("#categories-container-main .a1").attr("name");
    $(`#${temp}`).slideToggle();
  });

  $("#categories-container-main .a2").on("click", e => {
    e.preventDefault();
    const temp = $("#categories-container-main .a2").attr("name");
    $(`#${temp}`).slideToggle();
  });

  $("#categories-container-main .a3").on("click", e => {
    e.preventDefault();
    const temp = $("#categories-container-main .a3").attr("name");
    $(`#${temp}`).slideToggle();
  });

  $("#categories-container-main .a4").on("click", e => {
    e.preventDefault();
    const temp = $("#categories-container-main .a4").attr("name");
    $(`#${temp}`).slideToggle();
  });
});
