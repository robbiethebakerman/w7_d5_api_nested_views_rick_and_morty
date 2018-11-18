const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Characters = function () {
 this.characters = [];
 this.numberOfPages = 1;
};

///////////////////////////////////////////////////////
// Commented out below to limit api requests for now //
///////////////////////////////////////////////////////

Characters.prototype.getAllCharacters = function () {
  const requestPages = new RequestHelper(`https://rickandmortyapi.com/api/character`);

  requestPages.get((data) => {

    this.numberOfPages += data.info.pages;
    // console.log('numberOfPages from getAllCharacters after api request', this.numberOfPages);

    const pageRange = [...Array(this.numberOfPages).keys()];
    pageRange.shift();
    // console.log('pageRange', pageRange);

    this.characters = [];

    for (page of pageRange) {
      const requestCharacters = new RequestHelper(`https://rickandmortyapi.com/api/character/?page=${page}`);
      requestCharacters.get((data) => {
        for (character of data.results) {
          this.characters.push(character);
        };
        PubSub.publish('Characters:characters-ready', this.characters);
      });
    };

  });

  // console.log('characters data from within characters model bindEvents', this.characters);
};

/////////////////////////////////////////////////////////////
// Shorter version (20 results only) to limit api requests //
/////////////////////////////////////////////////////////////

Characters.prototype.bindEvents = function () {
  this.getAllCharacters();

  PubSub.subscribe('SpeciesSelectView:selected-species-name-ready', (event) => {
    this.getBySpecies(event.detail);
  });
};

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

Characters.prototype.getBySpecies = function (speciesName) {
  const request = new RequestHelper(`https://rickandmortyapi.com/api/character/?species=${speciesName}`);
  request.get((data) => {
    this.characters = data.results;
    PubSub.publish('Characters:characters-by-species-ready', this.characters);
    console.log('characters by species from char model.getBySpecies', this.characters);
  });
};

// Characters.prototype.getAllCharacters = function () {
//   const requestPages = new RequestHelper(`https://rickandmortyapi.com/api/character`);
//
//   requestPages.get((data) => {
//
//     this.numberOfPages += data.info.pages;
//     // console.log('numberOfPages from getAllCharacters after api request', this.numberOfPages);
//
//     const pageRange = [...Array(this.numberOfPages).keys()];
//     pageRange.shift();
//     // console.log('pageRange', pageRange);
//
//     this.characters = [];
//
//     for (page of pageRange) {
//       const requestCharacters = new RequestHelper(`https://rickandmortyapi.com/api/character/?page=${page}`);
//       requestCharacters.get((data) => {
//         for (character of data.results) {
//           this.characters.push(character);
//         };
//         PubSub.publish('Characters:characters-ready', this.characters);
//       });
//     };
//
//   });

  // console.log('characters data from within characters model bindEvents', this.characters);
};

Characters.prototype.getSpeciesNames = function (characters) {
  const species = characters.map(character => character.species);
  const speciesFiltered = species.filter((species, index, array) => {
    return array.indexOf(species) === index;
  });
  return speciesFiltered;
};

module.exports = Characters;
