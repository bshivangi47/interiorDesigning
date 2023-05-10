import {
  IonContent,
  IonGrid,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonImg,
  IonBadge,
  IonSpinner,
} from "@ionic/react";

import React from "react";
import "./Page.css";
import moment from "moment";
import { Link } from "react-router-dom";

import livingRoom1 from "../images/livinRoom1.jpg";
import livingRoom2 from "../images/livingRoom2.jpg";
import Bedroom1 from "../images/Bedroom1.jpg";
import Bedroom2 from "../images/Bedroom2.jpg";
import DiningRoom from "../images/DiningRoom.jpg";
import kitchen from "../images/Kitchen.jpg";
import OfficeProject from "../images/OfficeProject.jpg";
import OutsideProject from "../images/OutsideProject.jpg";

import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GetCompletedclientProjects } from "../actions/projectActions";
import { logout } from "../actions/userActions";
class PastProjectsClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      menuClose: false,
      projectRoom1: "DINING ROom",
      projectRoom2: "Bedroom 1",
      currentprojects: [],
    };
  }
  static propTypes = {
    GetCompletedclientProjects: PropTypes.func,
    logout: PropTypes.func,
    currentProjects: PropTypes.array,
    error: PropTypes.object.isRequired,
    currentProjectsclientSuccess: PropTypes.bool,
    currentProjectsclientError: PropTypes.string,
  };
  componentDidMount() {
    this.props.GetCompletedclientProjects();
  }
  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      console.log("ERROEMSG___", this.props.error.id);

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

      if (this.props.currentProjectsclientSuccess == true) {
        this.setState({
          currentprojects: this.props.currentProjects,
          loading: false,
        });
      }
      // this.props.history.push("/");
    }
  }
  handleCallBack = (childData) => {
    this.setState({ menuClose: childData });
  };
  handleMenutoggle = () => {
    // this.setState({ menuClose: false });
    document.querySelector(".main_menu").toggle();
  };
  render() {
    let pastProjectsClient = 0;
    return (
      <>
        <ToolbarMobile />
        <BottomMenu />
        <IonContent fullscreen>
          <IonGrid
            className="grid mobilemarginCart container"
            style={this.state.loading ? { height: "100%", margin: "0" } : null}
          >
            <IonRow
              className=" ion-margin-bottom "
              style={
                this.state.loading ? { height: "100%", margin: "0" } : null
              }
            >
              {this.state.loading ? (
                <IonCol
                  className="  ion-align-items-center d-flex"
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
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
                </IonCol>
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
                    className="projectCards"
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
                        // href={`projectclient?client=${
                        //   current.client_lastname
                        // }&room=${current.projectRooms.room}&project=${btoa(
                        //   current._id
                        // )}`}
                        className="projectCards"
                      >
                        <Link
                          to={{
                            pathname: "/likeItems",
                            search: `?client=${current.client_lastname}&room=${
                              current.projectRooms.room
                            }&project=${btoa(current._id)}`,
                            state: {
                              newItems: true,
                              likeItems: false,
                              passedItems: false,
                            },
                          }}
                          style={{ textDecoration: "none" }}
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
                              <span
                                className="captions"
                                style={{ color: "rgb(115,115,115)" }}
                              >{`Started ${date}`}</span>
                            </center>
                          </IonCardContent>
                        </Link>
                      </IonCard>
                      {/* <IonBadge
                        color="danger"
                        className="ion-float-right badge position-relative"
                      >
                        {current.notifications}
                      </IonBadge> */}
                    </IonCol>
                  );
                })
              )}
            </IonRow>{" "}
          </IonGrid>
        </IonContent>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  error: state.error,

  currentProjects: state.project.currentCompletedclientProjects,
  currentProjectsclientSuccess:
    state.project.currentCompletedProjectsclientSuccess,
  currentProjectsclientError: state.project.currentCompletedProjectsclientError,
});
export default connect(mapStateToProps, { GetCompletedclientProjects, logout })(
  PastProjectsClient
);
