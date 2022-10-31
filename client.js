$( document ).ready(onReady);

function onReady() {
  showProfilePictures();
}

function showProfilePictures() {
  people.forEach( (person) => {
    $('#pictures').append(`
    <img src="https://github.com/${person.githubUsername}.png?size=250" alt="Profile image of ${person.name}">
    `)
  })
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}

const getRandomPerson = () => {
  return people[randomNumber(1, people.length) - 1]
}