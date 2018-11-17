const Characters = require('./models/characters.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript loaded');

  const characters = new Characters();
  characters.bindEvents();
});
