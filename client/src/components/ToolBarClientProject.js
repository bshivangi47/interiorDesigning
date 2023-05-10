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
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let projectID;
    let client;
    let room;
    projectID = params.get("project");
    client = params.get("client");
    room = params.get("room");
    this.setState({
      projectId: projectID,
      client: client,
      room: room,
    });

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
    this.props.history.goBack();
  };
  render() {
    if (localStorage.getItem("user")) {
      return (
        <IonToolbar className="headerToolbar headerClientProject">
          <IonButtons className="ion-justify-content-center">
            <Link
              to={{
                pathname: "/likeItems",
                search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                state: {
                  newItems: true,
                  likeItems: false,
                  passedItems: false,
                },
              }}
              style={{ textDecoration: "none" }}
            >
              <IonChip
                className={this.props.newItems ? "LoginBtn" : "Projectchips"}
                onClick={() => {
                  this.props.setnewItems();
                }}
              >
                <IonLabel style={{ textAlign: "center", fontSize: "12.9px" }}>
                  New Items
                </IonLabel>
              </IonChip>
            </Link>
            <Link
              to={{
                pathname: "/likeItems",
                search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                state: {
                  newItems: false,
                  likeItems: true,
                  passedItems: false,
                },
              }}
              style={{ textDecoration: "none" }}
            >
              <IonChip
                className={this.props.likeItems ? "LoginBtn " : "Projectchips"}
                onClick={() => {
                  this.props.setlikeItems();
                }}
              >
                <IonLabel style={{ textAlign: "center", fontSize: "12.9px" }}>
                  Liked Items
                </IonLabel>
              </IonChip>
            </Link>
            <Link
              to={{
                pathname: "/likeItems",
                search: `?client=${this.state.client}&room=${this.state.room}&project=${this.props.projectId}`,
                state: {
                  newItems: false,
                  likeItems: false,
                  passedItems: true,
                },
              }}
              style={{ textDecoration: "none" }}
            >
              <IonChip
                className={this.props.passedItems ? "LoginBtn" : "Projectchips"}
                onClick={() => {
                  this.props.setpassedItems();
                }}
              >
                <IonLabel style={{ textAlign: "center", fontSize: "12.9px" }}>
                  Passed Items
                </IonLabel>
              </IonChip>
            </Link>
          </IonButtons>
        </IonToolbar>
      );
    }
  }
}
export default withRouter(Toolbar);
