var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];


var started = false;
var level = 0;
var gameOn = 0;


$(document).keypress(function() {               // concept : *call function on an event only once!

  gameOn = 1;
  if (!started) {
    //$("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



  function nextSequence() {

    userPattern = [];    //necessary or only current (latest index) button will need to be pressed.

    level++;                                    // concept : *change element property after every user initiated event!
    $("#level-title").text("Level " + level);

    var nextSequence = Math.floor(Math.random()*4);
    var randomColor = buttonColors[nextSequence];
    gamePattern.push(randomColor);



    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);

}




$(".btn").click(function() {

    var userColor = $(this).attr("id");  //this => clicked button , attr sets userColor as id
    
    userPattern.push(userColor);

    playSound(userColor);
    
    //------
    if(gameOn===1){
      checkAnswer(userPattern.length-1);
    }

  });




  function checkAnswer(currentLevel) {


    if (gamePattern[currentLevel] === userPattern[currentLevel]) {

      console.log("success");

      
      if (userPattern.length === gamePattern.length){

        
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }



    } else {

      console.log("wrong");

      
      playSound("wrong");

      
      // ** nested timeOuts
      $("body").addClass("game-over");
      setTimeout(function () {

        $("body").removeClass("game-over");
        $("body").addClass("body");
        setTimeout(function () {

        $("body").removeClass("body");
        $("body").addClass("game-over");

        setTimeout(function () {
        $("body").removeClass("game-over");

      }, 200);
      }, 200);
      }, 200);




      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();     // keypress not required cause after clearing game data, keypress initiates game and startOver clears data.

    }

}



// $("body").addClass("game-over");
      //setTimeout(function () {
        //$("body").removeClass("game-over");
      //}, 200);    ------------------------ **repeating (copy pasting) this function => second one will be exxecuted and the first will be ignored



function startOver() {
  gamePattern = [];
  //userPattern = [];        no need cause always initiated as 0 in nextSequence.
  level = 0;
  started = false;
  gameOn = 0;
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


