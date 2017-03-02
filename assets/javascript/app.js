var intervalId;
var timeAllotted;
var answersCorrect;
var answersIncorrect;
var unanswered;
var currentRound;

window.onload = function() {
  $('#results-list').toggle(false);
  $('#reset').toggle(false);
  $("#start").click(triviaGame.startGame);
  $('#reset').click(triviaGame.resetGame);
  $('.answer').toggle(false);
};

//Audio Controls (rudimentary, I know);
var audioClick = false;
$('#mute-button').on("click", function() {
  if (audioClick === false) {
    $('#nujabes').trigger('pause');
    $('span').removeClass("glyphicon-volume-off");
    $('span').addClass("glyphicon-volume-up");
    audioClick = true;
  }
  else if (audioClick === true) {
    $('#nujabes').trigger('play');
    $('span').removeClass("glyphicon-volume-up");
    $('span').addClass("glyphicon-volume-off");
    audioClick = false;   
  };
});

var triviaGame = {

  timeAllotted: 30,
  answersCorrect: 0,
  answersIncorrect: 0,
  unanswered: 0,
  currentRound: 0,

  questions: ['What country is most commonly referred to as "the happiest country on Earth?"',
    "Which country experienced the highest real GDP growth this past year (2016)?",
    "What is the most toured/visited country in the world?",
    "Which country has the most world cup wins?",
    "What is the smallest country in the world?",
    "This country is home to the highest mountain in the world:",
    "Which country is consistently rated as having 'the best food in the world?'",
    "What country has the longest coastline?"
  ],

  answers: [["Denmark", "The U.S.A.", "Sweden", "Iceland"],
    ["Ethiopia", "China", "The U.S.A.", "Brazil"], 
    ["The U.S.A.", "Thailand", "Italy", "France"],
    ["Germany", "Argentina", "Brazil", "England"],
    ["Monaco", "Vatican City", "Tuvalu", "Liechtenstein"],
    ["Nepal", "India", "Bangladesh", "Pakistan"],
    ["Mexico", "France", "Italy", "China"],
    ["Russia", "Canada", "Indonesia", "Greenland"]
  ],

  roundGIFs: ["assets/images/denmark.gif",
    "assets/images/ethiopia.gif",
    "assets/images/france.gif",
    "assets/images/brazil.gif",
    "assets/images/vaticancity.gif",
    "assets/images/nepal.gif",
    "assets/images/italy.gif",
    "assets/images/canada.gif",
  ],

  correctResponses: ["Denmark", "Ethiopia", "France", "Brazil", "Vatican City",
    "Nepal", "Italy", "Canada"
  ],

  resetGame: $('#reset').on('click', function() {
    $('#reset').toggle(false);
    $('#results-list').toggle(false);
    triviaGame.timeAllotted = 30;
    triviaGame.answersCorrect = 0;
    triviaGame.answersIncorrect = 0;
    triviaGame.unanswered = 0;
    triviaGame.currentRound = 0;
    triviaGame.startGame();
  }),

  startGame: function() {
    $('#reset').toggle(false);
    $('#results-list').toggle(false);
    $('.answer').toggle(true);
    $('#question-div').toggle(true);
    $('#start-button').toggle(false);
    var startingTime = triviaGame.timeConverter(triviaGame.timeAllotted);
    $('#time-remaining').html("<h2>" + "Time Remaining: " + startingTime + "</h2>");
    triviaGame.selectQuestion();
    triviaGame.enableAnswer;
    intervalID = setInterval(triviaGame.playQuestion, 1000);
  },

  stopClock: function() {
    clearInterval(intervalID);
  },

  rewindClock: function() {
    //MAKE SURE THIS MATCHES THE TIME ALLOTTED IN THE BEGINNING OF THE GAME!!
    triviaGame.timeAllotted = 30;
    var startingTime = triviaGame.timeConverter(triviaGame.timeAllotted);
    $('#time-remaining').html("<h2>" + "Time Remaining: " + startingTime + "</h2>");
    intervalID = setInterval(triviaGame.playQuestion, 1000);
  },

  playQuestion: function() {

    triviaGame.timeAllotted--;
    var currentTime = triviaGame.timeConverter(triviaGame.timeAllotted);
    $("#time-remaining").html("<h2>" + "Time Remaining: " + currentTime + "</h2>");

    if (currentTime === "00:00") {
      triviaGame.stopClock();
      triviaGame.displayOutOfTime();
    }

  },

  selectQuestion: function() {
    $('.answer').toggle(true);
    $('#question-div').toggle(true);
    $('.feedback').toggle(false);
    var round = triviaGame.currentRound;
    $('.current-question').html("<h2>" + triviaGame.questions[round] + "</h2>");
    $('#answer1').html("<h3>" + triviaGame.answers[round][0] + "</h3>");
    $('#answer2').html("<h3>" + triviaGame.answers[round][1] + "</h3>");
    $('#answer3').html("<h3>" + triviaGame.answers[round][2] + "</h3>");
    $('#answer4').html("<h3>" + triviaGame.answers[round][3] + "</h3>");
  },

  enableAnswer: $('.answer').on("click", function() {
    var round = triviaGame.currentRound;
    var response = $(event.target).text();
    if (response === triviaGame.correctResponses[round]) {
      triviaGame.displayCorrect();
    }
    else if (response !== triviaGame.correctResponses[round]) {
      triviaGame.displayIncorrect();
    }
  }),

  stopProcess: function () {
    triviaGame.stopClock();
    clearTimeout(triviaGame.rewindClock);
    clearTimeout(triviaGame.selectQuestion);
    clearTimeout(triviaGame.enableAnswer);
    clearInterval(intervalID);
    triviaGame.displayWinScreen();
  },

  displayCorrect: function() {
    $('.answer').toggle(false);
    $('#question-div').toggle(false);
    $('.feedback').empty();
    $('.feedback').toggle(true);
    $('#feedback1').text('Correct!');
    var round = triviaGame.currentRound;
    $('#GIF').html('<img src=' + '"' + triviaGame.roundGIFs[round] + '"' + ">");
    triviaGame.stopClock();
    triviaGame.currentRound++;
    triviaGame.answersCorrect++;
    if (triviaGame.currentRound < triviaGame.questions.length) {
      setTimeout(triviaGame.rewindClock, 7000);
      setTimeout(triviaGame.selectQuestion, 7000);
      setTimeout(triviaGame.enableAnswer, 7000);
    }
    else {
      setTimeout(triviaGame.stopProcess, 7000);
    };
  },

  displayIncorrect: function() {
    $('.answer').toggle(false);
    $('#question-div').toggle(false);
    $('.feedback').empty();
    $('.feedback').toggle(true);
    $('#feedback1').text('Bummer...not quite right!');
    var round = triviaGame.currentRound;
    $('#feedback2').html('The correct answer was: ' 
      + triviaGame.correctResponses[round]);
    $('#GIF').html('<img src=' + '"' + triviaGame.roundGIFs[round] + '"' + ">");    
    triviaGame.stopClock();
    triviaGame.currentRound++;
    triviaGame.answersIncorrect++;
    if (triviaGame.currentRound < triviaGame.questions.length) {
      setTimeout(triviaGame.rewindClock, 7000);
      setTimeout(triviaGame.selectQuestion, 7000);
      setTimeout(triviaGame.enableAnswer, 7000);
    }
    else {
      setTimeout(triviaGame.stopProcess, 7000);
    };
  },

  displayOutOfTime: function() {
    $('.answer').toggle(false);
    $('#question-div').toggle(false);
    $('.feedback').empty();
    $('.feedback').toggle(true);
    $('#feedback1').text('Out of time!!');
    var round = triviaGame.currentRound;
    $('#feedback2').html('The correct answer was: ' 
      + triviaGame.correctResponses[round]);
    $('#GIF').html('<img src=' + '"' + triviaGame.roundGIFs[round] + '"' + ">");
    triviaGame.currentRound++;
    triviaGame.unanswered++;
    if (triviaGame.currentRound < triviaGame.questions.length) {
      setTimeout(triviaGame.rewindClock, 7000);
      setTimeout(triviaGame.selectQuestion, 7000);
      setTimeout(triviaGame.enableAnswer, 7000);
    }
    else {
      setTimeout(triviaGame.stopProcess, 7000);
    };
  },

  displayWinScreen: function() {
    $('.answer').toggle(false);
    $('#question-div').toggle(false);
    $('.feedback').toggle(false);
    $('#results-list').toggle(true);
    $('#reset').toggle(true);
    $('#reset').text("Play Again?");
    $('#result-header').text("All done! Here's how you did:");
    $('#answers-correct').html("<h2>" + "Correct: "
      + triviaGame.answersCorrect + "</h2>");
    $('#answers-incorrect').html("<h2>" + "Incorrect: "
      + triviaGame.answersIncorrect + "</h2>");
    $('#unanswered').html("<h2>" + "Unanswered: "
      + triviaGame.unanswered + "</h2>");
  },

  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};
