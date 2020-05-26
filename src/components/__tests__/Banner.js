import React from 'react';
import renderer from 'react-test-renderer';

import Banner from '../Banner';

describe('Banner', () => {
  it('renders banner correctly', () => {
    const tree = renderer
      .create(
        <Banner
          title="Subscribe to our newsletter."
          content="Test content"
          buttonLabel="Subscribe"
          buttonAriaLabel="Button for subscribe"
          buttonAction={() => {
            return false;
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
