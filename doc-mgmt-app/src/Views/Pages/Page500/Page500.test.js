import React from 'react';
import { shallow } from 'enzyme';
import Page500 from './Page500';

describe('<Page500 />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Page500 />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
