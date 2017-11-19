import React from 'react';
import { HexGrid, Layout, Hexagon, Text, HexUtils } from 'react-hexgrid';
import { hexagons, config } from './gridGenerator'

import '../css/_board.scss';

export const Board = () => {

  const polyIdDivs = [...document.getElementsByClassName('poly-id')];
  polyIdDivs.forEach(polyIdDiv => {
    const poly = polyIdDiv.parentNode.firstChild;
    poly.id = polyIdDiv.id;
    polyIdDiv.remove();
  });

  const layout = config.layout;
  const size = { x: layout.width, y: layout.height };

  return (
    <div className="board">
      <HexGrid width={config.width} height={config.height}>
        <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
          {
            hexagons.map((hex, i) => (
              <Hexagon
                key={i}
                q={hex.q}
                r={hex.r}
                s={hex.s}
              >
                <div className="poly-id" id={`${hex.q},${hex.r},${hex.s}`} />
                <Text>{HexUtils.getID(hex)}</Text>
              </Hexagon>
            ))
          }
        </Layout>
        {/*<Pattern id="img1" link="favicon.ico" />*/ /*fill="img1"*/}
      </HexGrid>
    </div>
  )
}

export default Board
