
// // database
$(document).ready(function(){
  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
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
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];


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
  renderTweets(data);

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