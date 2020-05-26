import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../header';
import BrandLogo from '../../assets/images/logo.svg';

describe('Header', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Header
          siteTitle="Default Starter"
          brandLogo={BrandLogo}
          params={{ category: 'test' }}
          onNavigate={() => {}}
        />
      )
      .toJSON();
    // expect(tree).toMatchSnapshot();
    console.log(tree);
  });
});
