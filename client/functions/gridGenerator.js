import { GridGenerator } from 'react-hexgrid';
import configs from '../configurations';

export const config = configs['rectangle'];
export const generator = GridGenerator.getGenerator(config.map);
export const hexagons = generator.apply(this, config.mapProps);

export const addIdToHexes = () => {
  const polyIdDivs = [...document.getElementsByClassName('poly-id')];
  polyIdDivs.forEach(polyIdDiv => {
    const poly = polyIdDiv.parentNode.firstChild;
    poly.id = polyIdDiv.id;
    polyIdDiv.remove();
  });
};

export const spriteGenerator = (theme, isArray = false) => {
  const grassTiles = [];
  for (let i = 1; i <= 6; i++) {
    const num = i < 10 ? '0' + i : i + '';
    grassTiles.push(`grass_${num}`)
  }
  const themes = {
    medieval: {
      disabled: 'water_00',
      landmarks: [
        'medieval_archery',
        'medieval_archway',
        'medieval_blacksmith',
        'medieval_cabin',
        'medieval_church',
        'medieval_farm',
        'medieval_house',
        'medieval_largeCastle',
        'medieval_lumber',
        'medieval_mine',
        'medieval_openCastle',
        'medieval_ruins',
        'medieval_smallCastle',
        'medieval_tower',
        'medieval_windmill',
      ],
      tiles: grassTiles,
    }
  }
  const themeObj = themes[theme];

  return isArray
    ? [theme, themeObj.landmarks, [themeObj.disabled, ...themeObj.tiles]]
    : themeObj;
};
