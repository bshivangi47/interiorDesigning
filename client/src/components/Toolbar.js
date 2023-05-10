import {
  IonItem,
  IonPopover,
  IonTitle,
  IonMenuButton,
  IonButtons,
  IonButton,
  IonToolbar,
  IonImg,
  IonList,
  IonIcon,
  IonMenu,
  IonContent,
  IonHeader,
  IonRouterOutlet,
} from "@ionic/react";
import React from "react";
import { withRouter } from "react-router";
import "../pages/Page.css";
import { menuController } from "@ionic/core";
import { menuOutline, closeOutline } from "ionicons/icons";
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
    let currentHideNav = window.innerWidth <= 576;

    if (currentHideNav === true) {
      this.setState({ menuClose: true });
    } else {
      this.setState({ menuClose: false });
      menuController.close("MobileMenu");
    }
  }
  handleClick = () => {
    if (!this.state.chev) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    var chevtoggle = !this.state.chev;
    this.setState({ chev: chevtoggle });
    menuController.toggle("MobileMenu");
  };
  handleOutsideClick = (e) => {
    this.handleClick();
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
    // menuController.close("MobileMenu");
  }
  redirect = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <>
        <IonToolbar className="mainToolbar">
          {this.state.menuClose ? (
            <>
              <IonButtons slot="start" className="">
                <Link
                  to="/"
                  className="col-sm-2 HeaderImg ion-align-items-center"
                >
                  <IonImg
                    className="ml-2"
                    src={secondaryLogo}
                    style={{
                      height: "30px",
                      cursor: "pointer",
                      width: "110px",
                      padding: " 4px 0px !important",
                    }}
                  />
                </Link>
              </IonButtons>
              <IonButtons slot="end" className="">
                <IonButton slot="end" href="/login" class=" LoginBtn">
                  LOGIN
                </IonButton>
                {/* <IonButton slot="end" onClick={this.handleClick}>
                  <IonIcon icon={menuOutline} style={{ color: "black" }} />
                </IonButton> */}
              </IonButtons>
            </>
          ) : (
            <>
              <IonButtons slot="start" className="">
                <Link
                  to="/"
                  className="col-md-2 col-xs-2 HeaderImg ion-align-items-center"
                >
                  <IonImg
                    className="headerionimg"
                    src={secondaryLogo}
                    style={{
                      height: "35px",
                      cursor: "pointer",
                    }}
                  />
                </Link>
                <IonButton
                  slot="start"
                  className="headerbtn"
                  href="/home#about"
                >
                  ABOUT
                </IonButton>
                <IonButton
                  slot="start"
                  className="headerbtn"
                  href="/home#contact"
                >
                  CONTACT
                </IonButton>
                <IonButton
                  slot="start"
                  className="headerbtn"
                  href="/home#connect"
                >
                  CONNECT
                </IonButton>
              </IonButtons>
              <IonButton slot="end" href="/login" class=" LoginBtn mr-5">
                LOGIN
              </IonButton>
            </>
          )}
        </IonToolbar>
        <IonMenu
          side="end"
          type="overlay"
          contentId="MobileMenu"
          menuId="MobileMenu"
          id="MobileMenu"
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end" className="">
                <IonButton
                  slot="end"
                  onClick={() => {
                    menuController.toggle("MobileMenu");
                  }}
                >
                  <IonIcon icon={closeOutline} style={{ color: "black" }} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent style={{ paddingTop: 0 }} id="mobilemenucontent">
            <IonList style={{ paddingTop: 0 }}>
              {/* <IonItem> */}{" "}
              <IonButton
                slot="start"
                className=""
                href="/login"
                expand="full"
                className="MobileMenubtn"
              >
                Login
              </IonButton>
              <IonButton
                slot="start"
                className=""
                href="#about"
                expand="full"
                className="MobileMenubtn"
              >
                About
              </IonButton>
              {/* </IonItem>
              <IonItem> */}
              <IonButton
                slot="start"
                className=""
                href="#contact"
                expand="full"
                className="MobileMenubtn"
              >
                Contact
              </IonButton>
              {/* </IonItem>
              <IonItem> */}
              <IonButton
                slot="start"
                className=""
                href="#connect"
                expand="full"
                className="MobileMenubtn"
              >
                Connect
              </IonButton>
              {/* </IonItem>
              <IonItem href="/login"> */}
              {/* </IonItem> */}
            </IonList>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="MobileMenu"></IonRouterOutlet>
      </>
    );
  }
}
export default withRouter(Toolbar);
