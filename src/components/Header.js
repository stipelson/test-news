import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Navbar from 'emerald-ui/lib/Navbar';
import Nav from 'emerald-ui/lib/Nav';
import DropdownItem from 'emerald-ui/lib/DropdownItem';
import DropdownButton from 'emerald-ui/lib/DropdownButton';
import Avatar from 'emerald-ui/lib/Avatar';
// import { getParams } from '../lib/utils';

export const sections = [
  {
    topicId: '5dfccaa7-e8ab-4044-8355-b6bebba95499',
    name: 'Health',
  },
  {
    topicId: '240f6a12-b9d8-40a6-b1c6-a220e31d08de',
    name: 'Renewable Energy',
  },
  {
    topicId: 'b220679c-95ff-4e4e-a1fa-ad8b3905b7df',
    name: 'Cyber Security',
  },
  {
    topicId: 'c4277484-5aca-4db8-8c30-72ca9aac3ed3',
    name: 'Technology',
  },
];

const Header = ({
  siteTitle,
  brandLogo,
  params,
  onNavigate,
  menuNav,
  userNav,
}) => {
  const handleOnClick = (category) => {
    onNavigate(category);
  };

  let categoryParam = params && params.category ? params.category : '';

  const renderMenuNav = () => {
    return (
      <Nav grow collapsible>
        <DropdownButton title="Sections" id="dd1">
          {sections.map((section, index) => (
            <DropdownItem
              key={`section-dropdown-${index}`}
              eventKey="2"
              onClick={() => handleOnClick(section.topicId)}
              active={categoryParam === section.topicId}
              data-testid="section-action"
            >
              {section.name}
            </DropdownItem>
          ))}
        </DropdownButton>
        <Link to="/">Editorial</Link>
        <Link to="/">Contact us</Link>
      </Nav>
    );
  };

  const renderUserNav = () => {
    return (
      <Nav>
        <DropdownButton
          noCaret
          fromRight
          id="dd2"
          title={<Avatar title="JS" />}
        >
          <DropdownItem eventKey="1">Action</DropdownItem>
          <DropdownItem eventKey="2">Another action</DropdownItem>
          <DropdownItem eventKey="3" active>
            Active Item
          </DropdownItem>
          <DropdownItem separator />
          <DropdownItem eventKey="4">Separated link</DropdownItem>
        </DropdownButton>
      </Nav>
    );
  };

  return (
    <header
      style={{
        background: 'rebeccapurple',
        marginBottom: '1.45rem',
      }}
    >
      <Navbar fixedAtTop breakAt="sm">
        <div className="container display-flex">
          <Navbar.Brand>
            <Link to="/">
              <img src={brandLogo} alt={`Logo ${siteTitle}`} />
            </Link>
          </Navbar.Brand>
          {menuNav && renderMenuNav()}
          {userNav && renderUserNav()}
        </div>
      </Navbar>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  brandLogo: PropTypes.any,
  location: PropTypes.any,
  params: PropTypes.object,
  onNavigate: PropTypes.func,
  menuNav: PropTypes.bool,
  userNav: PropTypes.bool,
};

Header.defaultProps = {
  siteTitle: '',
  menuNav: false,
  userNav: false,
};

export default Header;
