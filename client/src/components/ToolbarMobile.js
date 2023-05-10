import {
  IonButtons,
  IonItem,
  IonButton,
  IonToolbar,
  IonImg,
  IonPopover,
  IonList,
  IonIcon,
} from "@ionic/react";
import React from "react";
import "../pages/Page.css";
import "./Menu.css";
import { chevronBackOutline, personCircleOutline } from "ionicons/icons";
import cart from "../images/cart.svg";
import { withRouter } from "react-router";
import secondaryLogo from "../images/Hemly_secondary logo_grayscale.png";
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
    this.props.history.goBack();
  };
  render() {
    return (
      <>
        <IonToolbar className="headerToolbar headerMain">
          <IonPopover
            isOpen={this.state.setShowPopover}
            // cssClass="mypopover"
            onDidDismiss={(e) =>
              this.setState({ setShowPopover: false, event: undefined })
            }
            padding="true"
            event={this.state.event}
          >
            <IonList lines="none">
              <IonItem>
                <IonButtons>Account</IonButtons>
              </IonItem>
              <IonItem>
                <IonButtons
                  onClick={() => {
                    this.props.history.push("/orders");
                  }}
                >
                  Past Orders
                </IonButtons>
              </IonItem>
              <IonItem>
                <IonButtons
                  onClick={() => {
                    localStorage.clear();
                    this.props.history.push("/");
                    console.log("token...", localStorage.getItem("token"));
                  }}
                >
                  Logout
                </IonButtons>
              </IonItem>
            </IonList>
          </IonPopover>
          {window.location.pathname === "/" ? null : (
            <IonButtons slot="start" className="" style={{ margin: "0" }}>
              <IonButton onClick={this.Goback}>
                <IonIcon
                  icon={chevronBackOutline}
                  style={{ fontSize: "19px", color: "#506372" }}
                />
              </IonButton>
            </IonButtons>
          )}

          <Link to="/" style={{ margin: "auto " }}>
            <IonImg
              src={secondaryLogo}
              style={{ height: "28px", cursor: "pointer" }}
              className="ml-3 col-md-4 col-lg-4 col-sm-2 col-xs-2"
            />
          </Link>

          <IonButtons slot="end" className="">
            <IonButton
              onClick={(event) => {
                this.props.history.push("/Cart");
              }}
            >
              <IonImg
                src={cart}
                className="filtersvgcolor"
                height="29px"
                width="29px"
                style={{
                  height: "24px",
                  width: " 29px",
                }}
              />
            </IonButton>{" "}
            {/* <IonToggle
              id="themeToggle"
              slot="end"
              onIonChange={() => {
                document.body.classList.toggle("dark");
              }}
            ></IonToggle> */}
            <IonButton
              onClick={(event) => {
                this.setState({
                  setShowPopover: true,
                  event: event.nativeEvent,
                });
              }}
            >
              <IonIcon
                icon={personCircleOutline}
                className=""
                style={{
                  fontSize: "27px",
                  color: "#506372",
                  padding: "0",
                }}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        {/* <ToolbarProjects /> */}
      </>
    );
  }
}
export default withRouter(Toolbar);
