import {
  IonContent,
  IonInput,
  IonButton,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonItem,
  IonCol,
  IonAlert,
} from "@ionic/react";
import React from "react";
import "./Page.css";
import Toolbar from "../components/Toolbar";
import { menuController } from "@ionic/core";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ForgotPassword, logout } from "../actions/userActions";

class Forgot_Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginInfo: { email: "", password: "" },
      errorEmail: "",
      errorPass: "",
      showAlert: false,
      alertMsg: null,
    };
  }

  static propTypes = {
    logout: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  componentDidMount() {
    menuController.enable(false);
  }

  handleChange = (e) => {
    this.setState({
      LoginInfo: {
        ...this.state.LoginInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  forgotPassword = () => {
    let validEmail = false;
    if (this.state.LoginInfo.email == "") {
      this.setState({ errorEmail: "Email cannot be empty" });
      var email = document.getElementById("email");
      email.style.borderColor = "red";
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(this.state.LoginInfo.email)) {
        validEmail = false;
        this.setState({
          errorEmail: "Please enter valid email address.",
        });
      } else {
        validEmail = true;
        this.setState({
          errorEmail: "",
        });
      }
    }

    if (this.state.LoginInfo.email != "" && validEmail === true) {
      this.props.ForgotPassword(this.state.LoginInfo.email);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      this.setState({
        alertMsg: this.props.error.message.message,
        showAlert: true,
      });
      console.log("ERROEMSG___", this.props.error.message);
    }
    if (this.props.forgotPassword != prevProps.forgotPassword) {
      if (this.props.forgotPassword.success == true) {
        this.setState({
          alertMsg: this.props.forgotPassword.message,
          showAlert: true,
        });
      }
      console.log("forgotPassword-=-=-=-=", this.props.forgotPassword);

      // this.props.history.push("/");
    }
  }
  render() {
    if (localStorage.getItem("user")) {
      var user = JSON.parse(localStorage.getItem("user"));
      if (user.role == "client") {
        menuController.enable(true);
        return <Redirect to="/currentprojectsclient" />;
      } else if (user.role == "designer") {
        menuController.enable(true);
        return <Redirect to="/currentprojects" />;
      } else {
        menuController.enable(true);
        return <Redirect to="/admin/Inventory" />;
      }
    }
    return (
      // <IonPage className="">
      <>
        <Toolbar />
        <IonContent
        //   className="wholePage"
        >
          <IonAlert
            isOpen={this.state.showAlert}
            onDidDismiss={() => {
              this.setState({ showAlert: false });
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
          <IonGrid
            style={{ height: "90%", top: "" }}
            // className="d-flex ion-justify-content-center  ion-align-items-center "
          >
            <IonRow
              style={{ height: "90%", top: "" }}
              className="d-flex ion-justify-content-center  ion-align-items-center "
            >
              <IonCol sizeXl="5" sizeMd="8" sizeXs="12">
                <IonCard
                  className=" ion-justify-content-center  ion-align-items-center py-2 "
                  style={{ border: "1px solid #ddd" }}
                >
                  {/*classname=myclass for transparent card */}
                  <IonCardHeader>
                    <IonCardTitle className="projectCardTitle">
                      <center
                        className=""
                        style={{
                          fontSize: "1em",
                          color: "black ",
                          fontWeight: "500",
                        }}
                      >
                        Forgot Password
                      </center>
                    </IonCardTitle>
                  </IonCardHeader>{" "}
                  <IonCardContent>
                    <IonRow
                      className="ion-justify-content-center ion-margin-top ion-margin-bottom ion-align-items-center "
                      // style={{ height: " 100%" }}
                    >
                      <IonCol>
                        <IonItem
                          style={{ border: "1px solid #ddd" }}
                          lines="none"
                          className="forDarkMode"
                        >
                          {/* <IonText className="ion-margin-end  ">Email :</IonText> */}
                          <IonInput
                            autofocus={true}
                            className="ion-margin-end  "
                            onIonChange={(e) => {
                              this.handleChange(e);
                              if (this.state.LoginInfo.email == "") {
                                this.setState({
                                  errorEmail: "Email cannot be empty",
                                });
                                var email = document.getElementById("email");
                                email.style.borderColor = "red";
                              } else {
                                var email = document.getElementById("email");
                                email.style.borderColor = "#ddd";
                                var pattern = new RegExp(
                                  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                                );

                                if (!pattern.test(this.state.LoginInfo.email)) {
                                  this.setState({ validEmail: true });
                                  this.setState({
                                    errorEmail:
                                      "Please enter valid email address.",
                                  });
                                } else {
                                  this.setState({ validEmail: false });
                                  this.setState({
                                    errorEmail: "",
                                  });
                                }
                              }
                            }}
                            value={this.state.LoginInfo.email}
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                            id="email"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                this.forgotPassword();
                              }
                            }}
                          />
                        </IonItem>
                        {this.state.errorEmail != "" ? (
                          <p className="mt-1 mb-2" style={{ color: "red" }}>
                            {this.state.errorEmail}
                          </p>
                        ) : null}
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <center>
                          <IonButton
                            className=" ion-justify-content-center LoginBtn registerDesigner"
                            onClick={this.forgotPassword}
                          >
                            Submit
                          </IonButton>{" "}
                          <p className="mt-2" style={{ fontWeight: "500" }}>
                            Don't have an account?{" "}
                            <a href="/SignUp" style={{ color: "maroon" }}>
                              Sign up here
                            </a>
                          </p>
                        </center>
                      </IonCol>
                    </IonRow>{" "}
                  </IonCardContent>
                </IonCard>
              </IonCol>{" "}
            </IonRow>{" "}
          </IonGrid>{" "}
        </IonContent>{" "}
        {/* </IonPage> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  error: state.error,

  forgotPassword: state.user.forgotPassword,
});
export default connect(mapStateToProps, { ForgotPassword, logout })(
  Forgot_Password
);
