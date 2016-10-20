$(document).ready(function(){
  var $counter = $('.counter');
  var $input = $('#tweet-text');
  $input.on('input', function(){
    $counter.html(140 - $input.val().length);
    if(Number($counter.text()) < 0){
      $counter.addClass('hilighted');
    }else{
      $counter.removeClass('hilighted');
    }
  })
  if($('.eachTweet').is(":hover")){
    $('.eachTweet').addClass('button')
  }
  else{
    $('.eachTweet').removeClass('button')
  }
  $("form").on("submit", function (ev) {
    $counter.html(140);
  });
});
