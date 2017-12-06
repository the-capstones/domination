import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Sidebar } from '../';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('Sidebar', () => {
  let sidebar;

  beforeEach(() => {
    sidebar = shallow(<Sidebar />);
  });

  it('renders the Sidebar', () => {
    expect(sidebar.find('h1').text()).to.be.equal('DOMINATION');
  });
});
