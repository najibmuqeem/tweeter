//clears text area on document load
$(document).ready(function() {
  $("textarea").val("");
});

//input event handler for the tweet text area
$(document).on("input", "textarea", function() {
  //current number of characters in text area
  let currentCount = $(this).val().length;
  //obtain counter element for manipulation
  let counter = $(this)
    .siblings("#under-new-tweet")
    .children(".counter");

  //change counter value
  counter.text(140 - currentCount);

  //makes counter text red if over limit
  if (currentCount > 140) {
    counter.addClass("over");
  } else {
    counter.removeClass("over");
  }
});
