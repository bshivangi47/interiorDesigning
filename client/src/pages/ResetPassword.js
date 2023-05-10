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
import { ResetPassword, logout } from "../actions/userActions";

class Reset_Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerInfo: { repassword: "", password: "" },
      errorEmail: "",
      errorPass: "",
      showAlert: false,
      success: false,
      alertMsg: null,
    };
  }

  static propTypes = {
    logout: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    error: PropTypes.object.isRequired,
    ResetPassword: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  componentDidMount() {
    menuController.enable(false);
  }

  handleChange = (e) => {
    this.setState({
      registerInfo: {
        ...this.state.registerInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  resetPassword = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let token = params.get("token");
    if (!token) {
      this.setState({
        alertMsg:
          "This URL is invalid. Please copy paste the URL you received in your email",
        showAlert: true,
      });
    }
    if (this.state.registerInfo.password.length < 8) {
      this.setState({
        errorPass: "Password must have atleast 8 characters",
      });
      var email = document.getElementById("password");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorPass: "" });
      var email = document.getElementById("password");
      email.style.borderColor = "#ddd";
    }
    if (
      this.state.registerInfo.repassword != this.state.registerInfo.password
    ) {
      this.setState({
        errorrePass: "Both the passwords must be same",
      });
      var email = document.getElementById("repassword");
      email.style.borderColor = "red";
    } else if (this.state.registerInfo.repassword == "") {
      this.setState({
        errorrePass: "This field cannot be empty",
      });
      var email = document.getElementById("repassword");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorrePass: "" });
      var email = document.getElementById("repassword");
      email.style.borderColor = "#ddd";
    }

    if (
      this.state.registerInfo.password.length >= 8 &&
      this.state.registerInfo.repassword === this.state.registerInfo.password &&
      this.state.registerInfo.repassword !== "" &&
      token
    ) {
      this.props.ResetPassword(token, this.state.registerInfo.password);
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
    if (this.props.resetPassword != prevProps.resetPassword) {
      if (this.props.resetPassword.success == true) {
        this.setState({
          alertMsg: this.props.resetPassword.message,
          showAlert: true,
          success: true,
        });
      }
      console.log("forgotPassword-=-=-=-=", this.props.resetPassword);

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
              if (this.state.success) {
                this.props.history.push("/login");
              } else {
                this.setState({ showAlert: false });
              }
            }}
            cssClass="alertClass"
            message={this.state.alertMsg}
            buttons={[
              {
                text: "Okay",
                role: "cancel",
                cssClass: "cashmereAlertBtn",
                handler: () => {
                 if (this.state.success) {
                   this.props.history.push("/login");
                 } else {
                   this.setState({ showAlert: false });
                 }
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
                        Reset Password
                      </center>
                    </IonCardTitle>
                  </IonCardHeader>{" "}
                  <IonCardContent>
                    <IonRow
                      className="ion-justify-content-center  ion-align-items-center "
                      // style={{ height: " 100%" }}
                    >
                      <IonCol className="mt-3">
                        <IonItem
                          style={{ border: "1px solid #ddd" }}
                          lines="none"
                          className="forDarkMode "
                        >
                          {/* <IonText className="ion-margin-end  ">Email :</IonText> */}
                          <IonInput
                            className="ion-margin-end  "
                            onIonChange={(e) => {
                              this.handleChange(e);
                              if (this.state.registerInfo.password.length < 8) {
                                this.setState({
                                  errorPass:
                                    "Password must have atleast 8 characters",
                                });
                                var email = document.getElementById("password");
                                email.style.borderColor = "red";
                              } else {
                                this.setState({ errorPass: "" });
                                var email = document.getElementById("password");
                                email.style.borderColor = "#ddd";
                              }
                            }}
                            value={this.state.registerInfo.password}
                            type="password"
                            name="password"
                            placeholder="Enter your new password"
                            required
                            id="password"
                          />
                        </IonItem>
                        {this.state.errorPass != "" ? (
                          <p className="mt-1 mb-2" style={{ color: "red" }}>
                            {this.state.errorPass}
                          </p>
                        ) : null}
                      </IonCol>
                    </IonRow>
                    <IonRow
                      className=" mt-3"
                      // style={{ height: " 100%" }}
                    >
                      <IonCol>
                        <IonItem
                          style={{ border: "1px solid #ddd" }}
                          lines="none"
                          className="forDarkMode"
                        >
                          {/* <IonText className="ion-margin-end ">Password :</IonText> */}
                          <IonInput
                            className="ion-margin-end "
                            onIonChange={(e) => {
                              this.handleChange(e);
                              if (
                                this.state.registerInfo.repassword !==
                                this.state.registerInfo.password
                              ) {
                                this.setState({
                                  errorrePass:
                                    "Both the passwords must be same",
                                });
                                var email = document.getElementById(
                                  "repassword"
                                );
                                email.style.borderColor = "red";
                              } else {
                                this.setState({ errorrePass: "" });
                                var email = document.getElementById(
                                  "repassword"
                                );
                                email.style.borderColor = "#ddd";
                              }
                            }}
                            value={this.state.registerInfo.repassword}
                            type="password"
                            name="repassword"
                            placeholder="Re-enter your password"
                            required
                            id="repassword"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                this.resetPassword();
                              }
                            }}
                          />{" "}
                        </IonItem>
                        <p className="mt-1  mb-2" style={{ color: "red" }}>
                          {this.state.errorrePass}
                        </p>{" "}
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <center>
                          <IonButton
                            className=" ion-justify-content-center LoginBtn registerDesigner"
                            onClick={this.resetPassword}
                          >
                            Reset Password
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
  resetPassword: state.user.resetPassword,
});
export default connect(mapStateToProps, { ResetPassword, logout })(
  Reset_Password
);
