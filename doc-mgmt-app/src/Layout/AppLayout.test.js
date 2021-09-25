import React from 'react';
import { shallow } from 'enzyme';
import AppLayout from './AppLayout';

describe('<AppLayout />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<AppLayout />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
