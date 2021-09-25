import React from 'react';
import { shallow } from 'enzyme';
import AppHeaderContent from './AppHeaderContent';

describe('<AppHeaderContent />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<AppHeaderContent />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
