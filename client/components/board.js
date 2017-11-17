import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store, { setConfig, setHexagons } from '../store';
import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import configs from '../configurations';
import firebase from '../firebase';

import '../css/_board.scss';

class Board extends Component {
  constructor(props) {
    super(props);
    const config = configs['rectangle'];
    const generator = GridGenerator.getGenerator(config.map);
    const hexagons = generator.apply(this, config.mapProps);
    hexagons.forEach(hex => {
      hex.id = `${hex.q},${hex.r},${hex.s}`;
      if (!hex.owner) hex.owner = '';
      if (!hex.moves) hex.moves = 0;
    });
    this.state = { hexagons, config };
  }

  componentDidMount() {
    const { hexagons, config } = this.state;
    store.dispatch(setHexagons(hexagons));
    store.dispatch(setConfig(config));

    // adds id's of coordinates to the polygon from a dummy div because you can't add it directly then deletes dummy div from dom
    const polyIdDivs = [...document.getElementsByClassName('poly-id')];
    polyIdDivs.forEach(polyIdDiv => {
      const poly = polyIdDiv.parentNode.firstChild;
      poly.id = polyIdDiv.id;
      polyIdDiv.remove();
    });
  }

  render() {
    const { hexagons, config } = this.state;
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
                  <div className="poly-id" id={`${hex.q},${hex.r},${hex.s}`}></div>
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
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    hexagons: state.board.hexagons,
    config: state.board.config
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Board);

/**
 * PROP TYPES
 */
Board.propTypes = {

}
