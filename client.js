$( document ).ready(onReady);
let correctGuess;

function onReady() {
  renderProfilePictures();
  
  correctGuess = getRandomPerson(); // set a random person's name as global correct value
  console.log(correctGuess);
  gameInit();

  $( '#pictures' ).on('click', 'img', evaluateGuess)
}

function renderProfilePictures() {
  people.forEach( (person) => {
    $('#pictures').append(`
    <img src="https://github.com/${person.githubUsername}.png?size=250" data-person="${person.name}" alt="Profile image of ${person.name}">
    `)
  })
}

function gameInit() {
  // prompt the player to click a picture
  $('#feedback').append(`
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
  console.log('correct guess!');
}

function gameLoss() {
  console.log('oops! learn your teacher\'s names!');
  $( '#feedback' ).empty();
  $( '#feedback' ).append(`
    <p>Wrong! Try again.</p>
  `);
  gameInit();
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}

function getRandomPerson() {
  return people[randomNumber(1, people.length) - 1]
}