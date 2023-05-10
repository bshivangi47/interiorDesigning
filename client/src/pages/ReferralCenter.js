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
  IonCardSubtitle,
  IonText,
  IonButton,
  IonIcon,
} from "@ionic/react";

import React from "react";
import "./Page.css";

import image from "../images/referals.svg";
import {
  checkmarkOutline,
  schoolOutline,
  cashOutline,
  desktopOutline,
} from "ionicons/icons";

import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";
import referrals from "../images/referals.svg";

class ReferralCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuClose: false,
    };
  }
  componentDidMount() {}
  handleCallBack = (childData) => {
    this.setState({ menuClose: childData });
  };
  handleMenutoggle = () => {
    // this.setState({ menuClose: false });
    document.querySelector(".main_menu").toggle();
  };
  render() {
    return (
      <>
        <ToolbarMobile />

        <BottomMenu />
        <IonContent fullscreen>
          <IonGrid style={{ height: "100%", padding: "20" }} className="">
            <IonRow
              className="ion-justify-content-center  ion-align-items-center"
              style={{ height: " 80%" }}
            >
              {/* <IonCol
                sizeXl="12"
                sizeLg="12"
                sizeMd="12"
                sizeSm="12"
                sizeXs="12"
                className="container"
              >
                <IonCardHeader
                  className="ion-align-items-center"
                  style={{ textAlign: "center" }}
                >
                  <IonCardTitle className="ion-nowrap referralTitle ">
                    Coming soon
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent style={{ textAlign: "center" }}>
                  <IonImg
                    src={image}
                    className="filtersvgcolor mb-4"
                    style={{ height: "70px" }}
                  />
                  <IonText
                    className="DetailsSingleItem"
                    style={{ color: "#506372" }}
                  >
                    How To section will be a place where you will be able
                    to refer friends to Hemly and receive cash incentives for
                    the invitation.
                  </IonText>
                </IonCardContent>
              </IonCol>
            */}
              <IonCol
                sizeXl="12"
                sizeLg="12"
                sizeMd="12"
                sizeSm="12"
                sizeXs="12"
                className=""
                style={{ textAlign: "center" }}
              >
                <IonGrid className="">
                  <IonRow className="ion-justify-content-center  ion-align-items-center">
                    <IonCol
                      sizeXl="10"
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
                          Everything you need to know
                        </span>
                      </div>
                    </IonCol>
                    <IonCol
                      sizeXl="10"
                      sizeLg="12"
                      sizeMd="12"
                      sizeXs="12"
                      sizeSm="12"
                      className="pb-0"
                    >
                      <iframe
                        width="100%"
                        className="iframeHowTo"
                        src="https://www.youtube.com/embed/uehQPvpR9nU?playlist=uehQPvpR9nU?&loop=1"
                        allowFullScreen
                      ></iframe>
                    </IonCol>
                  </IonRow>
                </IonGrid>

                <IonGrid className="mobilemargin">
                  <IonRow className="ion-justify-content-center  ion-align-items-center">
                    <IonCol
                      sizeXl="10"
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
                      sizeXl="6"
                      sizeLg="12"
                      sizeMd="12"
                      sizeXs="12"
                      sizeSm="12"
                    >
                      <IonCard
                        href="/howto?type=startProject"
                        className="saveButtonHoWTO HowToCards m-0"
                        // size="large"
                        style={{ width: "100%" }}
                      >
                        <div className="py-2 px-4  d-flex justify-content-between">
                          <div className="HowToText">Start a project</div>
                          <IonIcon
                            icon={checkmarkOutline}
                            className="HowToIcon"
                          />
                        </div>
                      </IonCard>{" "}
                    </IonCol>
                  </IonRow>
                  <IonRow className="ion-justify-content-center  ion-align-items-center">
                    <IonCol
                      sizeXl="6"
                      sizeLg="12"
                      sizeMd="12"
                      sizeXs="12"
                      sizeSm="12"
                    >
                      <IonCard
                        href="/howto?type=sendItems"
                        className="saveButtonHoWTO HowToCards m-0"
                        style={{ width: "100%" }}
                      >
                        <div className="py-2 px-4  d-flex justify-content-between">
                          <div className="HowToText">Save and Send items</div>
                          <IonImg
                            src={referrals}
                            className="HowToImg"
                            style={{ height: "25px", width: "25px" }}
                          />
                        </div>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                  <IonRow className="ion-justify-content-center  ion-align-items-center">
                    <IonCol
                      sizeXl="6"
                      sizeLg="12"
                      sizeMd="12"
                      sizeXs="12"
                      sizeSm="12"
                    >
                      <IonCard
                        href="/howto?type=makePurchase"
                        className="saveButtonHoWTO HowToCards m-0"
                        style={{ width: "100%" }}
                      >
                        <div className="py-2 px-4  d-flex justify-content-between">
                          <div className="HowToText">Make a purchase</div>
                          <IonIcon icon={cashOutline} className="HowToIcon" />
                        </div>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                  <IonRow className="ion-justify-content-center  ion-align-items-center">
                    <IonCol
                      sizeXl="6"
                      sizeLg="12"
                      sizeMd="12"
                      sizeXs="12"
                      sizeSm="12"
                    >
                      <IonCard
                        href="/howto?type=client"
                        className="saveButtonHoWTO HowToCards m-0"
                        style={{ width: "100%" }}
                      >
                        <div className="py-2 px-4  d-flex justify-content-between">
                          <div className="HowToText">What your client sees</div>
                          <IonIcon
                            icon={desktopOutline}
                            className="HowToIcon"
                          />
                        </div>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
        {/* </IonPage>
      </IonSplitPane> */}
      </>
    );
  }
}

export default ReferralCenter;
