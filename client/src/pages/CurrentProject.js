import {
  IonContent,
  IonGrid,
  IonCard,
  IonCardHeader,
  IonBadge,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonImg,
  IonTitle,
  IonSlides,
  IonSlide,
  IonIcon,
  IonAlert,
  IonSpinner,
} from "@ionic/react";
import moment from "moment";

import { Link } from "react-router-dom";
import {
  chevronBackCircleOutline,
  chevronForwardCircleOutline,
} from "ionicons/icons";
import React from "react";
import "./Page.css";
import livingRoom1 from "../images/livinRoom1.jpg";
import livingRoom2 from "../images/livingRoom2.jpg";
import Bedroom1 from "../images/Bedroom1.jpg";
import Bedroom2 from "../images/Bedroom2.jpg";
import DiningRoom from "../images/DiningRoom.jpg";
import kitchen from "../images/Kitchen.jpg";
import OfficeProject from "../images/OfficeProject.jpg";
import OutsideProject from "../images/OutsideProject.jpg";

import couch from "../images/couch.jpg";
import chair from "../images/download.jpg";
import chairs from "../images/image.jpg";

import cafe from "../images/backgroundimage.jpg";
import BottomMenu from "../components/BottomMenu";
import { withRouter } from "react-router";
import ToolbarMobile from "../components/ToolbarMobile";
import ToolbarProjects from "../components/ToolbarProjects";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  GetProjects,
  GetTotalCompletedProjects,
} from "../actions/projectActions";
import { logout, GetUser } from "../actions/userActions";

class CurrentProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCompletedprojects: 0,
      totalCommission: 0,
      hideNav: window.innerWidth <= 760,
      showAlert: false,
      alertMsg: null,
      swiper: [],
      nextbtn: true,
      loading: true,
      prevbtn: false,
      projectRoom1: "Living ROom 2",
      projectRoom2: "Office",
      currentprojects: [],
    };

    this.resize();
  }

  static propTypes = {
    GetProjects: PropTypes.func,
    logout: PropTypes.func,
    currentProjects: PropTypes.array,
    error: PropTypes.object.isRequired,
    currentProjectsSuccess: PropTypes.bool,
    currentProjectsError: PropTypes.string,
  };
  handleCallBack = (childData) => {
    this.setState({ menuClose: childData });
  };
  handleMenutoggle = () => {
    // this.setState({ menuClose: false });
    document.querySelector(".main_menu").toggle();
  };
  componentDidMount() {
    this.props.GetProjects();
    this.props.GetTotalCompletedProjects();
    this.props.GetUser();
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
    if (this.props.currentProjects !== prevProps.currentProjects) {
      console.log("currentProjects-=-=-=-=", this.props.currentProjects);

      if (this.props.currentProjectsSuccess == true) {
        this.setState({
          currentprojects: this.props.currentProjects,
          loading: false,
        });
      }
      // this.props.history.push("/");
    }
    if (
      this.props.getTotalCompletedProjects !==
      prevProps.getTotalCompletedProjects
    ) {
      console.log(
        "getTotalCompletedProjectsMessage-=-=-=-=",
        this.props.getTotalCompletedProjects
      );

      if (this.props.getTotalCompletedProjects.success == true) {
        this.setState({
          totalCompletedprojects: this.props.getTotalCompletedProjects.message,
        });
      }
      // this.props.history.push("/");
    }
    if (this.props.getUser != prevProps.getUser) {
      // console.log("getUser", this.props.getUser);
      if (this.props.getUser.success == true) {
        this.setState({
          totalCommission: this.props.getUser.message.totalCommission,
        });
      }
    }
  }
  resize() {
    let currentHideNav = window.innerWidth <= 768;

    if (currentHideNav === true) {
      this.setState({ menuClose: true });
    } else {
      this.setState({ menuClose: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  prev = () => {
    var mySwiper = document.querySelector(".swiper-container").swiper;
    var myswiper = document.querySelector(".swiper-container");
    mySwiper.slidePrev();
  };
  next = () => {
    var mySwiper = document.querySelector(".swiper-container").swiper;
    mySwiper.slideNext();
  };
  render() {
    const slideOpts = {
      initialSlide: 0,
      speed: 300,
      slidesPerView: this.state.menuClose ? "1" : "3",
    };
    console.log("currentprojects", this.state.currentprojects);
    return (
      <>
        <ToolbarMobile />
        <ToolbarProjects />
        <IonContent fullscreen>
          <BottomMenu />
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
          <IonGrid className="grid mobilemarginCart container">
            <IonRow
              className=" ion-justify-content-center  ion-align-items-center "
              sticky
            >
              <IonCol sizeXl="3" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="6">
                <IonCard className=" YTD">
                  <IonCardContent className="">
                    <div
                      style={{
                        textAlign: "center",
                        padding: "5px",
                        color: "whitesmoke",
                        letterSpacing: "1px",
                      }}
                    >
                      $ {this.state.totalCommission}
                    </div>
                    <p
                      style={{
                        textAlign: "center",
                        color: "whitesmoke",
                        letterSpacing: "1px",
                        lineHeight: "1.3",
                      }}
                    >
                      Commission earned
                    </p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol sizeXl="3" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="6">
                <IonCard className=" YTDprojects">
                  <IonCardContent>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "5px",
                        color: "whitesmoke",
                        letterSpacing: "1px",
                      }}
                    >
                      {this.state.totalCompletedprojects}
                    </div>
                    <p
                      style={{
                        textAlign: "center",
                        color: "whitesmoke",
                        letterSpacing: "1px",
                        lineHeight: "1.3",
                      }}
                    >
                      Projects completed
                    </p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            {console.log(
              "this.state.currentprojects.length-=-=-=",
              this.state.currentprojects.length
            )}
            <IonRow className="mt-2">
              {this.state.loading ? (
                <div
                  className="my-5  ion-align-items-center d-flex"
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <IonSpinner
                    name="circles"
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                      margin: "auto",
                    }}
                  />
                </div>
              ) : this.state.currentprojects.length == 0 ? (
                <IonCol
                  sizeXl="6"
                  sizeLg="6"
                  sizeMd="12"
                  sizeSm="12"
                  sizeXs="12"
                  style={
                    {
                      // textAlign: "center",
                      // margin: "auto",
                    }
                  }
                >
                  <IonCard
                    href={`project?client=${"Sample"}&room=${"living room"}`}
                    className="projectCards"
                  >
                    <IonCardHeader>
                      <IonCardTitle class="projectCardTitle">
                        <span style={{ textTransform: "capitalize" }}>
                          {`Sample `}
                        </span>
                        <span style={{ textTransform: "lowercase" }}>
                          {`living room`}
                          {` project`}
                        </span>
                      </IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                      <IonImg src={livingRoom1} className="currentprojects" />
                      {/* <center className="mt-3">
                        <span className="captions">{`Started $}`}</span>
                      </center> */}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ) : (
                this.state.currentprojects.map((current) => {
                  var date = moment(current.createdAt).format("MMMM Do, YYYY");
                  if (current.projectRooms.completed !== true) {
                    return (
                      <IonCol
                        sizeXl="6"
                        sizeLg="6"
                        sizeMd="12"
                        sizeSm="12"
                        sizeXs="12"
                        key={current._id}
                      >
                        <IonCard
                          href={`project?client=${
                            current.client_lastname
                          }&room=${current.projectRooms.room}&project=${btoa(
                            current._id
                          )}`}
                          className="projectCards"
                        >
                          <IonCardHeader>
                            <IonCardTitle class="projectCardTitle">
                              <span style={{ textTransform: "capitalize" }}>
                                {`${current.client_lastname}'s `}
                              </span>
                              <span style={{ textTransform: "lowercase" }}>
                                {`${current.projectRooms.room}`}
                                {` project`}
                              </span>
                            </IonCardTitle>
                          </IonCardHeader>

                          <IonCardContent>
                            <IonImg
                              src={
                                current.projectRooms.room.toLowerCase() ==
                                "living room"
                                  ? livingRoom1
                                  : current.projectRooms.room.toLowerCase() ==
                                    "living room 2"
                                  ? livingRoom2
                                  : current.projectRooms.room.toLowerCase() ==
                                    "bedroom 1"
                                  ? Bedroom1
                                  : current.projectRooms.room.toLowerCase() ==
                                    "bedroom 2"
                                  ? Bedroom2
                                  : current.projectRooms.room.toLowerCase() ==
                                    "dining room"
                                  ? DiningRoom
                                  : current.projectRooms.room.toLowerCase() ==
                                    "kitchen"
                                  ? kitchen
                                  : current.projectRooms.room.toLowerCase() ==
                                    "outside space"
                                  ? OutsideProject
                                  : current.projectRooms.room.toLowerCase() ==
                                    "office"
                                  ? OfficeProject
                                  : livingRoom2
                              }
                              className="currentprojects"
                            />
                            <center className="mt-3">
                              <span className="captions">
                                {`Started ${date}`}
                              </span>
                            </center>
                          </IonCardContent>
                        </IonCard>
                        {/* <IonBadge
                        color="danger"
                        className="ion-float-right badge position-relative"
                      >
                        {current.notifications}
                      </IonBadge> */}
                      </IonCol>
                    );
                  }
                })
              )}
            </IonRow>
          </IonGrid>
        </IonContent>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  getUser: state.user.getUser,
  error: state.error,
  inventory: state.inventory,
  currentProjects: state.project.currentProjects,
  currentProjectsSuccess: state.project.currentProjectsSuccess,
  currentProjectsError: state.project.currentProjectsError,
  getTotalCompletedProjects: state.project.getTotalCompletedProjects,
});
export default connect(mapStateToProps, {
  GetProjects,
  GetTotalCompletedProjects,
  logout,
  GetUser,
})(CurrentProject);
