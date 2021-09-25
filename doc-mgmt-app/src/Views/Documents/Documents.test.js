import React from 'react';
import { shallow } from 'enzyme';
import Documents from './Documents';

describe('<Documents />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Documents />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
