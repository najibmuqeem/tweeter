const data = [
  {
    "user": {
      "name": "Newton",
      "avatar": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatar": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const createTweetElement = (tweetData) => {
  const { name, avatar, handle } = tweetData.user;
  const { text } = tweetData.content;
  const dateCreated = tweetData.created_at;
  return `<article class="tweet">
            <header>
              <div>
                <img src=${avatar} />
                <span>${name}</span>
              </div>
              <span class="tweet-handle">${handle}</span>
            </header>
            <section>
              <span class="tweet-text">${text}</span>
            </section>
            <footer>
              <span>${dateCreated}</span>
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

//have a look for css class conventions: https://web.compass.lighthouselabs.ca/days/w04d2/activities/324



$(document).ready(() => {
  renderTweets(data);
})