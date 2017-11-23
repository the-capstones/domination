const { GridGenerator } = require('react-hexgrid');
const configs = require('../../client/configurations');

const config = configs['rectangle'];
const generator = GridGenerator.getGenerator(config.map);
const hexagons = generator.apply(this, config.mapProps);

module.exports = {
  hexagons
}
