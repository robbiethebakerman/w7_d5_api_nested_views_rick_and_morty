const PubSub = require('../helpers/pub_sub.js');
const CharacterView = require('./character_view.js');

const CharacterListView = function (container) {
  this.container = container;
  this.characters = [];
};

CharacterListView.prototype.bindEvents = function () {
  PubSub.subscribe('Characters:characters-ready', (event) => {
    this.characters = event.detail;
    console.log('CharacterListView.characters from list view.bindEvents', this.characters);
    this.render();
    console.log('list view should be rendered now');
  });
};

CharacterListView.prototype.render = function () {
  console.log('CharacterListView.characters from list view.render', this.characters);
  for (character of this.characters) {
    const characterView = new CharacterView(character, this.container);
    characterView.render();
  };
};

module.exports = CharacterListView;
