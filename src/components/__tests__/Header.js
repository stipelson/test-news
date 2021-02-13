import React from 'react';

import Header, { sections } from '../Header';
import BrandLogo from '../../assets/images/logo.svg';

import { render, fireEvent } from '@testing-library/react';

describe('Header: render and actions', () => {
  const leftClick = { button: 0 };
  let onNavigateMock;

  beforeAll(() => {
    onNavigateMock = jest.fn();
  });

  it('renders correctly', () => {
    const { container } = render(
      <Header
        siteTitle="Default Starter"
        brandLogo={BrandLogo}
        params={{ category: 'test' }}
        onNavigate={onNavigateMock}
        menuNav
        userNav
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('onNavigateAction correctly', () => {
    const { getByText } = render(
      <Header
        siteTitle="Default Starter"
        brandLogo={BrandLogo}
        params={{ category: '240f6a12-b9d8-40a6-b1c6-a220e31d08de' }}
        onNavigate={onNavigateMock}
        menuNav
        userNav
      />
    );

    for (let index = 0; index < sections.length; index++) {
      const section = sections[index];
      const link = getByText(section.name);

      fireEvent.click(link, leftClick);

      // Verify payload
      expect(onNavigateMock).toHaveBeenLastCalledWith(section.topicId);
    }

    // Verify number of calls
    expect(onNavigateMock).toHaveBeenCalledTimes(sections.length);

    // Verify active by category id
  });

  it('unactive sections without category param', () => {
    const { getAllByTestId } = render(
      <Header
        siteTitle="Default Starter"
        brandLogo={BrandLogo}
        params={undefined}
        onNavigate={onNavigateMock}
        menuNav
        userNav
      />
    );

    const links = getAllByTestId('section-action');

    for (let index = 0; index < links.length; index++) {
      const link = links[index];

      // Verify payload
      // console.log(link.getAttribute('className'));
      expect(link).not.toHaveClass('eui-dropdown-item active');
    }
  });
});
