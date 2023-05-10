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
import { GetCompletedProjects } from "../actions/projectActions";
import { logout } from "../actions/userActions";

class PastProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      images: [
        {
          id: 1,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 2,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 3,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 4,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 5,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 6,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 7,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 8,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 9,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 10,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 11,
          image: cafe,
          legend: "this is couch",
        },
        {
          id: 12,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 13,
          image: cafe,
          legend: "this is couch",
        },
      ],
    };

    this.resize();
  }

  static propTypes = {
    GetCompletedProjects: PropTypes.func,
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
    this.props.GetCompletedProjects();
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
    let pastProjects = 0;

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
          <IonGrid className="grid container mobilemarginCart">
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
                  sizeLg="12"
                  sizeMd="12"
                  sizeSm="12"
                  sizeXs="12"
                  style={{
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  <IonCard
                    className="projectCards my-2"
                    style={{
                      textAlign: "center",

                      margin: "auto",
                    }}
                  >
                    <IonCardHeader>
                      <IonCardTitle class="projectCardTitle">
                        You have no past projects
                      </IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              ) : (
                this.state.currentprojects.map((current, index) => {
                  var date = moment(current.createdAt).format("MMMM Do, YYYY");
                  if (current.projectRooms.completed == true) {
                    pastProjects += 1;
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
            {/* {this.state.images == "" || this.state.images == null ? null : (
              <>
                <IonRow className="">
                  <IonCol>
                    <IonTitle className="itemsTitle" style={{ padding: "0" }}>
                      New items added
                    </IonTitle>
                  </IonCol>
                </IonRow>
                <IonRow className="">
                  <IonCol size="12" className="mobilemargin  ">
                    <div class="">
                      <div className="morePhotos mb-2">
                        <small>Click for more photos</small>
                      </div>
                      <IonSlides
                        // pager={true}
                        options={slideOpts}
                        className="swiper-container position-relative"
                        direction="vertical"
                        onIonSlideDidChange={() => {
                          var myswiper = document.querySelector(
                            ".swiper-container"
                          );
                          myswiper.isBeginning().then((result) => {
                            if (result == true) {
                              this.setState({ prevbtn: false });
                            } else {
                              this.setState({ prevbtn: true });
                            }
                          });
                          myswiper.isEnd().then((result) => {
                            if (result == true) {
                              this.setState({ nextbtn: false });
                            } else {
                              this.setState({ nextbtn: true });
                            }
                          });
                        }}
                      >
                        {this.state.images.map((image) => (
                          <IonSlide>
                            <Link
                              to={{
                                pathname: "/itemview",
                                search: `?id=${image.id}`,
                              }}
                              title="Click on the image to see more photos of the item"
                            >
                              <IonImg
                                src={image.image}
                                className="addedItems"
                                shape="round"
                              />
                            </Link>
                          </IonSlide>
                        ))}
                      </IonSlides>

                      {this.state.prevbtn ? (
                        <a onClick={this.prev} className="backBtn">
                          <IonIcon
                            icon={chevronBackCircleOutline}
                            title="Go back"
                          />
                        </a>
                      ) : null}
                      {this.state.nextbtn ? (
                        <a
                          onClick={this.next}
                          className="nextBtn"
                          id="nextBtn"
                          title="Go forward"
                        >
                          <IonIcon icon={chevronForwardCircleOutline} />
                        </a>
                      ) : null}
                    </div>
                  </IonCol>
                </IonRow>
              </>
            )} */}
          </IonGrid>
        </IonContent>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  error: state.error,
  inventory: state.inventory,
  currentProjects: state.project.currentCompletedProjects,
  currentProjectsSuccess: state.project.currentCompletedProjectsSuccess,
  currentProjectsError: state.project.currentCompletedProjectsError,
});
export default connect(mapStateToProps, { GetCompletedProjects, logout })(
  PastProjects
);
