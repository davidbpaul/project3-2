
// // database
$(document).ready(function(){

  //this takes each individule tweet and adds it to the section tweet-tweet(where user tweets are located)
  function renderTweets(tweets) {
    $('.tweet-tweet').empty();
    //empties old tweets so we dont get multiple of the same
    tweets.reverse().forEach(function(tweet){
      //add each tweet to the container
      $('.tweet-tweet').append(createTweetElement(tweet));
    })
  }

  //callback that creates tweets
  function createTweetElement(tweet) {
    // converts date from unix time stamp
    const dtoday = (new Date()).getTime();
    const post =tweet.created_at
    const date = (dtoday-post)/1000;
    const hours = Math.floor(date / 60 / 60);
    let duration = hours
    if (hours < 1){
      duration = "less then an hour ago"
    }
    else if (hours < 24){
      duration = `${hours} hours ago`
    }
    else if (hours > 24){
      const days = Math.floor(hours / 24);
      duration = `${days} days ago`;
    }
    // database information is put into a universal tweet container to create each tweet
    const tweetcontent = `<article class = "eachTweet">
                            <header class = "head">
                              <img class="pic" src=${escape(tweet.user.avatars.small)}>
                              <h2 class ="name">${escape(tweet.user.name)}</h2>
                              <a class = "user-name">${escape(tweet.user.handle)}</a>
                            </header>
                            <div class="message">
                              <p>${escape(tweet.content.text)}</p>
                            </div>
                            <footer class = "foot">
                              <p class = "time"><small>${escape(duration)}</small></p>
                              <img class="buttons" src="/images/all.png">
                            </footer>
                          </article>`

    return tweetcontent;
  };
  //secures database (people cant input there own information into the string interpolation )
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
 loadTweets()

// post tweet
  $("form").on("submit", function (ev) {
    //prevent form from submitting
    ev.preventDefault();
    //text = user input
    const text = $('#tweet-text').val()
    //creates string by serializing form values
    const data = $(this).serialize()
    //checks if tweet is absent
    if (isTweetEmpty(text)) {
      //sends alert
      alert('enter a tweet!')
      //ends function
      return;
    //checks if tweet is to long
    } else if (isTweetToLong(text)) {
      //sends alert
      alert('tweet to long!')
      //ends function
      return;
      //submits tweet
    } else {
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: data,
        success: loadTweets
      });
      //empties form content
      $('#tweet-text').val("")
    };
  });

  //function checks if tweet is empty
  function isTweetEmpty(data) {
    data = data.trim();
    return data === null || data === "";
  }
  //function checks if tweet supersedes limit
  function isTweetToLong(data) {
    return data.length > 140;
  }
  //tweets
  function loadTweets(){
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (data) {
        renderTweets(data);
      }
    })
  }
  loadTweets();
  //toggle and select form
  $('.new-tweet').hide();
  $('button').click(function(){
    $('.new-tweet').slideToggle('slow');
     $("#tweet-text").focus();
  });

  $('.tweet-tweet').on("mouseover",'.eachTweet', function(){
    $(this).find($('.buttons')).toggle();
  });
   $('.tweet-tweet').on("mouseout",'.eachTweet', function(){
    $(this).find($('.buttons')).toggle();
  });
});