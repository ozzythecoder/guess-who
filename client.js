$( document ).ready(onReady);

let correctGuess; // initializing global variable
let lastAnswer = {} // initializing global variable

function onReady() {
  renderProfilePictures();

  gameInit();

  $( '#pictures' ).on('click', 'img', evaluateGuess)
}

function renderProfilePictures() {
  people.forEach( (person) => {
    $('#pictures').append(`
    <img src="https://github.com/${person.githubUsername}.png?size=200" data-person="${person.name}" alt="Profile image of ${person.name}">
    `)
  })
}

function gameInit() {
  // set a random person's name as global correct value
  correctGuess = getRandomPerson();
  
  console.log(correctGuess);
  console.log('the last answer was', lastAnswer);
  
  $('#instructions').empty();
  // prompt the player to click the correct picture
  $('#instructions').append(`
    <p>Click on the picture of ${correctGuess.name}:</p>
  `)
}

function evaluateGuess() {

  // get data of person who was clicked
  let thisGuess = $( this ).data().person;

  console.log('in evaluateGuess');
  console.log('correct person is', correctGuess.name);
  console.log('person clicked on is', thisGuess);

  if (thisGuess == correctGuess.name) { 
    gameWin();
  } else {
    gameLoss();
  }
}

function gameWin() {

  clearFeedback();

  $( '#feedback' ).addClass('correct-guess') // turns text green
  $( '#feedback' ).append(`
    <p>That's correct!!</p>
  `)

  // set correct answer as the last answer, so it won't be immediately selected again
  lastAnswer = correctGuess;
  
  gameInit();
}

function gameLoss() {

  clearFeedback();

  $( '#feedback' ).removeClass('correct-guess'); // turns text red
  $( '#feedback' ).append(`
    <p>Wrong! Try again.</p>
  `);
}

function clearFeedback() {
  $( '#feedback' ).empty();
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