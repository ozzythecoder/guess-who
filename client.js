$( document ).ready(onReady);

let correctGuess; // initializing global variable
let lastAnswer = {} // initializing global variable
let streakCount = 0;

function onReady() {

  gameInit();

  // handle click of any image
  $( '#pictures' ).on('click', 'img', evaluateGuess)
}

function render() {

  // remove pictures
  $('#pictures').empty();

  // algorithm to shuffle the array (I guess it's called a Schwartzian transform?)
  let shuffledPeople = people
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  // render the pictures in new order
  shuffledPeople.forEach( (person) => {
    $('#pictures').append(`
    <img src="https://github.com/${person.githubUsername}.png?size=200" data-person="${person.name}" alt="Profile image of ${person.name}">
    `)
  })

  renderStreak();
}

function renderStreak() {
  // render streak counter
  $('#streak').empty();
  $('#streak').append(`
    <p>Streak: ${streakCount}</p>
  `)

  // special text if streak is greater than 10
  if (streakCount >= 10) {
    $('#streak').addClass('green');
  }
}

function gameInit() {
  render();
  
  // gets a random person's name and sets it as the answer
  correctGuess = getRandomPerson();
  
  // empty instructions field
  $('#instructions').empty();
  // prompt the player to click the correct picture
  $('#instructions').append(`
    <p>Click on the picture of <span id="name-to-guess">${correctGuess.name}</span>:</p>
  `)
}

function evaluateGuess() {
  // get data of person who was clicked
  let thisGuess = $( this ).data().person;

  if (thisGuess == correctGuess.name) { 
    gameWin();
  } else {
    gameLoss();
  }
}

function gameWin() {

  clearFeedback();

  // give positive feedback
  $( '#feedback' ).addClass('correct-guess') // turns text green
  $( '#feedback' ).removeClass('off') // restarts "blowup" animation
  $( '#feedback' ).append(`
    <p>That's correct! Play again?</p>
  `)

  // text animations
  setTimeout(() => {
    $( '#feedback' ).addClass('fade') }, 1000);
  setTimeout(() => {
    $( '#feedback' ).removeClass('correct-guess') }, 1500);
  // known issue: positive feedback will display with red text and no animation
  // if a second correct answer is clicked too quickly after the first.

  // set correct answer as the last answer, so it can't be randomly selected again immediately
  lastAnswer = correctGuess;
  
  // increase streak count
  streakCount++;

  // roll a new game
  gameInit();
}

function gameLoss() {

  // lose streak
  streakCount = 0;
  $('#streak').removeClass('green');
  renderStreak();

  clearFeedback();

  // give negative feedback
  $( '#feedback' ).removeClass('correct-guess'); // turns text red
  $( '#feedback' ).append(`
    <p>Wrong! Try again.</p>
  `);
}

function clearFeedback() {
  // clear feedback and remove animation classes
  $( '#feedback' ).empty();
  $( '#feedback' ).addClass('off');
  $( '#feedback' ).removeClass('fade');
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}

function getRandomPerson() {
  // get person at random index of array
  var newAnswer = people[randomNumber(0, people.length - 1)]
  
  // if selected person is the same as the last, get a new one
  return newAnswer.name == lastAnswer.name ? getRandomPerson() : newAnswer
}