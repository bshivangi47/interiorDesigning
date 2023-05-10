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
  IonCardSubtitle,
  IonDatetime,
} from "@ionic/react";
import React from "react";
import "../Page.css";
import BottomMenu from "../../components/BottomMenu";
import ToolbarMobile from "../../components/ToolbarMobile";
import moment from "moment";
import { connect } from "react-redux";
import {
  GetTotalDesigner,
  NewProjectsperDesigner,
  SavedItemsperProject,
  PerdesignerPurchase,
  PerProjectPurchase,
  SpendperDesigner,
  GetTotalDesignerByTimeRange,
  GetTotalProjectsTimeRange,
} from "../../actions/adminActions";
import { logout } from "../../actions/userActions";
import { contractOutline } from "ionicons/icons";

class Dashboard extends React.Component {
  constructor(props) {
    var today = moment().utcOffset(0);
    today.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    var todayProject = moment().utcOffset(0);
    todayProject.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    super(props);
    this.state = {
      perDesignerPurchase: 0,
      perProjectPurchase: 0,
      totalDesignersByTimeRange: 0,
      totalProjectsByTimeRange: 0,
      spendPerDesigner: 0,
      designerTimeRange: {
        startDate: today.toISOString(),
        endDate: today.add(1, "day").toISOString(),
      },
      ProjectTimeRange: {
        startDate: todayProject.toISOString(),
        endDate: todayProject.add(1, "day").toISOString(),
      },
    };
  }
  componentDidMount() {
    this.props.GetTotalDesigner();
    this.props.NewProjectsperDesigner();
    this.props.SavedItemsperProject();
    this.props.PerdesignerPurchase();
    this.props.PerProjectPurchase();
    this.props.SpendperDesigner();
    this.props.GetTotalDesignerByTimeRange(
      this.state.designerTimeRange.startDate,
      this.state.designerTimeRange.endDate
    );
    this.props.GetTotalProjectsTimeRange(
      this.state.designerTimeRange.startDate,
      this.state.designerTimeRange.endDate
    );
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
    if (this.props.totalDesigner !== prevProps.totalDesigner) {
      if (this.props.totalDesigner.success == true) {
        this.setState({
          totalDesigner: this.props.totalDesigner.message,
        });
      }
    }
    if (
      this.props.newProjectsperDesigner !== prevProps.newProjectsperDesigner
    ) {
      if (this.props.newProjectsperDesigner.success == true) {
        this.setState({
          newProjectsperDesigner: this.props.newProjectsperDesigner.message,
        });
      }
    }
    if (this.props.savedItemsPerProject !== prevProps.savedItemsPerProject) {
      if (this.props.savedItemsPerProject.success == true) {
        this.setState({
          savedItemsPerProject: this.props.savedItemsPerProject.message,
        });
      }
    }
    if (this.props.perDesignerPurchase !== prevProps.perDesignerPurchase) {
      if (this.props.perDesignerPurchase.success == true) {
        this.setState({
          perDesignerPurchase: this.props.perDesignerPurchase.message,
        });
      }
    }
    if (this.props.perProjectPurchase !== prevProps.perProjectPurchase) {
      if (this.props.perProjectPurchase.success == true) {
        this.setState({
          perProjectPurchase: this.props.perProjectPurchase.message,
        });
      }
    }
    if (this.props.spendPerDesigner !== prevProps.spendPerDesigner) {
      if (this.props.spendPerDesigner.success == true) {
        this.setState({
          spendPerDesigner: this.props.spendPerDesigner.message,
        });
      }
    }
    if (
      this.props.totalDesignersByTimeRange !==
      prevProps.totalDesignersByTimeRange
    ) {
      if (this.props.totalDesignersByTimeRange.success == true) {
        this.setState({
          totalDesignersByTimeRange:
            this.props.totalDesignersByTimeRange.message.total,
        });
      }
    }
    if (
      this.props.totalProjectsByTimeRange !== prevProps.totalProjectsByTimeRange
    ) {
      if (this.props.totalProjectsByTimeRange.success == true) {
        this.setState({
          totalProjectsByTimeRange:
            this.props.totalProjectsByTimeRange.message.total,
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
          <IonGrid className=" mobilemarginwithPRojectNAv container mt-3">
            <IonRow>
              <IonCol sizeXl="4" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
                <IonCard className="ion-justify-content-center  ion-align-items-center    ">
                  <IonCardHeader>
                    <IonCardSubtitle
                      className="  "
                      style={{
                        // textTransform: "capitalize",
                        color: "black",
                        textAlign: "center",
                        fontSize: "1.2rem",
                        fontWeight: "400",
                      }}
                    >
                      Number of total designers that signed up
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent style={{ textAlign: "center" }}>
                    <IonCardTitle className="  ">
                      {this.state.totalDesigner}
                    </IonCardTitle>
                  </IonCardContent>
                </IonCard>{" "}
              </IonCol>

              <IonCol sizeXl="4" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
                <IonCard className="ion-justify-content-center  ion-align-items-center    ">
                  <IonCardHeader>
                    <IonCardSubtitle
                      className="  "
                      style={{
                        // textTransform: "capitalize",
                        color: "black",
                        textAlign: "center",
                        fontSize: "1.2rem",
                        fontWeight: "400",
                      }}
                    >
                      Average new projects per designer (running total)
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent style={{ textAlign: "center" }}>
                    <IonCardTitle className="  ">
                      {this.state.newProjectsperDesigner}
                    </IonCardTitle>
                  </IonCardContent>
                </IonCard>{" "}
              </IonCol>
              <IonCol sizeXl="4" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
                <IonCard className="ion-justify-content-center  ion-align-items-center    ">
                  <IonCardHeader>
                    <IonCardSubtitle
                      className="  "
                      style={{
                        // textTransform: "capitalize",
                        color: "black",
                        textAlign: "center",
                        fontSize: "1.2rem",
                        fontWeight: "400",
                      }}
                    >
                      Number of saved items per project
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent style={{ textAlign: "center" }}>
                    <IonCardTitle className="  ">
                      {this.state.savedItemsPerProject}
                    </IonCardTitle>
                  </IonCardContent>
                </IonCard>{" "}
              </IonCol>

              <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
                <IonCard className="ion-justify-content-center  ion-align-items-center    ">
                  <IonCardHeader>
                    <IonCardSubtitle
                      className="  "
                      style={{
                        // textTransform: "capitalize",
                        color: "black",
                        textAlign: "center",
                        fontSize: "1.2rem",
                        fontWeight: "400",
                      }}
                    >
                      New designer sign ups by time range
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent className="text-center">
                    <IonItem lines="none">
                      <IonLabel>Start Date</IonLabel>
                      <input
                        type="date"
                        id="birthday"
                        name="startDate"
                        value={moment(
                          this.state.designerTimeRange.startDate
                        ).format("YYYY-MM-DD")}
                        onChange={(e) => {
                          this.setState({
                            designerTimeRange: {
                              ...this.state.designerTimeRange,
                              startDate: moment.utc(e.target.value).format(),
                            },
                          });
                        }}
                      />
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>End Date</IonLabel>
                      <input
                        type="date"
                        id="birthday"
                        name="startDate"
                        value={moment(
                          this.state.designerTimeRange.endDate
                        ).format("YYYY-MM-DD")}
                        onChange={(e) => {
                          this.setState({
                            designerTimeRange: {
                              ...this.state.designerTimeRange,
                              endDate: moment.utc(e.target.value).format(),
                            },
                          });
                        }}
                      />
                    </IonItem>
                    <div className="d-flex justify-content-end mr-3">
                      <IonButton
                        className="charcoal  "
                        onClick={(e) => {
                          this.props.GetTotalDesignerByTimeRange(
                            this.state.designerTimeRange.startDate,
                            this.state.designerTimeRange.endDate
                          );
                        }}
                      >
                        Get Designers
                      </IonButton>
                    </div>

                    <IonCardTitle className="text-center  ">
                      {this.state.totalDesignersByTimeRange}
                    </IonCardTitle>
                  </IonCardContent>
                </IonCard>{" "}
              </IonCol>
              <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
                <IonCard className="ion-justify-content-center  ion-align-items-center    ">
                  <IonCardHeader>
                    <IonCardSubtitle
                      className="  "
                      style={{
                        // textTransform: "capitalize",
                        color: "black",
                        textAlign: "center",
                        fontSize: "1.2rem",
                        fontWeight: "400",
                      }}
                    >
                      New projects created by time range
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent className="text-center">
                    <IonItem lines="none">
                      <IonLabel>Start Date</IonLabel>
                      <input
                        type="date"
                        id="birthday"
                        name="startDate"
                        value={moment(
                          this.state.ProjectTimeRange.startDate
                        ).format("YYYY-MM-DD")}
                        onChange={(e) => {
                          this.setState({
                            ProjectTimeRange: {
                              ...this.state.ProjectTimeRange,
                              startDate: moment.utc(e.target.value).format(),
                            },
                          });
                        }}
                      />
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>End Date</IonLabel>
                      <input
                        type="date"
                        id="birthday"
                        name="startDate"
                        value={moment(
                          this.state.ProjectTimeRange.endDate
                        ).format("YYYY-MM-DD")}
                        onChange={(e) => {
                          this.setState({
                            ProjectTimeRange: {
                              ...this.state.ProjectTimeRange,
                              endDate: moment.utc(e.target.value).format(),
                            },
                          });
                        }}
                      />
                    </IonItem>
                    <div className="d-flex justify-content-end mr-3">
                      <IonButton
                        className="charcoal  "
                        onClick={(e) => {
                          this.props.GetTotalProjectsTimeRange(
                            this.state.ProjectTimeRange.startDate,
                            this.state.ProjectTimeRange.endDate
                          );
                        }}
                      >
                        Get Projects
                      </IonButton>
                    </div>

                    <IonCardTitle className="text-center  ">
                      {this.state.totalProjectsByTimeRange}
                    </IonCardTitle>
                  </IonCardContent>
                </IonCard>{" "}
              </IonCol>

              <IonCol sizeXl="4" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
                <IonCard className="ion-justify-content-center  ion-align-items-center    ">
                  <IonCardHeader>
                    <IonCardSubtitle
                      className="  "
                      style={{
                        // textTransform: "capitalize",
                        color: "black",
                        textAlign: "center",
                        fontSize: "1.2rem",
                        fontWeight: "400",
                      }}
                    >
                      Percent of designers who made a purchase for themselves
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent style={{ textAlign: "center" }}>
                    <IonCardTitle className="  ">
                      {(this.state.perDesignerPurchase * 100).toFixed(2)}%
                    </IonCardTitle>
                  </IonCardContent>
                </IonCard>{" "}
              </IonCol>

              <IonCol sizeXl="4" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
                <IonCard className="ion-justify-content-center  ion-align-items-center    ">
                  <IonCardHeader>
                    <IonCardSubtitle
                      className="  "
                      style={{
                        // textTransform: "capitalize",
                        color: "black",
                        textAlign: "center",
                        fontSize: "1.2rem",
                        fontWeight: "400",
                      }}
                    >
                      Percent of projects that made a purchase
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent style={{ textAlign: "center" }}>
                    <IonCardTitle className="  ">
                      {(this.state.perProjectPurchase * 100).toFixed(2)}%
                    </IonCardTitle>
                  </IonCardContent>
                </IonCard>{" "}
              </IonCol>

              <IonCol sizeXl="4" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
                <IonCard className="ion-justify-content-center  ion-align-items-center    ">
                  <IonCardHeader>
                    <IonCardSubtitle
                      className="  "
                      style={{
                        // textTransform: "capitalize",
                        color: "black",
                        textAlign: "center",
                        fontSize: "1.2rem",
                        fontWeight: "400",
                      }}
                    >
                      Spend per designer (designer purchases + client purchases)
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent style={{ textAlign: "center" }}>
                    <IonCardTitle className="  ">
                      ${this.state.spendPerDesigner.toFixed(2)}
                    </IonCardTitle>
                  </IonCardContent>
                </IonCard>{" "}
              </IonCol>
            </IonRow>
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
  totalDesigner: state.admin.totalDesigner,
  newProjectsperDesigner: state.admin.newProjectsperDesigner,
  savedItemsPerProject: state.admin.savedItemsPerProject,
  perDesignerPurchase: state.admin.perDesignerPurchase,
  perProjectPurchase: state.admin.perProjectPurchase,
  spendPerDesigner: state.admin.spendPerDesigner,
  totalDesignersByTimeRange: state.admin.totalDesignersByTimeRange,
  totalProjectsByTimeRange: state.admin.totalProjectsByTimeRange,
});
export default connect(mapStateToProps, {
  logout,
  GetTotalDesigner,
  NewProjectsperDesigner,
  SavedItemsperProject,
  PerdesignerPurchase,
  PerProjectPurchase,
  SpendperDesigner,
  GetTotalDesignerByTimeRange,
  GetTotalProjectsTimeRange,
})(Dashboard);
