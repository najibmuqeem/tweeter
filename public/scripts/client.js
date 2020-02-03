/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  const { name, avatars, handle } = tweetData.user.name;
  const input = tweetData.content.text;
  const dateCreated = tweetData.created_at;

  const $tweet = $('<article>');
  const $header = $('<header>', {'class': 'tweet-header'});
  const $footer = $('<footer>', {'class': 'tweet-footer'});
  const $text =$('<span>', {'class': 'tweet-text'});

  $header.append(`
    <div class="user-info">
      <img class="tweet-img" src="${avatars}"/>
      <span class="tweet-name">${name}</span>
    </div>
    <span class="tweet-handle">${handle}</span>
  `);

  $footer.append(formatTime(dateCreated));
  $footer.append(`
  <span class="tweet-icon">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </span>`);


  $text.text(input);
  $tweet.append($header, $text, $footer);

 return $tweet;
 };


const renderTweets = (tweets) => {
  $('#tweet-container').empty();
  for (const tweet of tweets) {
    let render = createTweetElement(tweet);
    $('#tweet-container').prepend(render);
  }
};
