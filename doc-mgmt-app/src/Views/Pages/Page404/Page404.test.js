import React from 'react';
import { shallow } from 'enzyme';
import Page404 from './Page404';

describe('<Page404 />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Page404 />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
