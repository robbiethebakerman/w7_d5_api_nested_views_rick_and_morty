const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Characters = function () {
 this.characters = [];
};

Characters.prototype.bindEvents = function () {
  this.getAllCharacters();

  PubSub.subscribe('SpeciesSelectView:selected-species-name-ready', (event) => {
    this.getBySpecies(event.detail);
  });
};

Characters.prototype.getAllCharacters = function () {
  const requestPages = new RequestHelper(`https://rickandmortyapi.com/api/character`);
  requestPages.get((data) => {
    const pageRange = this.getPages(data);
    this.characters = [];
    for (page of pageRange) {
      const requestCharacters = new RequestHelper(`https://rickandmortyapi.com/api/character/?page=${page}`);
      requestCharacters.get(data => this.publishAllCharacters(data));
    };
  });
};

Characters.prototype.getBySpecies = function (speciesName) {
  const requestPages = new RequestHelper(`https://rickandmortyapi.com/api/character/?species=${speciesName}`);
  requestPages.get((data) => {
    const pageRange = this.getPages(data);
    this.characters = [];
    for (page of pageRange) {
      const requestCharacters = new RequestHelper(`https://rickandmortyapi.com/api/character/?page=${page}&species=${speciesName}`);
      requestCharacters.get(data => this.publishCharactersBySpecies(data));
    };
  });
};

Characters.prototype.getSpeciesNames = function (characters) {
  const species = characters.map(character => character.species);
  const speciesFiltered = species.filter((species, index, array) => {
    return array.indexOf(species) === index;
  });
  return speciesFiltered;
};

Characters.prototype.getPages = function (data) {
  const numberOfPages = data.info.pages + 1;
  const pageRange = [...Array(numberOfPages).keys()];
  pageRange.shift();
  return pageRange;
};

Characters.prototype.publishCharactersBySpecies = function (data) {
    data.results.forEach(character => this.characters.push(character));
    PubSub.publish('Characters:characters-by-species-ready', this.characters);
};

Characters.prototype.publishAllCharacters = function (data) {
  data.results.forEach(character => this.characters.push(character));
  PubSub.publish('Characters:characters-ready', this.characters);
  const speciesList = this.getSpeciesNames(this.characters);
  PubSub.publish('Characters:species-ready', speciesList);
};

/////////////////////////////////////////////////////////////
// Shorter version (20 results only) to limit api requests //
/////////////////////////////////////////////////////////////

// Characters.prototype.getAllCharacters = function () {
//   const request = new RequestHelper(`https://rickandmortyapi.com/api/character`);
//   request.get((data) => {
//     this.characters = data.results;
//     PubSub.publish('Characters:characters-ready', this.characters);
//     const speciesList = this.getSpeciesNames(this.characters);
//     PubSub.publish('Characters:species-ready', speciesList);
//     // console.log('speciesList from char model.bindEvents.get', speciesList);
//   });
// };

// Characters.prototype.getBySpecies = function (speciesName) {
//   const request = new RequestHelper(`https://rickandmortyapi.com/api/character/?species=${speciesName}`);
//   request.get((data) => {
//     this.characters = data.results;
//     PubSub.publish('Characters:characters-by-species-ready', this.characters);
//     console.log('characters by species from char model.getBySpecies', this.characters);
//   });
// };

module.exports = Characters;
