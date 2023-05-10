import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonItem,
  IonCol,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonAlert,
} from "@ionic/react";
import React from "react";
import Toolbar from "../components/Toolbar";
import "./Page.css";
import { menuController } from "@ionic/core";
import { Redirect } from "react-router-dom";
import { signup, logout } from "../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class DesignerSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerInfo: {
        email: "",
        password: "",
        reemail: "",
        repassword: "",
        fname: "",
        lname: "",
      },
      loginas: "designer",
      correctURL: true,
      errorEmail: "",
      errorPass: "",
      errorfname: "",
      errorlname: "",
      signupas: "client",
      showAlert: false,
      alertMsg: "",
    };
  }
  static propTypes = {
    logout: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired,
    user: PropTypes.object,
  };
  handleChange = (e) => {
    this.setState({
      registerInfo: {
        ...this.state.registerInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidMount() {
    menuController.enable(false);
    if (window.location.pathname == "/clientsignup") {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let email = params.get("email");
      console.log("params.email", email);
      if (email !== "" && email !== null && email) {
        this.setState({
          registerInfo: {
            ...this.state.registerInfo,
            email: atob(email),
            // reemail: atob(email),
          },
          loginas: "client",
        });
      } else {
        this.setState({
          showAlert: true,
          alertMsg: "The URL is not valid. Please contact your designer",
          correctURL: false,
        });
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      if (this.props.error.id === "REGISTER_FAIL") {
        this.setState({
          alertMsg: this.props.error.message.message,
          showAlert: true,
        });
        console.log("ERROEMSG___", this.props.error.message);
      }
    }
    if (this.props.isLoggedIn) {
      console.log("user-=-=-=-=", this.props.user);
      // this.props.history.push("/");
    }
  }
  registerDesigner = () => {
    let validEmail = false;
    if (this.state.registerInfo.fname == "") {
      this.setState({
        errorfname: "First name cannot be empty",
      });
      var email = document.getElementById("fname");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorfname: "" });
      var email = document.getElementById("fname");
      email.style.borderColor = "#ddd";
    }
    if (this.state.registerInfo.lname == "") {
      this.setState({
        errorlname: "Last name cannot be empty",
      });
      var email = document.getElementById("lname");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorlname: "" });
      var email = document.getElementById("lname");
      email.style.borderColor = "#ddd";
    }
    if (this.state.registerInfo.email == "") {
      this.setState({ errorEmail: "Email cannot be empty" });
      var email = document.getElementById("email");
      email.style.borderColor = "red";
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(this.state.registerInfo.email)) {
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
    if (this.state.registerInfo.reemail != this.state.registerInfo.email) {
      this.setState({
        errorreEmail: "Both the Email must be same",
      });
      var email = document.getElementById("reemail");
      email.style.borderColor = "red";
    } else if (this.state.registerInfo.reemail == "") {
      this.setState({
        errorreEmail: "This field cannot be empty",
      });
      var email = document.getElementById("reemail");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorreEmail: "" });
      var email = document.getElementById("reemail");
      email.style.borderColor = "#ddd";
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
      this.state.registerInfo.fname !== "" &&
      this.state.registerInfo.lname !== "" &&
      this.state.registerInfo.reemail !== "" &&
      this.state.registerInfo.reemail === this.state.registerInfo.email &&
      this.state.registerInfo.email !== "" &&
      this.state.registerInfo.password.length >= 8 &&
      this.state.registerInfo.repassword === this.state.registerInfo.password &&
      this.state.registerInfo.repassword !== "" &&
      validEmail === true
    ) {
      console.log(
        "redirect to another page that will take W9 and demographic info from designer "
      );
      const postData = {
        firstname: this.state.registerInfo.fname,
        lastname: this.state.registerInfo.lname,
        email: this.state.registerInfo.reemail,
        password: this.state.registerInfo.password,
        role: this.state.loginas,
      };
      console.log("postData-=-=-=", postData);
      this.props.signup(postData);
    }
  };
  render() {
    if (localStorage.getItem("token")) {
      var token = JSON.parse(localStorage.getItem("user"));
      if (token.role == "client") {
        menuController.enable(true);
        return <Redirect to="/currentprojectsclient" />;
      } else if (token.role == "designer") {
        menuController.enable(true);
        return <Redirect to="/explore" />;
      }
    }
    return (
      <>
        <Toolbar />
        {console.log("role-=-=-=-=-=", this.state.loginas)}
        <IonContent className="wholePage2">
          <IonAlert
            isOpen={this.state.showAlert}
            onDidDismiss={() => {
              if (this.state.correctURL) {
                this.setState({ showAlert: false });
              } else {
                this.props.history.push("/");
              }
            }}
            cssClass="myALert"
            message={this.state.alertMsg}
            buttons={[
              {
                text: "Okay",
                role: "cancel",
                cssClass: "cashmereAlertBtn",
              },
            ]}
          />
          <IonGrid className=" ion-justify-content-center  ion-align-items col-lg-7 col-md-7 col-sm-12 col-xs-12 grid">
            <IonCard className="myclass ion-justify-content-center  ion-align-items-center  ">
              <IonCardHeader>
                <IonCardTitle className="projectCardTitle">
                  <center
                    className=""
                    style={{
                      fontSize: "1em",
                      color: "#283845 ",
                      fontWeight: "500",
                    }}
                  >
                    {this.state.loginas == "client"
                      ? "Welcome to Hemly, please save your login information"
                      : " Join our beta and explore"}
                  </center>
                </IonCardTitle>
              </IonCardHeader>{" "}
              <IonCardContent>
                <IonRow className="">
                  <IonCol
                    sizeXl="6"
                    sizeLg="12"
                    sizeMd="12"
                    sizeSm="12"
                    sizeXs="12"
                  >
                    <IonItem className="forDarkMode">
                      {/* <IonText className="ion-margin-end ">First Name</IonText> */}
                      <IonInput
                        className="ion-margin-end "
                        onIonChange={(e) => {
                          this.handleChange(e);
                          if (this.state.registerInfo.fname == "") {
                            this.setState({
                              errorfname: "First name cannot be empty",
                            });
                            var email = document.getElementById("fname");
                            email.style.borderColor = "red";
                          } else {
                            this.setState({ errorfname: "" });
                            var email = document.getElementById("fname");
                            email.style.borderColor = "#ddd";
                          }
                        }}
                        value={this.state.registerInfo.fname}
                        type="text"
                        name="fname"
                        placeholder="Enter your First Name"
                        required
                        style={{ textTransform: "capitalize" }}
                        autofocus
                        id="fname"
                      />{" "}
                    </IonItem>
                    {this.state.errorfname != "" ? (
                      <p style={{ color: "red", marginLeft: "16px" }}>
                        {this.state.errorfname}
                      </p>
                    ) : null}
                  </IonCol>{" "}
                  <IonCol
                    sizeXl="6"
                    sizeLg="12"
                    sizeMd="12"
                    sizeSm="12"
                    sizeXs="12"
                  >
                    <IonItem className="forDarkMode">
                      {/* <IonText className="ion-margin-end ">Last Name</IonText> */}
                      <IonInput
                        className="ion-margin-end "
                        onIonChange={(e) => {
                          this.handleChange(e);
                          if (this.state.registerInfo.lname == "") {
                            this.setState({
                              errorlname: "Last name cannot be empty",
                            });
                            var email = document.getElementById("lname");
                            email.style.borderColor = "red";
                          } else {
                            this.setState({ errorlname: "" });
                            var email = document.getElementById("lname");
                            email.style.borderColor = "#ddd";
                          }
                        }}
                        style={{ textTransform: "capitalize" }}
                        value={this.state.registerInfo.lname}
                        type="text"
                        name="lname"
                        placeholder="Enter your Last Name"
                        required
                        id="lname"
                      />
                    </IonItem>{" "}
                    {this.state.errorlname != "" ? (
                      <p style={{ color: "red", marginLeft: "16px" }}>
                        {this.state.errorlname}
                      </p>
                    ) : null}
                  </IonCol>{" "}
                </IonRow>
                <IonRow className=" ">
                  <IonCol sizeSm="12">
                    <IonItem className="forDarkMode">
                      {/* <IonText className="ion-margin-end ">Email</IonText> */}
                      <IonInput
                        className="ion-margin-end "
                        disabled={this.state.loginas == "client" ? true : false}
                        onIonChange={(e) => {
                          this.handleChange(e);
                          if (this.state.registerInfo.email == "") {
                            this.setState({
                              errorEmail: "Email cannot be empty",
                            });
                            var email = document.getElementById("email");
                            email.style.borderColor = "red";
                          } else {
                            var pattern = new RegExp(
                              /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                            );

                            if (!pattern.test(this.state.registerInfo.email)) {
                              this.setState({
                                errorEmail: "Please enter valid email address.",
                              });
                            } else {
                              this.setState({
                                errorEmail: "",
                              });
                            }
                          }
                        }}
                        value={this.state.registerInfo.email}
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        required
                        id="email"
                      />{" "}
                    </IonItem>
                    {this.state.errorEmail != "" ? (
                      <p
                        className=""
                        style={{ color: "red", marginLeft: "16px" }}
                      >
                        {this.state.errorEmail}
                      </p>
                    ) : null}
                  </IonCol>
                </IonRow>
                <IonRow className="">
                  <IonCol>
                    <IonItem className="forDarkMode">
                      {/* <IonText className="ion-margin-end "> */}
                      {/* Re-enter Email */}
                      {/* </IonText> */}
                      <IonInput
                        className="ion-margin-end "
                        // disabled={this.state.loginas == "client" ? true : false}
                        onIonChange={(e) => {
                          this.handleChange(e);
                          if (
                            this.state.registerInfo.reemail !==
                            this.state.registerInfo.email
                          ) {
                            this.setState({
                              errorreEmail: "Both the Email must be same",
                            });
                            var email = document.getElementById("reemail");
                            email.style.borderColor = "red";
                          } else {
                            this.setState({ errorreEmail: "" });
                            var email = document.getElementById("reemail");
                            email.style.borderColor = "#ddd";
                          }
                        }}
                        value={this.state.registerInfo.reemail}
                        type="email"
                        name="reemail"
                        placeholder="Re-enter your email"
                        required
                        id="reemail"
                      />{" "}
                    </IonItem>
                    {this.state.errorreEmail != "" ? (
                      <p
                        className=""
                        style={{ color: "red", marginLeft: "16px" }}
                      >
                        {this.state.errorreEmail}
                      </p>
                    ) : null}
                  </IonCol>
                </IonRow>
                <IonRow className="">
                  <IonCol>
                    <IonItem className="forDarkMode">
                      {/* <IonText className="ion-margin-end">Password</IonText> */}
                      <IonInput
                        className="ion-margin-end"
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
                        placeholder="Enter your password"
                        required
                        id="password"
                      />
                    </IonItem>
                    {this.state.errorPass ? (
                      <p
                        className="mt-1  mb-2"
                        style={{ color: "red", marginLeft: "16px" }}
                      >
                        {this.state.errorPass}
                      </p>
                    ) : null}
                  </IonCol>
                </IonRow>
                <IonRow className="">
                  <IonCol>
                    <IonItem className="forDarkMode">
                      {/* <IonText className="ion-margin-end">
                        Re-enter Password
                      </IonText> */}
                      <IonInput
                        className="ion-margin-end"
                        onIonChange={(e) => {
                          this.handleChange(e);
                          if (
                            this.state.registerInfo.repassword !==
                            this.state.registerInfo.password
                          ) {
                            this.setState({
                              errorrePass: "Both the passwords must be same",
                            });
                            var email = document.getElementById("repassword");
                            email.style.borderColor = "red";
                          } else {
                            this.setState({ errorrePass: "" });
                            var email = document.getElementById("repassword");
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
                            this.registerDesigner();
                          }
                        }}
                      />
                    </IonItem>
                    {this.state.errorrePass ? (
                      <p
                        className="mt-1  mb-2"
                        style={{ color: "red", marginLeft: "16px" }}
                      >
                        {this.state.errorrePass}
                      </p>
                    ) : null}
                  </IonCol>
                </IonRow>
                <IonRow className="">
                  <IonCol>
                    <>
                      {this.state.loginas == "client" ? (
                        <p className="mt-2" style={{ fontWeight: "500" }}>
                          By creating an account you agree to Hemly's{" "}
                          <a href="/privacyPolicy">Privacy Policy</a> and{" "}
                          <a href="/endUserLicenseAgreement">
                            End user License Agreement
                          </a>
                        </p>
                      ) : (
                        <p>
                          By creating an account you agree to Hemly's{" "}
                          <a href="/privacyPolicy">Privacy Policy</a>,{" "}
                          <a href="/independentContractorAgreement">
                            {" "}
                            Independent Contractor Agreement
                          </a>{" "}
                          and{" "}
                          <a href="/endUserLicenseAgreement">
                            End user License Agreement
                          </a>
                        </p>
                      )}
                    </>
                    <center>
                      <IonButton
                        className=" ion-justify-content-end LoginBtn registerDesigner"
                        onClick={this.registerDesigner}
                      >
                        {this.state.loginas == "client"
                          ? "Save & Proceed"
                          : "Join now"}
                      </IonButton>

                      <p
                        className="mt-2"
                        style={{ color: " #283845", fontWeight: "500" }}
                      >
                        Already have an account?{" "}
                        <a href="/login" style={{ color: "#283845" }}>
                          Login here
                        </a>
                      </p>
                    </center>
                  </IonCol>
                </IonRow>{" "}
              </IonCardContent>
            </IonCard>{" "}
          </IonGrid>
        </IonContent>{" "}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  error: state.error,
  token: state.user.token,
  user: state.user,
});
export default connect(mapStateToProps, { signup, logout })(DesignerSignUp);
