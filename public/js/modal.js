$(document).ready(function() {
  window.mod = $(".mod");

  $(".evbtn").click(function(event) {
    window.currentItem = $(event.target).parent();
    console.log("clicked", currentItem);
    if (!$(mod).hasClass("mod--show")) {
      let eventID = $(currentItem).attr("data-id")
      mod.eventID = eventID;
      let coverURL = `/assets/img/poster/${eventID}.jpg`;
      let title = $(currentItem).attr("data-title");
      let desc = $(currentItem).attr('data-desc');

      // Check if the user is already registered for the event
      // and set the function of the button as required
      fetch(`/chregister/${eventID}`).then(function(res) {
        return res.text();
      }).then(function(message) {
        let buttonText;
        console.log(message);
        if (message == "T") {

          buttonText = "Deregister";
          $("#regbtn").removeClass("btn-success");
          $("#regbtn").addClass("btn-danger");
        } else {

          buttonText = "Register";
          $("#regbtn").removeClass("btn-danger");
          $("#regbtn").addClass("btn-success");
        }
        $("#regbtn").text(buttonText);
        $("#regbtn").removeClass("hide");
      });
      console.log("clicked", title, coverURL, desc);
      $("#mod__cover").attr("src", coverURL);
      $("#mod__title").text(title);
      $("#mod__desc").text(desc);
    }

    console.log("btn clicked");
    $(mod).toggleClass("mod--show");
    $("body").toggleClass("hide-overflow");
  });

  $(".overlay").click(function() {
    $(mod).toggleClass("mod--show");
    $("body").toggleClass("hide-overflow");
  });

  $(".mod__close").click(function() {
    $(mod).toggleClass("mod--show");
    $("body").toggleClass("hide-overflow");
  });

  $("#regbtn").click(function() {

    // Disable the button after it is clicked
    $("#regbtn").attr("disabled", true);

    if ($("#regbtn").text() == "Register") {

      // If the button says Register
      // make a GET request to the register route
      fetch(`/register/${mod.eventID}`).then(function(res) {
        return res.text();
      })
      .then(function(data) {

        if (data == "T") { // If Registered successfully

          // Change text to Deregister
          $("#regbtn").text("Deregister");
          $("#regbtn").removeClass("btn-success");
          $("#regbtn").addClass("btn-danger");
        }

        // Enable the button
        $("#regbtn").attr("disabled", false);
      })
    } else if ($("#regbtn").text() == "Deregister") {

      // If the button says Deregister
      // make a GET request to the unregister route
      fetch(`/unregister/${mod.eventID}`).then(function(res) {

        return res.text();
      }).then(function(data) {

        if (data == "T") { // If Deregistered successfully

          // Change text to Deregister
          $("#regbtn").text("Register");
          $("#regbtn").removeClass("btn-danger");
          $("#regbtn").addClass("btn-success");
        }

        // Enable the button
        $("#regbtn").attr("disabled", false);
      })
    }
  });
});
