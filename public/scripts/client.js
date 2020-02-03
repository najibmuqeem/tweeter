

const escape = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = (tweetData) => {
  const { name, avatar, handle } = tweetData.user;
  const { text } = tweetData.content;
  const dateCreated = tweetData.created_at;
  return `<article class="tweet">
            <header>
              <div>
                <img src="${avatar}" />
                <span>${name}</span>
              </div>
              <span class="tweet-handle">${handle}</span>
            </header>
            <section>
              <span class="tweet-text">${escape(text)}</span>
            </section>
            <footer>
              <span>${(dateCreated)}</span>
              <div class="tweet-icons">
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>
            </footer>
          </article>`
 };

const renderTweets = (tweets) => {
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $('#tweets-container').prepend(tweetElement);
  }
}

// const sliderHeader = () => {
//   $('.new-tweet').hide();
//   $(document).ready(() => {
//       $('.fa-angle-double-down').click(() => {
//         $('.new-tweet').slideToggle();
//         if ($('.new-tweet').is(':visible')){
//           $('#tweet-area').focus();
//         }
//       })
//   });
// };


$(document).ready(() => {

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET', dataType: "json" })
    .then(function (result) {
      renderTweets(result);
    });
  }
  loadTweets();

  const $form = $('#new-tweet-form');
  const $text = $('#tweet-area');

  $form.submit((event) => {

    event.preventDefault();

    if ($text.val().length > 140) {
      console.log("too long");
      return
    } else if (!$text.val()) {
      console.log("it's empty");
      return
    }

    $.ajax({
      url: '/tweets', 
      method: 'POST',
      data: $form.serialize(),
      success:() => {
        console.log("this was successful")
        loadTweets();
        $('#counter').text(140);
        $('#tweet-area').val('').focus();
      },
      error: (error) => {
        console.log(error);
      }
    })
  });

  $(".toggle-btn").click(() => {
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet textarea").focus();
  });
  
  //The new tweet area is hidden until called upon
  $(".new-tweet").hide();
})