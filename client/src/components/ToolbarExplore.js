import { IonButtons, IonToolbar, IonChip, IonLabel } from "@ionic/react";
import React from "react";
import "../pages/Page.css";
import "./Menu.css";

import { withRouter } from "react-router";

import { Link } from "react-router-dom";
class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShowPopover: false,
      menuClose: false,
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let currentHideNav = window.innerWidth <= 770;

    if (currentHideNav === true) {
      this.setState({ menuClose: true });
    } else {
      this.setState({ menuClose: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  Goback = (e) => {
    this.props.history.go(-1);
  };
  render() {
    return (
      <IonToolbar className="headerToolbar headerExplore">
        <IonButtons className=" ion-justify-content-center">
          <Link to="/explore" style={{ textDecoration: "none" }}>
            <IonChip
              className={
                window.location.pathname === "/explore" ||
                window.location.pathname === "/viewFurniture" ||
                window.location.pathname === "/viewItem"
                  ? "LoginBtn "
                  : "Projectchips "
              }
              style={{ width: "110px" }}
            >
              <IonLabel style={{ textAlign: "center", margin: "auto" }}>
                Explore
              </IonLabel>
            </IonChip>
          </Link>

          <Link to="/Cart" style={{ textDecoration: "none" }}>
            <IonChip
              className={
                window.location.pathname === "/Cart"
                  ? "LoginBtn "
                  : "Projectchips "
              }
              style={{ width: "110px" }}
            >
              <IonLabel style={{ textAlign: "center", margin: "auto" }}>
                Cart
              </IonLabel>
            </IonChip>
          </Link>
        </IonButtons>
      </IonToolbar>
    );
  }
}
export default withRouter(Toolbar);
