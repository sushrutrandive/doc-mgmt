import React from 'react';
import { shallow } from 'enzyme';
import FileUpload from './FileUpload';

describe('<FileUpload />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<FileUpload />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
