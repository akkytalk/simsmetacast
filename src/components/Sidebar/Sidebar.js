/*eslint-disable*/
import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
// import { PropTypes } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";

var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const [caseCollapsed, setCaseCollapsed] = useState(false);
  const [reportCollapsed, setReportCollapsed] = useState(false);
  const [userMasterCollapsed, setUserMasterCollapsed] = useState(false);
  const [OrderHistorreyCollapsed, setOrderHistoryCollapsed] = useState(false);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  if (props.login?.login?.user?.role === "admin")
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-1-800x800.jpg")
                          .default
                      }
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <PerfectScrollbar className="sidebar-nav">
              <Nav vertical navbar>
                <li>
                  <NavItem>
                    <NavLink
                      to="/"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-green" />
                      Dashboard
                    </NavLink>
                  </NavItem>
                </li>

                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/suppiler"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-badge text-red" />
                      Supiler/Customer
                    </NavLink>
                  </NavItem>
                </li>

                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/sales-confirmation"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-money-coins text-yellow" />
                      Sales Confirmation
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/canceled-sales-confirmation"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-app text-green" />
                      Canceled Sales Confirmation
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/import"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="fa fa-file-import text-info" />
                      {/* <i className="fa fa-money-bill-alt text-pink" /> */}
                      Import
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/order-history"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-palette text-pink" />
                      Export
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/canceled-order-history"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-delivery-fast text-info" />
                      Canceled Export
                    </NavLink>
                  </NavItem>
                </li>
                {/* <li>
                <NavItem>
                  <a
                    className="nav-link active"
                    data-toggle="collapse"
                    role="button"
                    name="orderhistory"
                    onClick={() =>
                      setOrderHistoryCollapsed(!OrderHistorreyCollapsed)
                    }
                    aria-expanded={OrderHistorreyCollapsed ? "true" : "false"}
                  >
                    <i className="ni ni-palette text-pink" />
                    Export
                  </a>
                </NavItem>
                <Collapse isOpen={OrderHistorreyCollapsed}>
                  <ul className="nav nav-sm flex-column">
                    
                    <li>
                      <NavItem>
                        <NavLink
                          to=""
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="ni ni-box-2 text-orange" />
                          Edit Export
                        </NavLink>
                      </NavItem>
                    </li>
                    <li>
                      <NavItem>
                        <NavLink
                          to=""
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="ni ni-check-bold text-blue" />
                          Create Edit Sales Indent
                        </NavLink>
                      </NavItem>
                    </li>

                    <li>
                      <NavItem>
                        <NavLink
                          to=""
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="fa fa-american-sign-language-interpreting text-purple" />
                          Add Sales Contracts
                        </NavLink>
                      </NavItem>
                    </li>

                    <li>
                      <NavItem>
                        <NavLink
                          to=""
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="fa fa-pencil-alt text-primary" />
                          Add Advance Details
                        </NavLink>
                      </NavItem>
                    </li>
                    <li>
                      <NavItem>
                        <NavLink
                          to=""
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="fa fa-car text-red" />
                          Add Loading Details
                        </NavLink>
                      </NavItem>
                    </li>
                    <li>
                      <NavItem>
                        <NavLink
                          to=""
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="fa fa-cat text-purple" />
                          LME Fixation
                        </NavLink>
                      </NavItem>
                    </li>
                    <li>
                      <NavItem>
                        <NavLink
                          to=""
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="fa fa-file text-blue" />
                          Manage Files
                        </NavLink>
                      </NavItem>
                    </li>
                    <li>
                      <NavItem>
                        <NavLink
                          to=""
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="fa fa-user text-black" />
                          Export
                        </NavLink>
                      </NavItem>
                    </li>
                  </ul>
                </Collapse>
              </li> */}
                {/* <li>
                  <NavItem>
                    <NavLink
                      to="/admin/lme-update"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-settings " />
                      LME Update
                    </NavLink>
                  </NavItem>
                </li>

                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/manage-commission"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-chart-pie-35 text-blue" />
                      Manage Commission
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/long-term-deposit"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="fa fa-money-bill-alt text-pink" />
                      Long Term Deposit
                    </NavLink>
                  </NavItem>
                </li> */}

                {/* <li>
                  <NavItem>
                    <a
                      className="nav-link active"
                      data-toggle="collapse"
                      role="button"
                      name="casemaster"
                      onClick={() => setReportCollapsed(!reportCollapsed)}
                      aria-expanded={reportCollapsed ? "true" : "false"}
                    >
                      <i className="ni ni-chart-bar-32 text-green" />
                      Report
                    </a>
                  </NavItem>
                  <Collapse isOpen={reportCollapsed}>
                    <ul className="nav nav-sm flex-column">
                   
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/pending-payments"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-box-2 text-orange" />
                            Pending Payments
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/paid-payment"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-check-bold text-blue" />
                            Paid Payments
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/pending-advance"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-dollar text-yellow" />
                            Pending Advance
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/metric-booked"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-american-sign-language-interpreting text-purple" />
                            Metric Tons Booked
                          </NavLink>
                        </NavItem>
                      </li>

                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/pending-shipment"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-pencil-alt text-primary" />
                            Pending Shipment
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/pending-lme-fixation"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-tools text-black" />
                            Pending LME Fixation
                          </NavLink>
                        </NavItem>
                      </li>
                    </ul>
                  </Collapse>
                </li> */}

                <li className="nav-item">
                  <NavItem>
                    <a
                      className="nav-link active"
                      data-toggle="collapse"
                      role="button"
                      name="casemaster"
                      onClick={() => setCaseCollapsed(!caseCollapsed)}
                      aria-expanded={caseCollapsed ? "true" : "false"}
                    >
                      <i className="ni ni-trophy text-yellow" />
                      Edit table Master
                    </a>
                  </NavItem>
                  <Collapse isOpen={caseCollapsed}>
                    <ul className="nav nav-sm flex-column">
                      {/* nav nav-treeview  */}
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/commodity"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-map-big text-orange" />
                            Commodity
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/commodity-analysis"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-chart-line text-green" />
                            Commodity Analysis
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/container-size"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-planet text-blue" />
                            Contanier Size
                          </NavLink>
                        </NavItem>
                      </li>

                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/port-loading"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-pin-3 text-purple" />
                            Port of Loading
                          </NavLink>
                        </NavItem>
                      </li>

                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/port-discharge"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-send text-primary" />
                            Port of Discharge
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/port-delivery"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-world text-black" />
                            Final Port of Delivery
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/payment-advance"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-watch-time text-red" />
                            Payment Advance Unit
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/payment-pending"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-shop text-yellow" />
                            Payment Pending Unit
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/commision-unit"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-collection text-green" />
                            Commission Unit
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/wight-unit"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-spaceship text-orange" />
                            Weight Unit
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/quantity-unit"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-umbrella-13 text-red" />
                            Quantity Unit
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/price-unit"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-tie-bow text-purple" />
                            Price Unit
                          </NavLink>
                        </NavItem>
                      </li>

                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/advance-unit"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-ui-04 text-blue" />
                            Advance Unit
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/License"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-atom text-pink" />
                            License
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/duty"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-briefcase-24 text-blue" />
                            Duty
                          </NavLink>
                        </NavItem>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <NavItem>
                    <a
                      className="nav-link active"
                      data-toggle="collapse"
                      role="button"
                      name="casemaster"
                      onClick={() =>
                        setUserMasterCollapsed(!userMasterCollapsed)
                      }
                      aria-expanded={userMasterCollapsed ? "true" : "false"}
                    >
                      <i className="fa fa-user text-black" />
                      User Master
                    </a>
                  </NavItem>
                  <Collapse isOpen={userMasterCollapsed}>
                    <ul className="nav nav-sm flex-column">
                      {/* nav nav-treeview  */}
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/add-user"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-user-check text-orange" />
                            Add User
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/rights"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-hand-point-right text-blue"></i>
                            Rights
                          </NavLink>
                        </NavItem>
                      </li>
                    </ul>
                  </Collapse>
                </li>
              </Nav>

              {/* </Collapse> */}
            </PerfectScrollbar>
          </Collapse>
        </Container>
      </Navbar>
    );
  else {
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-1-800x800.jpg")
                          .default
                      }
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <PerfectScrollbar className="sidebar-nav">
              <Nav vertical navbar>
                {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[0]?.view == 1 ? (
                  <li>
                    <NavItem>
                      <NavLink
                        to="/"
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        activeClassName="active"
                      >
                        <i className="ni ni-user-run text-green" />
                        Dashboard
                      </NavLink>
                    </NavItem>
                  </li>
                ) : (
                  ""
                )}

                {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[1]?.view == 1 ? (
                  <li>
                    <NavItem>
                      <NavLink
                        to="/admin/suppiler"
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        activeClassName="active"
                      >
                        <i className="ni ni-badge text-red" />
                        Supiler/Customer
                      </NavLink>
                    </NavItem>
                  </li>
                ) : (
                  ""
                )}

                {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[2]?.view == 1 ? (
                  <li>
                    <NavItem>
                      <NavLink
                        to="/admin/sales-confirmation"
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        activeClassName="active"
                      >
                        <i className="ni ni-money-coins text-yellow" />
                        Sales Confirmation
                      </NavLink>
                    </NavItem>
                  </li>
                ) : (
                  ""
                )}

                {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[10]?.view == 1 ? (
                  <li>
                    <NavItem>
                      <NavLink
                        to="/admin/canceled-sales-confirmation"
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        activeClassName="active"
                      >
                        <i className="ni ni-app text-green" />
                        Canceled Sales Confirmation
                      </NavLink>
                    </NavItem>
                  </li>
                ) : (
                  ""
                )}

                {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[3]?.view == 1 ? (
                  <li>
                    <NavItem>
                      <NavLink
                        to="/admin/order-history"
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        activeClassName="active"
                      >
                        <i className="ni ni-palette text-pink" />
                        Export
                      </NavLink>
                    </NavItem>
                  </li>
                ) : (
                  ""
                )}

                {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[11]?.view == 1 ? (
                  <li>
                    <NavItem>
                      <NavLink
                        to="/admin/canceled-order-history"
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        activeClassName="active"
                      >
                        <i className="ni ni-delivery-fast text-info" />
                        Canceled Export
                      </NavLink>
                    </NavItem>
                  </li>
                ) : (
                  ""
                )}

                {/* <li>
                  <NavItem>
                    <a
                      className="nav-link active"
                      data-toggle="collapse"
                      role="button"
                      name="orderhistory"
                      onClick={() =>
                        setOrderHistoryCollapsed(!OrderHistorreyCollapsed)
                      }
                      aria-expanded={OrderHistorreyCollapsed ? "true" : "false"}
                    >
                      <i className="ni ni-palette text-pink" />
                      Export
                    </a>
                  </NavItem>
                  <Collapse isOpen={OrderHistorreyCollapsed}>
                    <ul className="nav nav-sm flex-column">
                      
                      <li>
                        <NavItem>
                          <NavLink
                            to=""
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-box-2 text-orange" />
                            Edit Export
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to=""
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-check-bold text-blue" />
                            Create Edit Sales Indent
                          </NavLink>
                        </NavItem>
                      </li>
  
                      <li>
                        <NavItem>
                          <NavLink
                            to=""
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-american-sign-language-interpreting text-purple" />
                            Add Sales Contracts
                          </NavLink>
                        </NavItem>
                      </li>
  
                      <li>
                        <NavItem>
                          <NavLink
                            to=""
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-pencil-alt text-primary" />
                            Add Advance Details
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to=""
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-car text-red" />
                            Add Loading Details
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to=""
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-cat text-purple" />
                            LME Fixation
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to=""
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-file text-blue" />
                            Manage Files
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to=""
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-user text-black" />
                            Export
                          </NavLink>
                        </NavItem>
                      </li>
                    </ul>
                  </Collapse>
                </li> */}

                {/* {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[4]?.view == 1 ? (
                  <li>
                    <NavItem>
                      <NavLink
                        to="/admin/lme-update"
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        activeClassName="active"
                      >
                        <i className="ni ni-settings " />
                        LME Update
                      </NavLink>
                    </NavItem>
                  </li>
                ) : (
                  ""
                )}

                {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[5]?.view == 1 ? (
                  <li>
                    <NavItem>
                      <NavLink
                        to="/admin/manage-commission"
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        activeClassName="active"
                      >
                        <i className="ni ni-chart-pie-35 text-blue" />
                        Manage Commission
                      </NavLink>
                    </NavItem>
                  </li>
                ) : (
                  ""
                )}

                {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[6]?.view == 1 ? (
                  <li>
                    <NavItem>
                      <NavLink
                        to="/admin/long-term-deposit"
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        activeClassName="active"
                      >
                        <i className="fa fa-money-bill-alt text-pink" />
                        Long Term Deposit
                      </NavLink>
                    </NavItem>
                  </li>
                ) : (
                  ""
                )} */}
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/import"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="fa fa-file-import text-info" />
                      Import
                    </NavLink>
                  </NavItem>
                </li>

                {/* {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[7]?.view == 1 ? (
                  <li>
                    <NavItem>
                      <a
                        className="nav-link active"
                        data-toggle="collapse"
                        role="button"
                        name="casemaster"
                        onClick={() => setReportCollapsed(!reportCollapsed)}
                        aria-expanded={reportCollapsed ? "true" : "false"}
                      >
                        <i className="ni ni-chart-bar-32 text-green" />
                        Report
                      </a>
                    </NavItem>
                    <Collapse isOpen={reportCollapsed}>
                      <ul className="nav nav-sm flex-column">
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/pending-payments"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-box-2 text-orange" />
                              Pending Payments
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/paid-payment"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-check-bold text-blue" />
                              Paid Payments
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/pending-advance"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="fa fa-dollar text-yellow" />
                              Pending Advance
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/metric-booked"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="fa fa-american-sign-language-interpreting text-purple" />
                              Metric Tons Booked
                            </NavLink>
                          </NavItem>
                        </li>

                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/pending-shipment"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="fa fa-pencil-alt text-primary" />
                              Pending Shipment
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/pending-lme-fixation"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="fa fa-tools text-black" />
                              Pending LME Fixation
                            </NavLink>
                          </NavItem>
                        </li>
                      </ul>
                    </Collapse>
                  </li>
                ) : (
                  ""
                )} */}

                {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[8]?.view == 1 ? (
                  <li className="nav-item">
                    <NavItem>
                      <a
                        className="nav-link active"
                        data-toggle="collapse"
                        role="button"
                        name="casemaster"
                        onClick={() => setCaseCollapsed(!caseCollapsed)}
                        aria-expanded={caseCollapsed ? "true" : "false"}
                      >
                        <i className="ni ni-trophy text-yellow" />
                        Edit table Master
                      </a>
                    </NavItem>
                    <Collapse isOpen={caseCollapsed}>
                      <ul className="nav nav-sm flex-column">
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/commodity"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-map-big text-orange" />
                              Commodity
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/commodity-analysis"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="fa fa-chart-line text-green" />
                              Commodity Analysis
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/container-size"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-planet text-blue" />
                              Contanier Size
                            </NavLink>
                          </NavItem>
                        </li>

                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/port-loading"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-pin-3 text-purple" />
                              Port of Loading
                            </NavLink>
                          </NavItem>
                        </li>

                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/port-discharge"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-send text-primary" />
                              Port of Discharge
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/port-delivery"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-world text-black" />
                              Final Port of Delivery
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/payment-advance"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-watch-time text-red" />
                              Payment Advance Unit
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/payment-pending"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-shop text-yellow" />
                              Payment Pending Unit
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/commision-unit"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-collection text-green" />
                              Commission Unit
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/wight-unit"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-spaceship text-orange" />
                              Weight Unit
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/quantity-unit"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-umbrella-13 text-red" />
                              Quantity Unit
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/price-unit"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-tie-bow text-purple" />
                              Price Unit
                            </NavLink>
                          </NavItem>
                        </li>

                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/advance-unit"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-ui-04 text-pink" />
                              Advance Unit
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/License"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-atom text-blue" />
                              License
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/duty"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="ni ni-briefcase-24 text-blue" />
                              Duty
                            </NavLink>
                          </NavItem>
                        </li>
                      </ul>
                    </Collapse>
                  </li>
                ) : (
                  ""
                )}

                {/* {props.login?.login.user?.actions?.length > 0 &&
                props.login?.login.user?.actions[9]?.view == 1 ? (
                  <li>
                    <NavItem>
                      <a
                        className="nav-link active"
                        data-toggle="collapse"
                        role="button"
                        name="casemaster"
                        onClick={() =>
                          setUserMasterCollapsed(!userMasterCollapsed)
                        }
                        aria-expanded={userMasterCollapsed ? "true" : "false"}
                      >
                        <i className="fa fa-user text-black" />
                        User Master
                      </a>
                    </NavItem>
                    <Collapse isOpen={userMasterCollapsed}>
                      <ul className="nav nav-sm flex-column">
                        
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/add-user"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="fa fa-user-check text-orange" />
                              Add User
                            </NavLink>
                          </NavItem>
                        </li>
                        <li>
                          <NavItem>
                            <NavLink
                              to="/admin/rights"
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              activeClassName="active"
                            >
                              <i className="fa fa-hand-point-right text-blue"></i>
                              Rights
                            </NavLink>
                          </NavItem>
                        </li>
                      </ul>
                    </Collapse>
                  </li>
                ) : (
                  ""
                )} */}
              </Nav>

              {/* </Collapse> */}
            </PerfectScrollbar>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
};

Sidebar.defaultProps = {
  routes: [{}],
};

// Sidebar.propTypes = {
//   // links that will be displayed inside the component
//   routes: PropTypes.arrayOf(PropTypes.object),
//   logo: PropTypes.shape({
//     // innerLink is for links that will direct the user within the app
//     // it will be rendered as <Link to="...">...</Link> tag
//     innerLink: PropTypes.string,
//     // outterLink is for links that will direct the user outside the app
//     // it will be rendered as simple <a href="...">...</a> tag
//     outterLink: PropTypes.string,
//     // the image src of the logo
//     imgSrc: PropTypes.string.isRequired,
//     // the alt for the img
//     imgAlt: PropTypes.string.isRequired,
//   }),
// };

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
  };
};

export default connect(mapStateToProps)(Sidebar);
