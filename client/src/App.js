import Menu from "./components/Menu";
import Login from "./pages/Login.js";
import React, { useEffect } from "react";

import DesignerSignUp from "./pages/DesignerSignUp";
import { IonApp, IonRouterOutlet, IonSplitPane, IonPage } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Landing from "./pages/Landing";

import CurrentProject from "./pages/CurrentProject";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";
import currentProjectClient from "./pages/currentProjectClient";
import ProjectClient from "./pages/ProjectClient";

import ItemsAdded from "./pages/ItemsAdded";

import FinalCart from "./pages/FinalCart";
import ItemView from "./pages/ItemView";
import Explore from "./pages/Explore";
import ExploreNew from "./pages/ExploreNew";
import PastProject from "./pages/PastProjects";
import ViewFurniture from "./pages/ViewFurniture";
import PastProjectsclient from "./pages/PastProjectsclient";
import ReferralCenter from "./pages/ReferralCenter";
import Business from "./pages/Business";
import ViewSingleItem from "./pages/ViewSingleItem";
import HowTo from "./pages/HowTo";
import Inventory from "./pages/AdminPages/Inventory";
import Commission from "./pages/AdminPages/Commission";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FinalCart2 from "./pages/FinalCart2";
import PastOrders from "./pages/PastOrders";
import Okta from "./pages/Okta";
import Payment from "./pages/Payment";
import { useDispatch, useSelector } from "react-redux";
import { validateToken, logout } from "./actions/userActions";
import Dashboard from "./pages/AdminPages/Dashboard";
import IndependentContractorAgreement from "./pages/TermsAndConditions/IndependentContractorAgreement";
import EndUserLicenseAgreement from "./pages/TermsAndConditions/EndUserLicenseAgreement";
import PrivacyPolicy from "./pages/TermsAndConditions/PrivacyPolicy";

function App(props) {
  let userType;
  const dispatch = useDispatch();
  const stateData = useSelector((state) => {
    return state.error;
  });
  if (localStorage.getItem("user")) {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log("user.role-=", user.role);
    userType = user.role;
  }
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(validateToken());
    }
  });
  useEffect(() => {
    if (stateData) {
      if (stateData.message.message == "Unauthenticated") {
        console.log("stateData-=-=-=", stateData);
        dispatch(logout());
      }
    }
  }, [stateData]);
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main" when="md">
          <Menu />

          <IonRouterOutlet id="main">
            <Route path="/home" component={Landing} exact />
            <Route
              exact
              path="/"
              render={() =>
                localStorage.getItem("user") ? (
                  userType == "designer" || userType == "Designer" ? (
                    <Redirect to="/explore" />
                  ) : userType == "client" || userType == "Client" ? (
                    <Redirect to="/currentprojectsclient" />
                  ) : (
                    <Redirect to="/admin/analytics" />
                  )
                ) : (
                  <Redirect to="/home" />
                )
              }
            />
            <Route path="/login" component={Login} exact />
            <Route path="/okta" component={Okta} exact />
            <Route path="/signup" component={DesignerSignUp} exact />
            <Route
              path="/independentContractorAgreement"
              component={IndependentContractorAgreement}
              exact
            />
            <Route
              path="/endUserLicenseAgreement"
              component={EndUserLicenseAgreement}
              exact
            />
            <Route path="/privacyPolicy" component={PrivacyPolicy} exact />
            <Route path="/forgotPassword" component={ForgotPassword} exact />
            <Route path="/resetPassword" component={ResetPassword} exact />
            <Route path="/clientsignup" component={DesignerSignUp} exact />

            <PrivateRoute path="/admin/Inventory" component={Inventory} exact />
            <PrivateRoute
              path="/admin/commissions"
              component={Commission}
              exact
            />
            <PrivateRoute path="/admin/analytics" component={Dashboard} exact />

            <PrivateRoute
              path="/currentprojects"
              component={CurrentProject}
              exact
            />
            <PrivateRoute path="/newProject" component={NewProject} exact />
            <PrivateRoute path="/project" component={Project} exact />
            <PrivateRoute path="/explore" component={Explore} exact />
            <PrivateRoute path="/searchDecor" component={Explore} exact />
            <PrivateRoute path="/savedItems" component={Explore} exact />
            <PrivateRoute path="/likedItems" component={Explore} exact />
            <PrivateRoute path="/passedItems" component={Explore} exact />
            <PrivateRoute path="/pastProjects" component={PastProject} exact />
            <PrivateRoute path="/How" component={ReferralCenter} exact />
            <PrivateRoute path="/business" component={Business} exact />
            <PrivateRoute
              path="/viewFurniture"
              component={ViewFurniture}
              exact
            />
            <PrivateRoute path="/viewDecor" component={ViewFurniture} exact />
            <PrivateRoute
              path="/viewsavedItems"
              component={ViewFurniture}
              exact
            />
            <PrivateRoute
              path="/viewlikedItems"
              component={ViewFurniture}
              exact
            />
            <PrivateRoute
              path="/viewpassedItems"
              component={ViewFurniture}
              exact
            />
            <PrivateRoute path="/howto" component={HowTo} exact />
            <PrivateRoute path="/explorenew" component={ExploreNew} exact />
            <PrivateRoute
              path="/currentprojectsclient"
              component={currentProjectClient}
              exact
            />
            <PrivateRoute
              path="/pastProjectsclient"
              component={PastProjectsclient}
              exact
            />
            <PrivateRoute path="/itemview" component={ItemView} exact />
            <PrivateRoute
              path="/projectclient"
              component={ProjectClient}
              exact
            />
            <PrivateRoute path="/likeItems" component={ItemsAdded} exact />
            <PrivateRoute path="/Cart" component={FinalCart} exact />
            <PrivateRoute path="/orders" component={PastOrders} exact />
            {/* <PrivateRoute path="/FinalCart" component={FinalCart2} exact /> */}
            <PrivateRoute path="/viewItem" component={ViewSingleItem} exact />
            <PrivateRoute
              path="/viewDecorItem"
              component={ViewSingleItem}
              exact
            />
            <PrivateRoute
              path="/viewsavedItem"
              component={ViewSingleItem}
              exact
            />
            <PrivateRoute
              path="/viewlikedItem"
              component={ViewSingleItem}
              exact
            />
            <PrivateRoute
              path="/viewpassedItem"
              component={ViewSingleItem}
              exact
            />
            <PrivateRoute path="/payment" component={Payment} exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem("token") ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
}

export default App;
