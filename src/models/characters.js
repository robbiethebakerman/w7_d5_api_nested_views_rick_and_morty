const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Characters = function () {
 this.data = [];
};

///////////////////////////////////////////////////////
// Commented out below to limit api requests for now //
///////////////////////////////////////////////////////

Characters.prototype.bindEvents = function () {
  const pageRange = [...Array(26).keys()];
  pageRange.shift();
  console.log('pageRange', pageRange);
  for (page of pageRange) {
    const request = new RequestHelper(`https://rickandmortyapi.com/api/character/?page=${page}`);
    request.get((data) => {
      for (character of data.results) {
        this.data.push(character);
      };
      PubSub.publish('Characters:characters-ready', this.data);
    });
  };

  // for (page of pageRange) {
  //   const request = new RequestHelper(`https://rickandmortyapi.com/api/character/?page=${page}`);
  //   request.get((data) => {
  //     for (character of data.results) {
  //       this.data.push(character);
  //     };
  //     PubSub.publish('Characters:characters-ready', this.data);
  //   });
  // };

  // const requestloop = new RequestHelper('https://rickandmortyapi.com/api/character');
  // requestloop.get((data) => {
  //   for (page of pageRange) {
  //     requestloop.url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  //     requestloop.get((data) => {
  //       for (character of data.results) {
  //         this.data.push(character);
  //       };
  //     });
  //   };
  //   PubSub.publish('Characters:characters-ready', this.data);
  // });

  console.log('characters data from within characters model bindEvents', this.data);
};


// Characters.prototype.bindEvents = function () {
//   const request = new RequestHelper(`https://rickandmortyapi.com/api/character`);
//   request.get((data) => {
//     for (character of data.results) {
//       this.data.push(character);
//     };
//     PubSub.publish('Characters:characters-ready', this.data);
//   });
// };

module.exports = Characters;
