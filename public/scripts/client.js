

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

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET', dataType: "json" })
  .then(function (result) {
    renderTweets(result);
  });
}

$(document).ready(() => {

  loadTweets();

  const $form = $('#new-tweet-form');
  const $text = $('#tweet-area');

  $form.submit((event) => {

    event.preventDefault();

    if ($text.val().length > 140) {
      $(".error").text("The tweet must be under the character count!");
      return
    } else if (!$text.val()) {
      $(".error").text("Comon, saay sumpin!");
      return
    }

    $.ajax({
      url: '/tweets', 
      method: 'POST',
      data: $form.serialize(),
      success:() => {
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