import React from "react";
import {
  // useLocation,
  Route,
  Switch,
  Redirect,
  withRouter,
  useParams,
} from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { connect } from "react-redux";
import Header from "components/Headers/Header";
import PreLoader from "components/Loaders/PreLoader";
import { isEmpty } from "Helpers/helper";

const Admin = (props) => {
  const mainContent = React.useRef(null);

  // const location = useLocation();

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);
  console.log(`props.login.login`, props.login.login);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          ></Route>
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      const path = routes[i].layout + routes[i].path;
      // if (
      //   props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
      //   -1
      // )
      if (props.location.pathname.includes(path)) {
        console.log("props.location.pathname", props.location.pathname);
        console.log("values of routes", routes[i].layout + routes[i].path);
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const getBrandValue = () => {
    const path = props?.location?.pathname.split("/") ?? [];
    const values = path.splice(2, 2);
    const navItems = {
      route: {
        href: `/admin/${values[0]}`,
        path: `${values[0] ?? ""}`,
      },
      subroute: {
        path: `${values[1] ?? ""} `,
      },
    };

    return !isEmpty(path) ? navItems : "Brand";
  };

  console.log("first", getBrandValue(props.location.pathname));
  // console.log("props.location.pathname", props.location.pathname);

  if (props.login?.login.length === 0) {
    return <Redirect to={"/auth/login"} />;
  }
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <Container fluid>
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
            brandValue={getBrandValue(props.location.pathname)}
          />
        </Container>
        <Header />
        <React.Suspense fallback={<PreLoader />}>
          <Switch>
            {getRoutes(routes)}

            <Redirect from="*" to="/admin/index" />
          </Switch>
        </React.Suspense>
        {/* <Container fluid> <AdminFooter /></Container> */}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default withRouter(connect(mapStateToProps, null)(Admin));
