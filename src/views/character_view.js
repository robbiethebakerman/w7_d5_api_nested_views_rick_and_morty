const CharacterView = function (character, container) {
  this.character = character;
  this.container = container;
};

CharacterView.prototype.render = function () {
  const divWrapper = document.createElement('div');
  divWrapper.classList.add('character-view');
  // console.log('divWrapper from within char view', divWrapper);

  const name = this.createTextElement('h2', this.character.name, 'character-name');
  divWrapper.appendChild(name);

  this.container.appendChild(divWrapper);
};

CharacterView.prototype.createTextElement = function (type, textContent, cssClass) {
  const element = document.createElement(type);
  element.textContent = textContent;
  element.classList.add(cssClass);
  return element;
};

CharacterView.prototype.createInfoList = function () {
  const list = document.createElement('ul');
  list.classList.add('character-info-list');
  const height = this.createTextElement('li', `Height: ${this.character.height}`, 'character-info-list-height');
  const meaning = this.createTextElement('li', `Meaning of "${this.character.name}": ${this.character.meaning}`, 'character-info-list-meaning');
  list.appendChild(height);
  list.appendChild(meaning);
  return list;
};

module.exports = CharacterView;
