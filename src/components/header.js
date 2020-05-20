import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Navbar from 'emerald-ui/lib/Navbar'
import Nav from 'emerald-ui/lib/Nav'
import DropdownItem from 'emerald-ui/lib/DropdownItem'
import DropdownButton from 'emerald-ui/lib/DropdownButton'
import Avatar from 'emerald-ui/lib/Avatar'
// import Img from 'gatsby-image'

const Header = ({ siteTitle, brandLogo }) => (
  <header
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <Navbar breakAt="sm">
      <div className="container display-flex">
        <Navbar.Brand>
          <Link to="/">
            {/* <Img fluid={''} alt={siteTitle}/> */}
            <img src={brandLogo} alt={siteTitle}/>
          </Link>
        </Navbar.Brand>
        <Nav grow collapsible>
          <DropdownButton title="Sections" id="dd1">
            <DropdownItem eventKey="1" active>General</DropdownItem>
            <DropdownItem eventKey="2">Health</DropdownItem>
            <DropdownItem eventKey="3">Science</DropdownItem>
            <DropdownItem eventKey="4">Sports</DropdownItem>
            <DropdownItem eventKey="4">Technology</DropdownItem>
          </DropdownButton>
          <Link to="/">
            Editorial
          </Link>
          <Link to="/">
            Contact us
          </Link>
        </Nav>
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
      </div>
    </Navbar>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  brandLogo: PropTypes.any
}

Header.defaultProps = {
  siteTitle: ''
}

export default Header
