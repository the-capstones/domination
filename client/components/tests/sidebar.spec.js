import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Sidebar } from '../sidebar';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('Sidebar', () => {
  let sidebar;

  const props = {
    match: {
      params: {
        boardId: 'gameIdOne'
      }
    },
    currentPhase: 'allotment',
    currentPlayer: 'playerOne',
    playerOrder: ['playerOne', 'playerTwo'],
    allotmentRate: 3,
    allotmentPointsPerTurn: { 'playerOne': 3, 'playerTwo': 3 },
    allotmentLeft: 3,
    percentVoidSpaces: 20,
    boardLayout: {},
    hexagons: {},
    gameSettings: 'default',
    status: 'waiting',
    selectedHex: '',
    prevSelectedHex: '',
    playerClasses: {},
    landmarksFreq: 3,
    landmarksValue: 2,
  }

  beforeEach(() => {
    sidebar = shallow(<Sidebar {...props} />);
  });

  it('renders the Sidebar', () => {
    expect(sidebar.find('h1').first().text()).to.be.equal('DOMINATION');
  });
});
