import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonTitle as Title,
  IonImg,
  IonChip,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";

import React from "react";
import "./Page.css";
import projects from "../images/projects.svg";
import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";
import api_URL, { validate_token } from "../apiURL/apiURL";
import Axios from "axios";
class HowTo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuClose: false,
    };
  }
  componentDidMount() {
    let params = new URLSearchParams(window.location.search);
    let type = params.get("type");
    console.log("how to...", type);
    this.setState({ type: type });
  }
  render() {
    return (
      <>
        <ToolbarMobile />

        <BottomMenu />
        <IonContent fullscreen>
          <IonGrid style={{ padding: "20" }} className="grid">
            <IonRow
              className="ion-justify-content-center ion-margin-vertical ion-align-items-center businessRow container"
              style={{}}
            >
              {/* <IonCol
                sizeXl="10"
                sizeLg="12"
                sizeMd="12"
                sizeSm="12"
                sizeXs="12"
                className="container"
                style={{
                  textAlign: "center",
                }}
              >
                <div className="d-flex justify-content-start">
                  <a
                    href={"/How"}
                    style={{
                      color: "maroon",
                      fontWeight: "500",
                      textDecoration: "underline",
                    }}
                  >
                    Go Back
                  </a>
                </div>
              </IonCol> */}
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
                    {this.state.type == "startProject"
                      ? "Start a project: video"
                      : this.state.type == "sendItems"
                      ? "Send items: video"
                      : this.state.type == "makePurchase"
                      ? "Make a purchase: video"
                      : this.state.type == "client"
                      ? "What your client sees: video"
                      : null}
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
                  src={
                    this.state.type == "startProject"
                      ? "https://www.youtube.com/embed/CcAOUd_YC7E?playlist=CcAOUd_YC7E?&loop=1"
                      : this.state.type == "sendItems"
                      ? "https://www.youtube.com/embed/_dhH6PTiWMs?playlist=_dhH6PTiWMs?&loop=1"
                      : this.state.type == "makePurchase"
                      ? "https://www.youtube.com/embed/qs2KGCaps20?playlist=qs2KGCaps20?&loop=1"
                      : this.state.type == "client"
                      ? "https://www.youtube.com/embed/CcAOUd_YC7E?playlist=CcAOUd_YC7E?&loop=1"
                      : null
                  }
                  allowFullScreen
                ></iframe>
              </IonCol>

              {this.state.type == "startProject" ||
              this.state.type == "sendItems" ? (
                <IonCol
                  sizeXl="10"
                  sizeLg="12"
                  sizeMd="12"
                  sizeSm="12"
                  sizeXs="12"
                  className="mt-4"
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
                      {this.state.type == "startProject"
                        ? "Start a project: step by step"
                        : "Send items: step by step"}
                    </span>
                  </div>
                </IonCol>
              ) : null}

              <IonCol
                sizeXl="10"
                sizeLg="12"
                sizeMd="12"
                sizeSm="12"
                sizeXs="12"
              >
                {this.state.type == "startProject" ? (
                  <IonGrid>
                    <ol>
                      <li>
                        <IonRow className="ion-justify-content-center  ion-align-items-center">
                          <IonCol sizeMd="8" sizeXs="12">
                            To start a project click on the project's icon
                            (desktop view can click directly on “New Project”)
                          </IonCol>
                          <IonCol
                            sizeMd="4"
                            sizeXs="12"
                            className=" ion-text-center"
                          >
                            <IonImg
                              src={projects}
                              className="filtersvgcolor howToimg mr-0"
                            />
                          </IonCol>
                        </IonRow>
                      </li>
                      <li>
                        <IonRow className="ion-justify-content-center  ion-align-items-center">
                          <IonCol sizeMd="8" sizeXs="12">
                            Now click on the button in the top of your window
                            for “New Project” (mobile only, desktop can skip to
                            step 3)
                          </IonCol>
                          <IonCol
                            sizeMd="4"
                            sizeXs="12"
                            className=" ion-text-center"
                          >
                            <IonChip
                              className="Projectchips"
                              style={{ height: "fit-content" }}
                            >
                              <IonLabel
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                New project
                              </IonLabel>
                            </IonChip>
                          </IonCol>
                        </IonRow>
                      </li>{" "}
                      <li>
                        <IonRow className="ion-justify-content-center  ion-align-items-center">
                          <IonCol sizeMd="8" sizeXs="12">
                            Fill out the quick form and invite your client to
                            the project; when you click “Add Project” an email
                            will be sent to your client with a link to their own
                            website and portal where they will see all products
                            you select and send to them (there is a how to video
                            you can watch for “what your client sees”)
                          </IonCol>
                          <IonCol
                            sizeMd="4"
                            sizeXs="12"
                            className=" ion-text-center"
                          >
                            <IonChip
                              className="selectedProject"
                              style={{ height: "fit-content" }}
                            >
                              <IonLabel
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                Add project
                              </IonLabel>
                            </IonChip>
                          </IonCol>
                        </IonRow>
                      </li>
                      <li>
                        <IonRow className="ion-justify-content-center  ion-align-items-center">
                          <IonCol sizeMd="8" sizeXs="12">
                            After you add a project, a project will be created
                            automatically under “Current Projects”; click on the
                            projects icon again (step 1) to see the newly
                            created project
                          </IonCol>
                          <IonCol
                            sizeMd="4"
                            sizeXs="12"
                            className=" ion-text-center"
                          >
                            <IonChip
                              className="Projectchips"
                              style={{ height: "fit-content" }}
                            >
                              <IonLabel
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                Current project
                              </IonLabel>
                            </IonChip>
                          </IonCol>
                        </IonRow>
                      </li>
                      <li>
                        <IonRow className="ion-justify-content-center  ion-align-items-center">
                          <IonCol sizeMd="8" sizeXs="12">
                            From here you can select the client project (e.g.,
                            “Lasso’s living room project”) that you want to work
                            on and search for home décor
                          </IonCol>
                          <IonCol
                            sizeMd="4"
                            sizeXs="12"
                            className=" ion-text-center"
                          >
                            <IonCard
                              className="ion-text-center"
                              style={{ margin: "0px", padding: "5px" }}
                            >
                              <span
                                style={{ color: "#595858", fontSize: "1rem" }}
                              >
                                Lasso’s living room project
                              </span>
                            </IonCard>
                          </IonCol>
                        </IonRow>
                      </li>
                    </ol>
                  </IonGrid>
                ) : this.state.type == "sendItems" ? (
                  <IonGrid>
                    <ol>
                      <li>
                        <IonRow className="ion-justify-content-center  ion-align-items-center">
                          <IonCol sizeMd="8" sizeXs="12">
                            Under “Current Projects” click on the client project
                            that you want to work on (e.g., “Lasso’s living room
                            project”)
                          </IonCol>
                          <IonCol
                            sizeMd="4"
                            sizeXs="12"
                            className=" ion-text-center"
                          >
                            <IonCard
                              className="ion-text-center"
                              style={{ margin: "0px", padding: "5px" }}
                            >
                              <span
                                style={{ color: "#595858", fontSize: "1rem" }}
                              >
                                Lasso’s living room project
                              </span>
                            </IonCard>
                          </IonCol>
                        </IonRow>
                      </li>
                      <li>
                        <IonRow className="ion-justify-content-center  ion-align-items-center">
                          <IonCol sizeMd="8" sizeXs="12">
                            After you click on the client project you will have
                            5 buttons to choose from; click on “Search for
                            decor” to begin searching for products specific to
                            your clients needs
                          </IonCol>
                          <IonCol
                            sizeMd="4"
                            sizeXs="12"
                            className=" ion-text-center"
                          >
                            <IonChip
                              className="LoginBtn"
                              style={{ height: "fit-content" }}
                            >
                              <IonLabel>Search for decor</IonLabel>
                            </IonChip>
                          </IonCol>
                        </IonRow>
                      </li>
                      <li>
                        <IonRow className="ion-justify-content-center  ion-align-items-center">
                          <IonCol sizeMd="8" sizeXs="12">
                            When you find an item that you think would be a
                            perfect fit for your client click “Save to project”;
                            when you click on “Save to project” this will
                            automatically send the item to your client's portal
                            for their review
                          </IonCol>
                          <IonCol
                            sizeMd="4"
                            sizeXs="12"
                            className=" ion-text-center"
                          >
                            <IonButton
                              className="cashmere"
                              style={{
                                cursor: "default !important",
                              }}
                            >
                              <IonLabel>Save to project</IonLabel>
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      </li>
                      <li>
                        <IonRow className="ion-justify-content-center  ion-align-items-center">
                          <IonCol sizeMd="8" sizeXs="12">
                            In order to review all the items you have sent to
                            your client, click on the button in the top of your
                            window “[Client] project” (mobile only, desktop can
                            skip to step 5)
                          </IonCol>
                          <IonCol
                            sizeMd="4"
                            sizeXs="12"
                            className=" ion-text-center"
                          >
                            <IonChip
                              className="ion-text-center LoginBtn"
                              // style={{ margin: "0px", padding: "5px" }}
                            >
                              <IonLabel>Lasso's project</IonLabel>
                            </IonChip>
                          </IonCol>
                        </IonRow>
                      </li>
                      <li>
                        <IonRow className="ion-justify-content-center  ion-align-items-center">
                          <IonCol sizeMd="8" sizeXs="12">
                            Now click on the button “See saved items” to review
                            all the items you have sent to your client; at any
                            time, you can unsave an item and it will be removed
                            from your client's portal
                          </IonCol>
                          <IonCol
                            sizeMd="4"
                            sizeXs="12"
                            className=" ion-text-center"
                          >
                            <IonButton className="LoginBtn">
                              <IonLabel>See saved items</IonLabel>
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      </li>
                    </ol>
                  </IonGrid>
                ) : null}
              </IonCol>
            </IonRow>
          </IonGrid>{" "}
        </IonContent>
        {/* </IonPage>
      </IonSplitPane> */}
      </>
    );
  }
}

export default HowTo;
