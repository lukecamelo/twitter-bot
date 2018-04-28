const twit = require('twit')
const config = require('./config.js')

const Twitter = new twit(config)

var favoriteTweet = function(){
  var params = {
      q: '#nodejs, #Nodejs',  
      result_type: 'recent',
      lang: 'en'
  }

  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // favorite it
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // error handling
        if(err){
          console.log('CANNOT BE FAVORITED... Error');
        }
        else{
          console.log('FAVORITED... Success!!!');
        }
      });
    }
  });
}
// run the favorite function
favoriteTweet();
// favorite something once an hour
setInterval(favoriteTweet, 3600000);

// function to generate a random tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};