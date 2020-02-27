//code to run after document loads
$(document).ready(function() {
  //display currently stored tweets
  loadTweets();

  //hide the invalid input display
  $(".display-error").addClass("hide");

  //code to run on tweet submission
  $(".new-tweet-form").on("submit", function(e) {
    e.preventDefault();

    //hardcoded error messages
    const errorMessagesOver = [
      "TOO. MUCH. TEXT.",
      "Ease up a little!",
      "Tweet too long.",
      "No one is THAT interested in what you have to say.",
      "A picture's worth less words than what you just wrote.",
      "Please, no more!!",
      "Verbosity killed the bat.",
      "You know the maximum character limit is 140, right?",
      "There's a character counter RIGHT HERE!"
    ];
    const errorMessagesNone = [
      "What? I can't hear you.",
      "Come on, say something!",
      "Tweet too short.",
      "Don't be shy!",
      "Gimme SOMETHING, anything!",
      "Not very verbose today, are we?",
      "You know the minimum character limit is 1, right?",
      "Say literally anything.",
      "Even a space will work if you have nothing else to say."
    ];

    //display relevant error if tweet text is nonexistent or above limit
    if ($(".post-text").val().length > 140) {
      $(".display-error")
        .text(errorMessagesOver[Math.floor(Math.random() * Math.floor(10))])
        .fadeIn();

      return;
    } else if (!$(".post-text").val()) {
      $(".display-error")
        .text(errorMessagesNone[Math.floor(Math.random() * Math.floor(10))])
        .fadeIn();

      return;
    }

    //make a post request for the tweet
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(".new-tweet-form").serialize(),
      success: function() {
        loadTweets();
        $(".display-error").text("");
        $(".counter").text(140);
        $(".post-text").val("");
      },
      error: error => {
        console.error(error);
      }
    });
  });

  //code to run when the arrow below "write a new tweet" is clicked
  $("#write-tweet").on("click", function() {
    //clear previous values
    $(".display-error").text("");
    $(".post-text").val("");

    //show/hide the new tweet form depending on its current state
    if ($(".new-tweet").hasClass("shown")) {
      $(".new-tweet").removeClass("shown");
      $(".new-tweet").slideUp(400, () => {});
      $("#write-tweet").addClass("fa-angle-double-down");
      $("#write-tweet").removeClass("fa-angle-double-up");
    } else {
      $(".new-tweet").addClass("shown");
      $(".new-tweet").slideDown(400, () => {});
      $("#write-tweet").removeClass("fa-angle-double-down");
      $("#write-tweet").addClass("fa-angle-double-up");
      $("textarea").focus();
    }
  });

  //code to run on scroll
  $(document).scroll(function() {
    //show/hide "write a new tweet" or the scroll-to-top button depending on whether or not the current scroll value is past the header
    if ($(window).scrollTop() > 400) {
      $("#to-top").fadeIn();
      $("#write-a-new-tweet").fadeOut();

      //click event handler, only visible in this condition
      $("#to-top").on("click", function() {
        $(window).scrollTop(0);
      });
    } else {
      $("#write-a-new-tweet").fadeIn();
      $("#to-top").fadeOut();
    }
  });
});

//function to make tweet text safe
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//creates a tweet article and populates it with relevant information
const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  let html = `
<header><span id="profile"><span class="picture"><img id="avatar" src="${
    tweet.user.avatars
  }"></span><span class="name">${
    tweet.user.name
  }</span></span><span class="handle">${
    tweet.user.handle
  }</span></header><div class="tweet-text">${escape(
    tweet.content.text
  )}</div><footer><span class="time">${msToOther(
    tweet.created_at
  )} ago</span><span class="actions"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span></footer>`;
  $tweet.append(html);

  return $tweet;
};

//renders each tweet in storage in reverse order
const renderTweets = function(tweets) {
  $("#tweets-container").empty();
  for (let tweet of tweets) {
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
};

//ajax get request to display the tweets
const loadTweets = () => {
  $.ajax("/tweets", { method: "GET", dataType: "JSON" }).then(function(result) {
    renderTweets(result);
  });
};

//function to convert ms from 1970 to time in the past from today
const msToOther = ms => {
  const diff = Date.now() - ms;
  if (diff < 1000) {
    return "Moments";
  } else if (diff < 60000) {
    return Math.floor(diff / 1000) + " second(s)";
  } else if (diff < 360000) {
    return Math.floor(diff / 60000) + " minute(s)";
  } else if (diff < 86400000) {
    return Math.floor(diff / 360000) + " hour(s)";
  } else if (diff < 31536000000) {
    return Math.floor(diff / 86400000) + " day(s)";
  } else {
    return Math.floor(diff / 31536000000) + " year(s)";
  }
};
