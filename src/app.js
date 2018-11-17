const Characters = require('./models/characters.js');
const SpeciesSelectView = require('./views/species_select_view.js');
const CharacterListView = require('./views/character_list_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript loaded');

  const characters = new Characters();
  characters.bindEvents();
  console.log('chracters data from app', characters.data);
});
