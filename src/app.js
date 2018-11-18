const Characters = require('./models/characters.js');
const SpeciesSelectView = require('./views/species_select_view.js');
const CharacterListView = require('./views/character_list_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript loaded');

  const listViewContainer = document.querySelector('.character-list-view');
  const characterListView = new CharacterListView(listViewContainer);
  characterListView.bindEvents();

  const characters = new Characters();
  characters.bindEvents();

  const speciesSelectContainer = document.querySelector('.species-select');
  const speciesSelectView = new SpeciesSelectView(speciesSelectContainer);
  speciesSelectView.bindEvents();

});
