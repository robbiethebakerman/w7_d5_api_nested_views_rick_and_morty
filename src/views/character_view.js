const CharacterView = function (character, container) {
  this.character = character;
  this.container = container;
};

CharacterView.prototype.renderContainer = function () {
  const characterContainer = this.createDiv('character-container');
  const nameButton = this.createButton(this.character.name, 'character-name-button');
  const characterView = this.createDiv('character-view');
  characterContainer.appendChild(nameButton);
  characterContainer.appendChild(characterView);
  nameButton.addEventListener('click', event => this.renderCharacter(characterView));
  this.container.appendChild(characterContainer);
};

CharacterView.prototype.renderCharacter = function (container) {
  container.innerHTML = '';
  const collapseButton = this.createButton('Collapse character', 'collape-character-button');
  const name = this.createTextElement('h2', this.character.name, 'character-name');
  const image = this.createImage();
  const infoList = this.createInfoList();
  collapseButton.addEventListener('click', event => container.innerHTML = '');
  container.appendChild(collapseButton);
  container.appendChild(name);
  container.appendChild(image);
  container.appendChild(infoList);
};

CharacterView.prototype.createDiv = function (cssClass) {
  const div = document.createElement('div');
  div.classList.add(cssClass);
  return div;
};

CharacterView.prototype.createTextElement = function (type, textContent, cssClass) {
  const element = document.createElement(type);
  element.textContent = textContent;
  element.classList.add(cssClass);
  return element;
};

CharacterView.prototype.createButton = function (textContent, cssClass) {
  const button = document.createElement('button');
  button.textContent = textContent;
  button.classList.add(cssClass);
  return button;
};

CharacterView.prototype.createInfoList = function () {
  const list = document.createElement('ul');
  list.classList.add('character-info-list');
  const status = this.createTextElement('li', `Status: ${this.character.status}`, 'character-info-list-status');
  const species = this.createTextElement('li', `Species: ${this.character.species}`, 'character-info-list-species');
  const type = this.createTextElement('li', `Type: ${this.character.type}`, 'character-info-list-type');
  const gender = this.createTextElement('li', `Gender: ${this.character.gender}`, 'character-info-list-gender');
  const origin = this.createTextElement('li', `Origin: ${this.character.origin.name}`, 'character-info-list-origin');
  const location = this.createTextElement('li', `Current Location: ${this.character.location.name}`, 'character-info-list-location');
  list.appendChild(status);
  list.appendChild(species);
  list.appendChild(type);
  list.appendChild(gender);
  list.appendChild(origin);
  list.appendChild(location);
  return list;
};

CharacterView.prototype.createImage = function () {
  const image = document.createElement('img');
  image.src = this.character.image;
  image.alt = `Image of ${this.character.name}`;
  image.classList.add('character-image');
  return image;
};

module.exports = CharacterView;
