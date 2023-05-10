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
      <IonToolbar className="headerToolbar headerProjects">
        <IonButtons className="ion-justify-content-center">
          <Link to="/currentprojects" style={{ textDecoration: "none" }}>
            <IonChip
              className={
                window.location.pathname === "/currentprojects"
                  ? "LoginBtn"
                  : "Projectchips"
              }
            >
              <IonLabel style={{ textAlign: "center", fontSize: "12.9px" }}>
                Current projects
              </IonLabel>
            </IonChip>
          </Link>
          <Link to="/newProject" style={{ textDecoration: "none" }}>
            <IonChip
              className={
                window.location.pathname === "/newProject"
                  ? "LoginBtn "
                  : "Projectchips"
              }
            >
              <IonLabel style={{ textAlign: "center", fontSize: "12.9px" }}>
                New project
              </IonLabel>
            </IonChip>
          </Link>
          <Link to="/pastProjects" style={{ textDecoration: "none" }}>
            <IonChip
              className={
                window.location.pathname === "/pastProjects"
                  ? "LoginBtn"
                  : "Projectchips"
              }
            >
              <IonLabel style={{ textAlign: "center", fontSize: "12.9px" }}>
                Past projects
              </IonLabel>
            </IonChip>
          </Link>
        </IonButtons>
      </IonToolbar>
    );
  }
}
export default withRouter(Toolbar);
