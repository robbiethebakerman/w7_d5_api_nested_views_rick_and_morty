const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Characters = function () {
 this.data = [];
};

Characters.prototype.bindEvents = function () {
  const pageRange = [...Array(26).keys()];
  pageRange.shift();
  console.log('pageRange', pageRange);
  for (page of pageRange) {
    const request = new Request(`https://rickandmortyapi.com/api/character/?page=${page}`);
    request.get()
    .then((data) => {
      for (character of data.results) {
        this.data.push(character);
      };
    })
    .catch((err) => {
      return
    });
  };
  PubSub.publish('Characters:characters-ready', this.data);
  console.log('characters data from within characters model bindEvents', this.data);
};

module.exports = Characters;
