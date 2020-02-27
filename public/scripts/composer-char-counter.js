$(document).ready(function() {
  $("textarea").val("");
});

$(document).on("input", "textarea", function() {
  let currentCount = $(this).val().length;
  let counter = $(this).siblings(".counter");
  counter.text(140 - currentCount);
  if (currentCount > 140) {
    counter.addClass("over");
  } else {
    counter.removeClass("over");
  }
});
