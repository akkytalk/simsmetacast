import { connect } from "react-redux";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { logout } from "store/creators";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { isEmpty } from "Helpers/helper";

// const options = [
//   { name: "Edit Exports", page: "edit-purchase-indents" },
//   { name: "Create/Edit Sales Indents", page: "edit-create-sales-indents" },
//   { name: "Add Sales Contract", page: "add-sales-contract" },
//   { name: "Add Advance Details", page: "add-advance-details" },
//   { name: "Add Loading Details", page: "add-loading-details" },
//   { name: "LME Fixation", page: "lme-fixation" },
//   { name: "Manage Files", page: "manages-files" },
//   { name: "User History", page: "new-order-history" },
// ];

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const AdminNavbar = (props) => {
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  // console.log("props.brandText", props.brandText);

  if (props.login?.login?.user?.role === "admin")
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <div>
              <Link
                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                // to={`/admin/${props.brandText}`}
              >
                {props.brandText === "Brand" ? "Exports" : props.brandText}
              </Link>
              <div role="presentation" className="mt-2" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link to="/index">
                    <StyledBreadcrumb
                      component="a"
                      href="/index"
                      label="Home"
                      icon={<HomeIcon fontSize="small" />}
                    />
                  </Link>
                  {props.brandValue !== "Brand" &&
                  !isEmpty(props.brandValue?.route) &&
                  !isEmpty(props.brandValue?.route?.path) ? (
                    <Link to={`${props.brandValue?.route?.href}`}>
                      <StyledBreadcrumb
                        component="a"
                        href={`${props.brandValue?.route?.href}`}
                        label={props.brandValue?.route?.path}
                      />
                    </Link>
                  ) : (
                    ""
                  )}
                  {props.brandValue !== "Brand" &&
                  !isEmpty(props.brandValue?.subroute) &&
                  !isEmpty(props.brandValue?.subroute?.path) ? (
                    <StyledBreadcrumb
                      component="a"
                      href="#"
                      label={props.brandValue?.subroute?.path}
                    />
                  ) : (
                    ""
                  )}
                  {/* {props.brandText !== "Brand" && (
                    <StyledBreadcrumb
                      component="a"
                      href="#"
                      label={props.brandText}
                    />
                  )} */}
                  {/* {props.brandText !== "Brand" && (
                    <StyledBreadcrumb
                      component="a"
                      href="#"
                      label={props.brandText}
                    />
                  )} */}
                </Breadcrumbs>
              </div>
            </div>
            {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {props.login?.login?.user?.name}
                      </span>
                    </Media>
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
                  <DropdownItem onClick={(e) => props.logout()}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  else {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <div>
              <Link
                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                // to={`/admin/${props.brandText}`}
              >
                {props.brandText === "Brand" ? "Exports" : props.brandText}
              </Link>
              <div role="presentation" className="mt-2" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link to="/index">
                    <StyledBreadcrumb
                      component="a"
                      href="/index"
                      label="Home"
                      icon={<HomeIcon fontSize="small" />}
                    />
                  </Link>
                  {props.brandText !== "Brand" && (
                    <StyledBreadcrumb
                      component="a"
                      href="#"
                      label={props.brandText}
                    />
                  )}
                  {props.brandText === "Brand" && (
                    <Link to="/admin/order-history">
                      <StyledBreadcrumb component="a" href="#" label="Export" />
                    </Link>
                  )}
                  {window.location.hash
                    .toLowerCase()
                    .includes("#/admin/edit-purchase-indents/") &&
                    props.brandText === "Brand" && (
                      <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Create Export"
                      />
                    )}
                  {window.location.hash
                    .toLowerCase()
                    .includes("#/admin/edit-create-sales-indents/") &&
                    props.brandText === "Brand" && (
                      <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Create And Edit Sales Indents"
                      />
                    )}
                  {window.location.hash
                    .toLowerCase()
                    .includes("#/admin/add-sales-contract/") &&
                    props.brandText === "Brand" && (
                      <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Create And Edit Sales Contract"
                      />
                    )}
                  {window.location.hash
                    .toLowerCase()
                    .includes("#/admin/add-advance-details/") &&
                    props.brandText === "Brand" && (
                      <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Advance Details"
                      />
                    )}
                  {window.location.hash
                    .toLowerCase()
                    .includes("#/admin/add-loading-details/") &&
                    props.brandText === "Brand" && (
                      <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Loading Detail"
                      />
                    )}
                  {window.location.hash
                    .toLowerCase()
                    .includes("#/admin/lme-fixation/") &&
                    props.brandText === "Brand" && (
                      <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="LME Fixation"
                      />
                    )}
                  {window.location.hash
                    .toLowerCase()
                    .includes("#/admin/manages-files/") &&
                    props.brandText === "Brand" && (
                      <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Manage Files"
                      />
                    )}

                  {window.location.hash
                    .toLowerCase()
                    .includes("#/admin/new-order-history/") &&
                    props.brandText === "Brand" && (
                      <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="User History"
                      />
                    )}
                </Breadcrumbs>
              </div>
            </div>
            {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" />
                </InputGroup>
              </FormGroup>
            </Form> */}
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {props.login?.login?.user?.name}
                      </span>
                    </Media>
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
                  <DropdownItem onClick={(e) => props.logout()}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
