/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


$(document).ready(function () {

  //turns tweet objects into HTML formatted tweet articles
  const createTweetElement = function(data) {
    let $tweet = $(`
  <article class="tweet">
  <header>
    <div class="user">
      <img
      src="${escape(data.user.avatars)}"
        alt="">
        <p>${escape(data.user.name)}</p>
    </div>
    <h4>${escape(data.user.handle)}</h4>
  </header>
  <p>${escape(data.content.text)}</p>
  <footer>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>
`);
    $('#tweet-container').prepend($tweet);
  };

  const renderTweet = function(data) {
    
    for (let tweet of data) {
      createTweetElement(tweet);
    }
  };

  $('form.tweetSubmit').on('submit', function(event) {

    event.preventDefault();

    if (!$('textarea').val().length) {
      return alert('You cannot post an empty tweet')
    }
    if ($('textarea').val().length > 140) {
      return alert("Your tweet exceeds the maximum characters")
    }
//tweet submission to database
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    }).then(loadTweets)
    $('textarea').val("")

  });

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(renderTweet)

      .catch((err) => {
        console.log("There was an ERROR ", err)
      })
  };

  loadTweets()


});