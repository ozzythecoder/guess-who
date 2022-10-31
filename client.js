$( document ).ready(onReady);

function onReady() {
  renderProfilePictures();

  let correctGuess = getRandomPerson() // choose a random person's name
  gameInit(correctGuess);

  $( '#pictures' ).on('click', 'img', evaluateGuess)
}

function renderProfilePictures() {
  people.forEach( (person) => {
    $('#pictures').append(`
    <img src="https://github.com/${person.githubUsername}.png?size=250" data-person="${person.name} alt="Profile image of ${person.name}">
    `)
  })
}

function gameInit(person) {
  // prompt the player to click a picture
  $('#feedback').append(`
    <p>Click on the picture of ${person.name}:</p>
  `)
}

function evaluateGuess() {
  
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}

const getRandomPerson = () => {
  return people[randomNumber(1, people.length) - 1]
}