import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Component } from '../';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('Component', () => {
  let componentvar;

  beforeEach(() => {
    componentvar = shallow(<Component />);
  });

  it('renders the Component', () => {
    expect(componentvar.find('h1').text()).to.be.equal('sample');
  });
});
