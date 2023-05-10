import {
  IonContent,
  IonPage,
  IonButton,
  IonRow,
  IonGrid,
  IonTitle,
  IonCol,
  IonInput,
  IonLabel,
  IonCard,
  IonCardContent,
  IonItem,
  IonTextarea,
  IonText,
  IonIcon,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonAlert,
} from "@ionic/react";
import React from "react";
import "./Page.css";
import {
  logoInstagram,
  logoFacebook,
  chevronUpOutline,
  logoTiktok,
} from "ionicons/icons";
import { Redirect } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import { connect } from "react-redux";
import { menuController } from "@ionic/core";

import { logout, ContactUs } from "../actions/userActions";
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShowPopover: false,
      contactInfo: { email: "", subject: "", body: "" },
      errorEmail: "",
      errorPass: "",
      showScroll: false,
      showAlert: false,
      alertMsg: "",
      thePosition: false,
    };
    this.childDiv = React.createRef();
    // window.addEventListener("scroll", this.scrollFunction, false);
  }
  componentDidMount() {
    menuController.enable(false);
  }
  scrollFunction = (event) => {
    var func = document.querySelector(".wholePage1");
    const rect = func.getBoundingClientRect();

    if (rect.top < -200) {
      this.setState({ thePosition: true });
    } else {
      this.setState({ thePosition: false });
    }
  };

  componentWillUnmount() {
    menuController.enable(false, "main_menu");
  }
  handleChange = (e) => {
    this.setState({
      contactInfo: {
        ...this.state.contactInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleScroll = () => {
    this.childDiv.current.scrollIntoView({ behavior: "smooth" });
  };
  submitContactForm = () => {
    if (this.state.contactInfo.email == "") {
      this.setState({
        errorEmail: "Email cannot be empty",
      });
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(this.state.contactInfo.email)) {
        this.setState({
          errorEmail: "Please enter valid email address.",
        });
      } else {
        this.setState({ errorEmail: "" });
      }
    }
    if (this.state.contactInfo.subject.length == 0) {
      this.setState({
        errorPass: "Please enter the Subject",
      });
    } else {
      this.setState({ errorPass: "" });
    }
    if (this.state.contactInfo.body.length == 0) {
      this.setState({
        errorbody: "Please enter the body for your email",
      });
    } else {
      this.setState({ errorbody: "" });
    }
    if (
      this.state.contactInfo.email !== "" &&
      this.state.contactInfo.subject.length !== 0 &&
      this.state.contactInfo.body.length !== 0
    ) {
      console.log("handle submit form requests");
      this.props.ContactUs(this.state.contactInfo);
    }
  };
  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      if (this.props.error.message.message == "Unauthenticated") {
        this.props.logout();
      } else {
        this.setState({
          alertMsg: this.props.error.message.message,
          showAlert: true,
        });
      }
    }
    if (this.props.contactUs != prevProps.contactUs) {
      if (this.props.contactUs.success == true) {
        this.setState({
          showAlert: true,
          alertMsg: this.props.contactUs.message,
        });
      }
    }
  }
  render() {
    if (localStorage.getItem("token")) {
      var token = JSON.parse(localStorage.getItem("token"));
      if (token.roles[0] == "client") {
        menuController.enable(true);
        return <Redirect to="/currentprojectsclient" />;
      } else if (token.roles[0] == "designer") {
        menuController.enable(true);
        return <Redirect to="/currentprojects" />;
      }
    }

    return (
      <IonPage className="">
        <Toolbar />
        <IonContent
          className="contentScroll "
          scrollEvents={true}
          onIonScroll={() => {
            this.scrollFunction();
          }}
        >
          <IonAlert
            isOpen={this.state.showAlert}
            onDidDismiss={() => {
              this.setState({
                showAlert: false,
                contactInfo: { ...this.state.contactInfo, body: "" },
                // errorEmail: "",
                // errorPass: "",
                errorbody: "",
              });
              document.getElementById("contactUSForm").reset();
              // document.getElementById("body").reset();
            }}
            cssClass="alertClass"
            message={this.state.alertMsg}
            buttons={[
              {
                text: "Okay",
                role: "cancel",
                cssClass: "cashmereAlertBtn",
                handler: () => {
                  this.setState({ showAlert: false });
                },
              },
            ]}
          />
          {this.state.thePosition ? (
            <IonFab
              vertical="bottom"
              horizontal="end"
              slot="fixed"
              className="ionfab"
            >
              <IonFabButton
                className="scrollTopBtn"
                onClick={this.handleScroll}
              >
                Scroll to top{" "}
                <IonIcon
                  icon={chevronUpOutline}
                  className="ml-1"
                  style={{ fontSize: "16px" }}
                />
              </IonFabButton>
            </IonFab>
          ) : null}
          <IonGrid style={{ height: "100%", padding: "0" }} className=" ">
            <IonRow
              ref={this.childDiv}
              style={{ padding: "0" }}
              className="wholePageRow"
            >
              {/* <IonButton
                href="/login"
                class="ion-margin-horizontal charcoal"
                size="large"
              >
                LOGIN
              </IonButton>
              <IonButton
                className="ion-margin-horizontal cashmere m-0"
                size="large"
                onClick={(e) => {
                  menuController.enable(false);
                  this.props.history.push("/signup");
                }}
              >
                SIGN UP
              </IonButton> */}
              <IonCol
                size="12"
                className=" ion-align-items-center wholePage1 "
              ></IonCol>{" "}
              <div className=" LandingWrapper ml-md-5 mx-0 pl-lg-5 d-flex align-items-center">
                <IonCard className="LandingCard ion-justify-content-center  ion-align-items-center ml-md-5 mx-0 mt-md-0 mt-2 mb-0">
                  <IonCardTitle className="LandingCardTitle">
                    Grow your passion for home décor into a business. Earn extra
                    income as an interior decorator.
                  </IonCardTitle>
                  <IonCardContent
                    className="LandingCardSubTitle"
                    style={{ padding: "0px", paddingTop: "5px" }}
                  >
                    Find out Hemly can unlock a new world of opportunity.
                  </IonCardContent>
                  <div className="LandingSignUpButton">
                    <IonButton
                      className="SignUPBtn "
                      href="/signup"
                      onClick={(e) => {
                        this.props.history.push("/signup");
                        // menuController.enable(false, "main_menu");
                      }}
                    >
                      EXPLORE HEMLY
                    </IonButton>
                  </div>
                </IonCard>
              </div>
            </IonRow>{" "}
            <IonRow
              className="ion-justify-content-center  ion-align-items-center container"
              id="about"
            >
              <IonCol size="12" className=" mt-md-5 mt-4 pt-3  ">
                <IonTitle className="landingTitles ">About Hemly</IonTitle>
              </IonCol>
              <IonCol size="12">
                <iframe
                  width="100%"
                  // height="300"
                  className="iframeLanding"
                  src="https://www.youtube.com/embed/H2BCS1JXjYM?playlist=H2BCS1JXjYM?&loop=1"
                  allowFullScreen
                ></iframe>
                {/* <video
                  width="100%"
                  height="100%"
                  controls
                  className="ion-margin-vertical container mb-5"
                >
                  <source src="movie.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}
              </IonCol>
            </IonRow>{" "}
            <IonRow
              className="ion-justify-content-center  ion-align-items-center container"
              id="contact"
            >
              <IonCol size="12" className="my-5 ">
                <IonGrid>
                  <IonCard className=" ion-justify-content-center  ion-align-items-center ">
                    <IonCardTitle className="landingTitles  mt-5">
                      Contact
                    </IonCardTitle>
                    <IonCardContent className="px-0">
                      <form
                        onSubmit={this.submitContactForm}
                        id="contactUSForm"
                      >
                        <IonRow className="ion-justify-content-center  ion-align-items-center ">
                          <IonCol>
                            <IonItem className="forDarkMode" lines="none">
                              <IonLabel
                                className="ion-margin-end mb-3 contactFormLabel"
                                position="stacked"
                              >
                                Email
                              </IonLabel>
                              <IonInput
                                className="ion-margin-end  contactForm"
                                onIonChange={(e) => {
                                  this.handleChange(e);
                                  if (this.state.contactInfo.email == "") {
                                    this.setState({
                                      errorEmail: "Email cannot be empty",
                                    });
                                  } else {
                                    var pattern = new RegExp(
                                      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                                    );

                                    if (!pattern.test(e.target.value)) {
                                      this.setState({
                                        errorEmail:
                                          "Please enter valid email address.",
                                      });
                                    } else {
                                      this.setState({ errorEmail: "" });
                                    }
                                  }
                                }}
                                value={this.state.contactInfo.email}
                                type="email"
                                name="email"
                                placeholder="Enter your Email Address"
                                required
                                id="email"
                              />
                              {this.state.errorEmail != "" ? (
                                // <IonItem lines="none">
                                <p style={{ color: "red" }}>
                                  {this.state.errorEmail}
                                </p>
                              ) : // </IonItem>
                              null}
                            </IonItem>
                          </IonCol>
                        </IonRow>
                        <IonRow className="">
                          <IonCol>
                            <IonItem className="forDarkMode" lines="none">
                              <IonLabel
                                className="ion-margin-end mb-3 contactFormLabel"
                                position="stacked"
                              >
                                Subject
                              </IonLabel>
                              <IonInput
                                className="ion-margin-end contactForm"
                                onIonChange={(e) => {
                                  this.handleChange(e);
                                  if (
                                    this.state.contactInfo.subject.length == 0
                                  ) {
                                    this.setState({
                                      errorPass: "Please enter the Subject",
                                    });
                                    var email =
                                      document.getElementById("password");
                                    email.style.borderColor = "red";
                                  } else {
                                    this.setState({ errorPass: "" });
                                    var email =
                                      document.getElementById("password");
                                    email.style.borderColor = "#ddd";
                                  }
                                }}
                                value={this.state.contactInfo.subject}
                                type="text"
                                name="subject"
                                placeholder="Enter the subject"
                                required
                                id="password"
                              />{" "}
                              {this.state.errorPass != "" ? (
                                // <IonItem lines="none">
                                <p className="" style={{ color: "red" }}>
                                  {this.state.errorPass}
                                </p>
                              ) : // </IonItem>
                              null}
                            </IonItem>
                          </IonCol>
                        </IonRow>
                        <IonRow className=" ">
                          <IonCol>
                            <IonItem className="forDarkMode" lines="none">
                              <IonLabel
                                className="ion-margin-end mb-2 contactFormLabel"
                                position="stacked"
                              >
                                Body
                              </IonLabel>
                              <IonTextarea
                                id="TextAreaForm"
                                className="ion-margin-end contactForm"
                                rows={4}
                                onIonChange={(e) => {
                                  this.handleChange(e);
                                  // if (this.state.contactInfo.body.length == 0) {
                                  //   this.setState({
                                  //     errorbody:
                                  //       "Please enter the body for your email",
                                  //   });
                                  //   var email = document.getElementById("body");
                                  //   email.style.borderColor = "red";
                                  // } else {
                                  //   this.setState({ errorbody: "" });
                                  //   var email = document.getElementById("body");
                                  //   email.style.borderColor = "#ddd";
                                  // }
                                }}
                                value={this.state.contactInfo.body}
                                type="text"
                                name="body"
                                placeholder="Enter the body section of your email"
                                required
                                id="body"
                              />
                              {/* <IonItem lines="none"> */}
                              <p className="" style={{ color: "red" }}>
                                {this.state.errorbody}
                              </p>
                              {/* </IonItem> */}
                            </IonItem>
                          </IonCol>
                        </IonRow>

                        <IonRow>
                          <IonCol>
                            <IonItem className="" lines="none">
                              <IonButton
                                className=" ion-justify-content-center charcoal registerDesigner"
                                onClick={this.submitContactForm}
                              >
                                Submit
                              </IonButton>
                            </IonItem>
                          </IonCol>
                        </IonRow>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonGrid>
              </IonCol>
            </IonRow>
            <IonRow
              className="ion-justify-content-center  ion-align-items-center ion-margin-vertical container "
              id="connect"
            >
              <IonCol size="12">
                <IonTitle className="landingTitles">Connect</IonTitle>
              </IonCol>
              <IonCol size="12">
                <center>
                  <IonText className="landingTitlesText">
                    Connect with us on social media to see what designers are up
                    to and some of our favorite pieces from Hemly
                  </IonText>
                </center>
              </IonCol>
              <IonCol className="marginBottomLanding">
                <center>
                  <a
                    href="https://www.instagram.com/hemlyco/?hl=en"
                    style={{ color: "black" }}
                  >
                    <IonIcon
                      icon={logoInstagram}
                      className="ion-margin-horizontal landingLogos"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/Hemly-107192374898401"
                    style={{ color: "black" }}
                  >
                    <IonIcon
                      icon={logoFacebook}
                      className="ion-margin-horizontal landingLogos"
                    />
                  </a>
                  <a
                    href="https://www.tiktok.com/@hemlyco?lang=en"
                    style={{ color: "black" }}
                  >
                    <IonIcon
                      icon={logoTiktok}
                      className="ion-margin-horizontal landingLogos"
                    />
                  </a>
                </center>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  error: state.error,
  contactUs: state.user.contactUs,
});

export default connect(mapStateToProps, {
  ContactUs,
  logout,
})(Landing);
