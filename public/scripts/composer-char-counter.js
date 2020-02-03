$(document).ready(() => {
  const max = 140;
  $("#tweet-area").keyup(() => {
    const count = $(this).val().length;
    const remaining = max - count;
    $("#counter span").text("remaining");
    if (remaining > 0) {
      $("#counter").css("color", "ED6A5A");
    } else {
      $("#counter").css("color", "red");
    }
  });
})