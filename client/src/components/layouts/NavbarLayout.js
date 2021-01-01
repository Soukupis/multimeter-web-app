import React, { useState } from "react";

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import { ReactComponent as Logo } from "../../assets/multimeter.svg";

const NavbarLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <Navbar color="faded" light expand="sm" style={{ fontSize: "20pt" }}>
      <NavbarBrand href="/">
        <Logo style={{ height: "75px" }} />
      </NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/nastaveni">Nastavení</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/statistiky">Statistiky</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Odkazy
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="https://github.com/Soukupis/MultimeterWebApp">
              Repozitář projektu
            </DropdownItem>
            <DropdownItem href="https://github.com/Soukupis/MultimeterWebApp/tree/master/client">
              Client
            </DropdownItem>
            <DropdownItem href="https://github.com/Soukupis/MultimeterWebApp/tree/master/api">
              Api
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Navbar>
  );
};
export default NavbarLayout;
