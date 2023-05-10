import {
  IonContent,
  IonGrid,
  IonButton,
  IonCard,
  IonCardTitle,
  IonRow,
  IonCol,
  IonImg,
  IonTitle,
  IonSlides,
  IonSlide,
  IonIcon,
  IonItem,
  IonCardHeader,
} from "@ionic/react";

import React from "react";
import "./Page.css";
import { Link } from "react-router-dom";
// import {
//   chevronBackCircleOutline,
//   chevronForwardCircleOutline,
// } from "ionicons/icons";
// import couch from "../images/couch.jpg";
// import chair from "../images/download.jpg";
// import chairs from "../images/image.jpg";
// import cafe from "../images/backgroundimage.jpg";

import BottomMenu from "../components/BottomMenu";
import Toolbar from "../components/Toolbar";
import ToolbarMobile from "../components/ToolbarMobile";

import { connect } from "react-redux";
import { UpdateProjectStatus, GetProject } from "../actions/projectActions";
import { logout } from "../actions/userActions";
class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuClose: false,
      client: "",
      room: "",
      nextbtn: true,
      prevbtn: false,
      nextbtnpassed: true,
      prevbtnpassed: false,
      projectDetails: null,
    };
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let client = params.get("client");
    let room = params.get("room");
    let projectId = params.get("project");
    this.setState({ client: client, room: room, projectId: projectId });
    const dataToPass = { projectID: atob(projectId) };
    this.props.GetProject(dataToPass);
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  async componentDidUpdate(prevProps) {
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
    if (this.props.getProject !== prevProps.getProject) {
      if (this.props.getProject.success == true) {
        this.setState({
          projectDetails: this.props.getProject.message,
        });
      }
    }
    if (this.props.updateProjectStatus !== prevProps.updateProjectStatus) {
      if (this.props.updateProjectStatus.success == true) {
        this.setState({
          ProjectStatus: this.props.updateProjectStatus.message,
        });
        const dataToPass = { projectID: atob(this.state.projectId) };

        await this.props.GetProject(dataToPass);
        if (this.state.status == true) {
          this.props.history.push("/currentprojects");
        } else {
          this.props.history.push("/pastProjects");
        }
        // await this.props.history.goBack();
      }
    }
  }
  changeProjectStatus = (projectStatus) => {
    this.setState({ status: projectStatus });
    const dataToPass = {
      projectID: atob(this.state.projectId),
      room: this.state.room,
      status: projectStatus,
    };
    this.props.UpdateProjectStatus(dataToPass);
  };
  resize() {
    let currentHideNav = window.innerWidth <= 768;

    if (currentHideNav === true) {
      this.setState({ menuClose: true });
    } else {
      this.setState({ menuClose: false });
    }
  }
  handleCallBack = (childData) => {
    this.setState({ menuClose: childData });
  };
  handleMenutoggle = () => {
    this.setState({ menuClose: false });
  };
  prev = () => {
    var mySwiper = document.querySelector(".swiper-container").swiper;
    mySwiper.slidePrev();
  };
  next = () => {
    var mySwiper = document.querySelector(".swiper-container").swiper;
    mySwiper.slideNext();
  };
  prevpassed = () => {
    var mySwiper = document.querySelector(".swiper-containerpassed").swiper;
    mySwiper.slidePrev();
  };
  nextpassed = () => {
    var mySwiper = document.querySelector(".swiper-containerpassed").swiper;
    mySwiper.slideNext();
  };
  render() {
    const slideOpts = {
      initialSlide: 0,
      speed: 300,
      slidesPerView: this.state.menuClose ? "1" : "3",
    };
    let clientprojectname = this.state.room;
    return (
      <>
        <ToolbarMobile />
        <BottomMenu />
        <IonContent fullscreen>
          <IonGrid
            style={{
              height: "100%",
            }}
          >
            <IonRow
              className="ion-justify-content-center ion-align-items-center"
              style={{
                height: "90%",
              }}
            >
              <IonCol sizeLg="8" sizeMd="12" sizeSm="12">
                <IonGrid className="">
                  <IonRow className="ion-justify-content-center  ion-align-items-center ">
                    <IonCol size="12">
                      {/* <IonCard className="" style={{ margin: "0px" }}>
                  <IonCardHeader style={{ paddingBottom: "20px" }}> */}
                      <IonCardTitle class="projectCardTitle lineAroundText">
                        <span
                          style={{
                            background: "#fff",
                            padding: "0 0 0 10px ",
                            textTransform: "capitalize",
                          }}
                        >
                          {`${this.state.client}'s `}
                        </span>{" "}
                        <span
                          style={{
                            background: "#fff",
                            padding: "0 10px 0 0  ",
                            textTransform: "lowercase",
                          }}
                        >
                          {`${clientprojectname}`} Project
                        </span>
                      </IonCardTitle>
                      {/* </IonCardHeader>
                </IonCard> */}
                    </IonCol>

                    <IonCol
                      // sizeXl="3"
                      //  sizeLg="6"
                      sizeMd="6"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <Link
                        to={{
                          pathname: "/searchDecor",
                          search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                        }}
                      >
                        <IonButton
                          className="checkoutButton "
                          title="Search for Decor"
                        >
                          Search for decor
                        </IonButton>
                      </Link>
                    </IonCol>
                    <IonCol
                      // sizeXl="3"
                      //  sizeLg="6"
                      sizeMd="6"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <Link
                        to={{
                          pathname: "/viewsavedItems",
                          search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                        }}
                      >
                        <IonButton
                          className="checkoutButton "
                          title="  See Saved Items"
                        >
                          See saved items
                        </IonButton>
                      </Link>
                    </IonCol>
                    <IonCol
                      // sizeXl="3"
                      // sizeLg="6"
                      sizeMd="6"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      {" "}
                      <Link
                        to={{
                          pathname: "/viewlikedItems",
                          search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                        }}
                      >
                        <IonButton
                          className="checkoutButton "
                          title="Search for Decor"
                        >
                          See liked items from client
                        </IonButton>{" "}
                      </Link>
                    </IonCol>
                    <IonCol
                      // sizeXl="3"
                      //  sizeLg="6"
                      sizeMd="6"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      {" "}
                      <Link
                        to={{
                          pathname: "/viewpassedItems",
                          search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                        }}
                      >
                        <IonButton
                          className="checkoutButton "
                          title="Search for Decor"
                        >
                          See passed items from client
                        </IonButton>
                      </Link>
                    </IonCol>
                    <IonCol>
                      {this.state.projectDetails != null ? (
                        this.state.projectDetails.projectRooms.completed ==
                        false ? (
                          <IonButton
                            className="cashmere  m-0"
                            style={{ width: "100%" }}
                            // title="Search for Decor"
                            onClick={() => this.changeProjectStatus(true)}
                          >
                            ARCHIVE PROJECT
                          </IonButton>
                        ) : (
                          <IonButton
                            className="cashmere  m-0"
                            style={{ width: "100%" }}
                            onClick={() => this.changeProjectStatus(false)}
                            // title="Search for Decor"
                          >
                            REACTIVATE PROJECT
                          </IonButton>
                        )
                      ) : null}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  error: state.error,
  updateProjectStatus: state.project.updateProjectStatus,
  getProject: state.project.getProject,
});
export default connect(mapStateToProps, {
  UpdateProjectStatus,
  GetProject,
  logout,
})(Project);
