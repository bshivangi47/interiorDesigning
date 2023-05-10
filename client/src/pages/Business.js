import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonTitle as Title,
  IonCard,
  IonImg,
  IonIcon,
  IonAlert,
} from "@ionic/react";

import React from "react";
import "./Page.css";
import { cashOutline, documentTextOutline } from "ionicons/icons";

import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";

import { connect } from "react-redux";
import { logout, GetUser } from "../actions/userActions";
import { SendBusinessEmail } from "../actions/businessActions";
class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuClose: false,
      totalCommission: 0,
      showAlert: false,
      ConfirmationMsg: "",
      showConfirmation: false,
    };
  }
  componentDidMount() {
    this.props.GetUser();
  }
  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      console.log("ERROEMSG___", this.props.error);

      if (this.props.error.message.message == "Unauthenticated") {
        this.props.logout();
      } else {
        this.setState({
          alertMsg: this.props.error.message.message,
          showAlert: true,
        });
      }
    }

    if (this.props.sendBusinessEmail != prevProps.sendBusinessEmail) {
      if (this.props.sendBusinessEmail.success == true) {
        this.setState({
          alertMsg: this.props.sendBusinessEmail.message,
          showAlert: true,
        });
      }
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
  sendEmail = (action) => {
    this.props.SendBusinessEmail(action);
  };
  render() {
    return (
      <>
        <ToolbarMobile />

        <BottomMenu />
        <IonContent fullscreen>
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
          <IonAlert
            isOpen={this.state.showConfirmation}
            onDidDismiss={() => {
              this.setState({ showConfirmation: false });
            }}
            cssClass="alertClass"
            message={this.state.ConfirmationMsg}
            buttons={[
              {
                text: "Confirm withdrawal",
                role: "cancel",
                cssClass: "AlertBtn",
                handler: () => {
                  this.sendEmail("Withdraw commissions");
                  // this.setState({ showConfirmation: false });
                },
              },
            ]}
          />
          <IonGrid style={{ height: "100%", padding: "20" }} className="">
            <IonRow
              className="ion-justify-content-center  ion-align-items-center businessRow"
              style={{ height: "90%" }}
            >
              <IonCol
                sizeXl="12"
                sizeLg="6"
                sizeMd="6"
                sizeSm="12"
                sizeXs="12"
                className=""
                style={{ textAlign: "center" }}
              >
                <IonGrid className="">
                  <IonRow className="ion-justify-content-center  ion-align-items-center">
                    <IonCol
                      sizeXl="8"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <div
                        className="lineAroundText"
                        style={{
                          fontSize: " 17px",
                          fontWeight: "600",
                        }}
                      >
                        <span style={{ background: "#fff", padding: "0 10px" }}>
                          Earnings
                        </span>
                      </div>
                    </IonCol>
                    <IonCol
                      sizeXl="6"
                      sizeLg="10"
                      sizeMd="10"
                      sizeSm="10"
                      sizeXs="10"
                    >
                      <IonCard
                        className="saveButtonHoWTO HowToCards m-0"
                        style={{ width: "100%", cursor: "pointer" }}
                        onClick={() => {
                          if (this.state.totalCommission == 0) {
                            this.setState({
                              alertMsg:
                                "Thank you for your request to withdraw your commissions. It looks like you do not have any commissions available to withdraw right now. If you recently completed a project, please allow 7 days after your client's receipt of merchandise to withdraw the commission earned. Please note that to withdraw commissions, you will need to submit a W-9 Form. Please see the Submit W-9 Form button to begin the process of submitting your W-9. For additional questions or concerns, please email hello@hemlyco.com.",
                              showAlert: true,
                            });
                          } else {
                            this.setState({
                              ConfirmationMsg:
                                "Congratulations! You have earned $" +
                                this.state.totalCommission +
                                " which is available for withdrawal. To withdraw your commission, please click on the “Confirm withdrawal” button below, and a member of our team will be in touch within 1-3 business days regarding payment. ",
                              showConfirmation: true,
                            });
                          }
                          // this.sendEmail("Withdraw commissions");
                        }}
                      >
                        <div className="mt-2">
                          <div className="HowToText mb-1">
                            {" "}
                            Withdraw commissions
                          </div>
                          <IonIcon icon={cashOutline} className="HowToIcon" />
                        </div>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                  {/* <IonRow className="ion-justify-content-center  ion-align-items-center">
                    <IonCol
                      sizeXl="6"
                      sizeLg="12"
                      sizeMd="12"
                      sizeXs="12"
                      sizeSm="12"
                    >
                      {" "}
                      <IonCard
                        className="saveButtonHoWTO HowToCards m-0"
                        style={{ width: "100%", cursor: "pointer" }}
                        onClick={() => {
                          this.sendEmail("1099 form");
                        }}
                      >
                        <div className="mt-2">
                          <div className="HowToText mb-1">
                            Request 1099 form
                          </div>
                          <IonIcon
                            icon={documentTextOutline}
                            className="HowToIcon"
                          />
                        </div>
                      </IonCard>
                    </IonCol>
                  </IonRow> */}

                  <IonRow className="ion-justify-content-center  ion-align-items-center">
                    <IonCol
                      sizeXl="6"
                      sizeLg="10"
                      sizeMd="10"
                      sizeXs="10"
                      sizeSm="10"
                    >
                      {" "}
                      <IonCard
                        className="saveButtonHoWTO HowToCards m-0"
                        style={{ width: "100%", cursor: "pointer" }}
                        onClick={() => {
                          this.sendEmail("W-9 Form");
                        }}
                      >
                        <div className="mt-2">
                          <div className="HowToText mb-1">Submit W-9 Form</div>
                          <IonIcon
                            icon={documentTextOutline}
                            className="HowToIcon"
                          />
                        </div>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>{" "}
              {/* <IonCol
                sizeXl="6"
                sizeLg="6"
                sizeMd="6"
                sizeSm="12"
                sizeXs="12"
                className=""
                style={{ textAlign: "center" }}
              >
                <IonGrid className="">
                  <IonRow className="ion-justify-content-center  ion-align-items-center">
                    <IonCol
                      sizeXl="8"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <div
                        className="lineAroundText"
                        style={{
                          fontSize: " 17px",
                          fontWeight: "600",
                        }}
                      >
                        <span style={{ background: "#fff", padding: "0 10px" }}>
                          How to
                        </span>
                      </div>
                    </IonCol>
                    <IonCol
                      sizeXl="8"
                      sizeLg="12"
                      sizeMd="12"
                      sizeXs="12"
                      sizeSm="12"
                    >
                      <IonButton
                        href="/howto?type=startPoject"
                        className="saveButton"
                        // size="large"
                        style={{ width: "100%" }}
                      >
                        Start a project
                      </IonButton>{" "}
                    </IonCol>
                  </IonRow>
                  <IonRow className="ion-justify-content-center  ion-align-items-center">
                    <IonCol
                      sizeXl="8"
                      sizeLg="12"
                      sizeMd="12"
                      sizeXs="12"
                      sizeSm="12"
                    >
                      <IonButton
                        href="/howto?type=sendItems"
                        className="saveButton"
                        // size="large"
                        style={{ width: "100%" }}
                      >
                        Send items
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
          */}
            </IonRow>
          </IonGrid>{" "}
        </IonContent>
        {/* </IonPage>
      </IonSplitPane> */}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  getUser: state.user.getUser,
  sendBusinessEmail: state.business.sendBusinessEmail,
});
export default connect(mapStateToProps, {
  logout,
  SendBusinessEmail,
  GetUser,
})(Business);
