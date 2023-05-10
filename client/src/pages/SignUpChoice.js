import { IonContent, IonPage, IonButton, IonRow, IonGrid } from "@ionic/react";
import React from "react";
import "./Page.css";
import { menuController } from "@ionic/core";
import { Link } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import api_URL, { validate_token } from "../apiURL/apiURL";
import Axios from "axios";
class SignUpChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShowPopover: false,
    };
  }
  componentDidMount() {
    menuController.enable(false);
    var token = JSON.parse(localStorage.getItem("token")).token;
    Axios.get(api_URL + validate_token, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.data.success === false) {
          localStorage.clear();
          this.props.history.push("/");
        } else {
          console.log("response", response.data.success);
        }
      })
      .catch((error) => {
        console.log("ErrorMessage", error.message);
      });
  }
  render() {
    return (
      <IonPage className="wholePage1">
        <Toolbar />
        <IonContent>
          <IonGrid style={{ height: "100%" }} className="signupchoice">
            <IonRow
              className="ion-justify-content-center  ion-align-items-center"
              style={{ height: " 100%" }}
            >
              <Link
                to={{
                  pathname: "/SignUp",
                  search: `?as=designer`,
                }}
              >
                <IonButton
                  class="ion-margin-horizontal charcoal choice"
                  routerDirection="none"
                  size="large"
                >
                  Designer Sign Up
                </IonButton>
              </Link>
              <div className=""></div>
              <Link
                to={{
                  pathname: "/SignUp",
                  search: `?as=client`,
                }}
              >
                <IonButton
                  className="ion-margin-horizontal cashmere choice"
                  routerDirection="none"
                  size="large"
                >
                  Client Sign Up
                </IonButton>
              </Link>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
}
export default SignUpChoice;
