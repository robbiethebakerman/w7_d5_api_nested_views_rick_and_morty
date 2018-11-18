const PubSub = require('../helpers/pub_sub.js');

const SpeciesSelectView = function (selectElement) {
  this.selectElement = selectElement;
};

SpeciesSelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Characters:species-ready', (event) => {
    const speciesList = event.detail;
    this.populate(speciesList);
  });

  this.selectElement.addEventListener('change', (event) => {
    const selectedSpeciesName = event.target.value;
    PubSub.publish('SpeciesSelectView:selected-species-name-ready', selectedSpeciesName);
  });
};

SpeciesSelectView.prototype.populate = function (speciesList) {
  this.selectElement.innerHTML = '';
  for (species of speciesList) {
    this.addOption(species);
  };
};

SpeciesSelectView.prototype.addOption = function (species) {
  const option = document.createElement('option');
  option.value = species;
  option.textContent = species;
  option.classList.add('species-select-option');
  this.selectElement.appendChild(option);
};

module.exports = SpeciesSelectView;
