/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const createTweetElement = function(data) {
  let $tweet = $(`
  <article class="tweet">
  <header>
    <div class="user">
      <img
        src="${data.user.avatars}"
        alt="">
      <p>${data.user.name}</p>
    </div>
    <h4>${data.user.handle}</h4>
  </header>
  <p>${data.content.text}</p>
  <footer>
    <span>${data.created_at}</span>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>
`);
return $tweet;
};

const renderTweet = function(data) {
  for (let tweet of data) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then((tweets) => {
      renderTweet(tweets)
    })
    .catch((err) => {
      console.log("There was an ERROR ", err)
    })
};

loadTweets()

$(document).ready(function() {
  console.log('doc is ready')

  $('form.tweetSubmit').on('submit', function(event) {
    console.log('tweet submitted, sending to database');
    event.preventDefault();
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
      .then(function(tweet) {
  
        $('.tweet-text').val('')
      })
      .catch((err) => {
        console.log('There was an error', err)
      })
  });



});