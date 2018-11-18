const PubSub = require('../helpers/pub_sub.js');
const CharacterView = require('./character_view.js');

const CharacterListView = function (container) {
  this.container = container;
  this.characters = [];
};

CharacterListView.prototype.bindEvents = function () {
  PubSub.subscribe('Characters:characters-ready', (event) => {
    this.characters = event.detail;
    this.render();
  });

  PubSub.subscribe('Characters:characters-by-species-ready', (event) => {
    this.characters = event.detail;
    this.render();
  });
};

CharacterListView.prototype.render = function () {
  this.container.innerHTML = '';
  for (character of this.characters) {
    const characterView = new CharacterView(character, this.container);
    characterView.render();
  };
};

module.exports = CharacterListView;
