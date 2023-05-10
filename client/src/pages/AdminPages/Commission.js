import {
  IonAlert,
  IonGrid,
  IonButton,
  IonInput,
  IonItem,
  IonText,
  IonCheckbox,
  IonSelect,
  IonRow,
  IonCol,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonLabel,
  IonContent,
  IonCardHeader,
  IonBackdrop,
  IonLoading,
} from "@ionic/react";
import React from "react";
import "../Page.css";
import BottomMenu from "../../components/BottomMenu";
import ToolbarMobile from "../../components/ToolbarMobile";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  UploadProductCSV,
  UploadInventoryCSV,
  AddCommissions,
} from "../../actions/adminActions";
import { logout } from "../../actions/userActions";

class NewProject extends React.Component {
  constructor(props) {
    var today = new Date();

    super(props);
    this.state = {
      backdrop: false,
      menuClose: false,
      productCSV: "",
      InventoryCSV: "",
      errorEmail: "",
      errorPass: "",
      errorfname: "",
      errorlname: "",
      email: "",
      commission: "",
      showAlert: false,
      alertMsg: "",
      valid: false,
      success: false,
      dateNA: true,
    };
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

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
    if (this.props.addCommission !== prevProps.addCommission) {
      console.log("addCommission-=-=-=", this.props.addCommission);
      if (this.props.addCommission.success == true) {
        this.setState({
          alertMsg: this.props.addCommission.message,
          showAlert: true,
          success: true,
        });
      }
    }
  }
  handleChange = (e) => {
    this.setState({
      registerInfo: {
        ...this.state.registerInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleCallBack = (childData) => {
    this.setState({ menuClose: childData });
  };
  handleMenutoggle = () => {
    document.querySelector(".main_menu").toggle();
  };
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let currentHideNav = window.innerWidth <= 760;

    if (currentHideNav === true) {
      this.setState({ menuClose: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  AddProject = (e) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (this.state.email == "") {
      this.setState({
        errorEmail: "Email cannot be empty",
      });
    } else {
      if (!pattern.test(this.state.email)) {
        this.setState({ validEmail: true });
        this.setState({
          errorEmail: "Please enter valid email address.",
        });
      } else {
        this.setState({ validEmail: false });
        this.setState({
          errorEmail: "",
        });
      }
    }
    if (this.state.commission == "") {
      this.setState({
        errorCommission: "Commission cannot be empty",
      });
    } else {
      this.setState({
        errorCommission: "",
      });
    }
    if (
      this.state.email !== "" &&
      this.state.commission != "" &&
      pattern.test(this.state.email)
    ) {
      this.props.AddCommissions(this.state.email, this.state.commission);
    }
  };

  render() {
    return (
      <>
        <ToolbarMobile />

        <BottomMenu />

        {this.state.backdrop ? (
          // <IonBackdrop visible={true} />
          <IonLoading
            cssClass="my-custom-class"
            isOpen={this.state.backdrop}
            // onDidDismiss={() => this.setState({ backdrop: false })}
            message={"Please wait! Products are being added..."}
            // duration={5000}
          />
        ) : null}
        <IonContent fullscreen>
          <IonAlert
            isOpen={this.state.showAlert}
            onDidDismiss={() => {
              //   if (this.state.projectAdded) {
              //     window.location.reload();
              //   } else {
              this.setState({ showAlert: false });
              //   }
            }}
            cssClass="myALert"
            message={this.state.alertMsg}
            buttons={[
              {
                text: "Okay",
                role: "cancel",
                cssClass: "cashmereAlertBtn",
                handler: () => {
                  if (this.state.success) {
                    this.props.history.go(0);
                  }
                },
              },
            ]}
          />
          <IonGrid className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mobilemarginwithPRojectNAv mt-3 container">
            <IonCard className="ion-justify-content-center  ion-align-items-center  nproject  ">
              <IonCardHeader>
                <IonCardTitle
                  className="  projectCardTitle"
                  style={{ textTransform: "capitalize" }}
                >
                  Commission
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <form id="nprojectForm">
                  <IonRow className="">
                    <IonCol className=" " size="6">
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Enter designer email
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end"
                          type="email"
                          onIonChange={(e) => {
                            this.setState({ email: e.target.value });
                            if (this.state.email == "") {
                              this.setState({
                                errorEmail: "Email cannot be empty",
                              });
                            } else {
                              var pattern = new RegExp(
                                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                              );

                              if (!pattern.test(this.state.email)) {
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
                          value={this.state.email}
                          name="email"
                          placeholder="Enter designer email"
                          required
                          autofocus
                          id="email"
                        />{" "}
                      </IonItem>
                      {/* {this.state.errorEmail != "" ? ( */}
                      <p
                        className=""
                        style={{ color: "red", marginLeft: "16px" }}
                      >
                        {this.state.errorEmail}
                      </p>{" "}
                    </IonCol>
                    <IonCol className=" " size="6">
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Enter total commission
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end"
                          type="text"
                          onIonChange={(e) => {
                            this.setState({ commission: e.target.value });

                            if (this.state.commission == "") {
                              this.setState({
                                errorCommission: "Commission cannot be empty",
                              });
                            } else {
                              this.setState({
                                errorCommission: "",
                              });
                            }
                          }}
                          value={this.state.commission}
                          name="commission"
                          placeholder="Enter total commission"
                          required
                          autofocus
                          id="email"
                        />
                      </IonItem>
                      <p
                        className=""
                        style={{ color: "red", marginLeft: "16px" }}
                      >
                        {this.state.errorCommission}
                      </p>

                      {/* {this.state.errorEmail != "" ? ( */}
                    </IonCol>
                  </IonRow>{" "}
                  <IonRow className="">
                    <IonCol>
                      <center>
                        <IonButton
                          className=" ion-justify-content-end charcoal registerDesigner ion-margin-vertical"
                          onClick={this.AddProject}
                        >
                          Submit
                        </IonButton>
                      </center>
                    </IonCol>
                  </IonRow>{" "}
                </form>{" "}
              </IonCardContent>
            </IonCard>{" "}
          </IonGrid>
        </IonContent>
        {/* </IonPage> */}
        {/* </IonSplitPane> */}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  error: state.error,
  addCommission: state.admin.addCommission,
});
export default connect(mapStateToProps, {
  UploadProductCSV,
  UploadInventoryCSV,
  logout,
  AddCommissions,
})(NewProject);
