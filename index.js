const STORE = [
  {
    question: "what is a 'beatmaker' also known as? ",
    answers: ['a producer', 'a writer', 'a co-writer', 'a stylist'],
    correctAnswer: 'a producer'
  },
  {
    question: "what does DAW stand for?",
    answers: ['digital action worker', 'digital audio workstation', 'digital audio workforce', 'dynamic auxilarry work'],
    correctAnswer: 'digital audio workstation'
  },
  {
    question: "in your daw, where would you go to mix the levels of your tracks?",
    answers: ['piano roll', 'sound kit', 'mixer', 'channel rack'],
    correctAnswer: 'mixer'
  },
  {
    question: "what equipment is used to keep your beat synchronized",
    answers: ['metronome', 'touch controller', 'piller', '808 slides'],
    correctAnswer: 'metronome'
  },
  {
    question: "what could you add to one of your sounds to give it a 'echo' effect",
    answers: ['delay', 'limiter', 'condenser', 'reverb'],
    correctAnswer: 'reverb'
  },
  {
    question: "how many tracks must you have to do for your beat is considered finished?",
    answers: ['1 - 10', '11-20', '21-35', 'There is no certain amount of tracks required for your beat to be considered finished'],
    correctAnswer: 'There is no certain amount of tracks required for your beat to be considered finished'
  },
  {
    question: "If you want to send a beat to producer to collaborate with, what format would you send the file as?",
    answers: ['jpeg', 'flp', 'psd', 'gif'],
    correctAnswer: 'flp'
  }

];

let questionNumber = 0;
let scoreNumber = 0;

function createQuestion() {
  if (questionNumber < STORE.length) {
    return questionTemplate(questionNumber);
  } else {
    $('.questionPage').hide();
    showFinalScore();
    $('.questionNumber').text(7);
  }
}

function questionTemplate(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="results" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="btn-submit btn">S U B M I T</button > `).appendTo(fieldSelector);
  return formMaker;
}

function startTheQuiz() {
  $('.altPage').hide();
  $('.startPage').on('click', '.btn-start', function (event)
  {
    $('.startPage').hide();
    $('.questionPage').show();
    $('#res').show();
    $('.questionNumber').text(1);
    $('.questionPage').prepend(createQuestion());
  });
}

function handleNextQuestion() {
  $('.fullPage').on('click', '.btn-next', function (event)
  {
    $('.altPage').hide();
    $('.questionPage').show();
    updateQuestionNumber();
    $('.questionPage form').replaceWith(createQuestion());
  });
}

function handleSubmitAnswer() {
  $('.fullPage').on('submit', function(event){
    event.preventDefault();
    $('.altPage').hide();
    $('.feedbackPage').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      handleIncorrectAnswer();
    }
  });
}

function correctAnswer() {
  $('.feedbackPage').html(
    `<h2>That is correct!</h2>
     <img src="images/correct.jpg" alt="happy metro boomin" class="img-correct" max-width="275px">
     <button type="button" class="btn-next btn">N E X T</button>`
  );
  updateScoreNumber();
}

function handleIncorrectAnswer() {
  $('.feedbackPage').html(
    `<h2>That's incorrect ...</h2>
     <img src="images/incorrect.jpg" alt="drake laughing" class="img-incorrect" max-width="275px">
     <p class="paragraph">The correct answer is:</p>
     <p class="paragraph">${STORE[questionNumber].correctAnswer}</p>
     <button type="button" class="btn-next btn">N E X T</button>`
  );
}

function updateScoreNumber() {
  scoreNumber++;
  $('.scoreNumber').text(scoreNumber);
}

function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}


function hideScoreAndQuestion() {
  $('#res').hide();
}

function resetTheScores() {
  questionNumber = 0;
  scoreNumber = 0;
  $('.questionNumber').text(0);
  $('.scoreNumber').text(0);
}

function showFinalScore() {
  $('.scorePage').show();
  hideScoreAndQuestion();

  const greatJob = [
    'Great job!',
    'images/congratulations.jpg',
    'travis scott mic stand meme'
  ];

  const badJob = [
    'Do you even music theory ...',
    'images/sixOrLessCorrect.jpg',
    'lil uzi vert'
  ];

  if (scoreNumber > 5) {
    array = greatJob;
  } else {
    array = badJob;
  }
  return $('.scorePage').html(
    `<h2>${array[0]}</h2>
      <img src="${array[1]}" alt="${array[2]}" class="img-result">
        <h3>Your score is ${scoreNumber} / 7</h3>
        <button type="submit" class="btn-restart btn">R E S T A R T</button>`
  );
}

function handleRestartQuiz() {
  $('.fullPage').on('click', '.btn-restart', function 
  (event) {
    event.preventDefault();
    resetTheScores();
    hideScoreAndQuestion();
    $('.altPage').hide();
    $('.startPage').show();
  });
}

function generateQuiz() {
  startTheQuiz();
  createQuestion();
  handleSubmitAnswer();
  handleNextQuestion();
  handleRestartQuiz();
  hideScoreAndQuestion();
}

$(generateQuiz);