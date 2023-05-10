import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonAvatar,
  IonButtons,
  IonHeader,
  IonRouterOutlet,
  IonToolbar,
  IonMenuButton,
  IonText,
} from "@ionic/react";
import { menuController } from "@ionic/core";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  logOutOutline,
  receiptOutline,
  peopleOutline,
  personOutline,
  schoolOutline,
  cashOutline,
  bedOutline,
  analyticsOutline,
} from "ionicons/icons";
import projects from "../images/projects.svg";
import currentproject from "../images/projects_current.svg";
import pastproject from "../images/projects_past.svg";
import referrals from "../images/referals.svg";
import business from "../images/business.svg";
import explore from "../images/explore.svg";
import "./Menu.css";

import { useHistory, withRouter } from "react-router";
import cart from "../images/cart.svg";
import avatar from "../images/avatar.svg";
import { logout } from "../actions/userActions";
import { useDispatch } from "react-redux";
const appPages = [
  {
    title: "Explore",
    url: "/explore",
    img: explore,
  },
  {
    title: "Current Projects",
    url: "/currentprojects",
    img: currentproject,
  },
  {
    title: "New Project",
    url: "/newProject",
    img: projects,
  },
  {
    title: "Past Projects",
    url: "/pastProjects",
    img: pastproject,
  },
  {
    title: "How To",
    url: "/How",
    icon: schoolOutline,
  },
  {
    title: "Business",
    url: "/business",
    img: business,
  },
  {
    title: "Cart",
    url: "/Cart",
    img: cart,
  },
  {
    title: "Past Orders",
    url: "/orders",
    icon: bedOutline,
  },
];
const appPagesClient = [
  {
    title: "Current Projects",
    url: "/currentprojectsclient",
    img: currentproject,
  },

  {
    title: "Past Projects",
    url: "/pastProjectsclient",
    img: pastproject,
  },
  {
    title: "Final Cart",
    url: "/Cart",
    img: cart,
  },
  {
    title: "Past Orders",
    url: "/orders",
    icon: bedOutline,
  },
];
const appPagesAdmin = [
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: analyticsOutline,
  },
  {
    title: "Inventory",
    url: "/admin/Inventory",
    icon: receiptOutline,
  },
  // {
  //   title: "Designers",
  //   url: "/admin/designers",
  //   icon: peopleOutline,
  // },
  // {
  //   title: "Clients",
  //   url: "/admin/clients",
  //   icon: personOutline,
  // },
  {
    title: "Commissions",
    url: "/admin/commissions",
    icon: cashOutline,
  },
  // {
  //   title: "Past Projects",
  //   url: "/pastProjects",
  //   img: pastproject,
  // },
  // {
  //   title: "Referral Center",
  //   url: "/referralCenter",
  //   img: referrals,
  // },
  // {
  //   title: "Business",
  //   url: "/business",
  //   img: business,
  // },
  // {
  //   title: "Cart",
  //   url: "/Cart",
  //   img: cart,
  // },
];
function Menu(props) {
  const location = useLocation();
  // const [menuClose, setmenuClose] = useState(props.menuClose);
  const dispatch = useDispatch();
  const history = useHistory();
  let currentHideNav = window.innerWidth <= 760;
  var menubuttons = false;
  if (currentHideNav === true) {
    menubuttons = true;
  }
  var token = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <IonMenu
        contentId="main"
        id="main_menu"
        // type="overlay"
        side="start"
        type="overlay"
        className="main_menu"
        sticky
      >
        <IonContent>
          <IonToolbar className="ion-margin-top">
            <IonButtons slot="start" className="">
              <IonMenuButton style={{ color: "black" }}></IonMenuButton>
            </IonButtons>
            <IonItem>
              <IonAvatar className="mr-2">
                <img src={avatar} />
              </IonAvatar>
              <IonText
                style={{
                  fontSize: "1.3em",
                  fontWeight: "400",
                  textTransform: "capitalize",
                }}
              >
                {localStorage.getItem("user")
                  ? `${token.firstname}`
                  : " User Name"}
              </IonText>
            </IonItem>
          </IonToolbar>
          <IonList id="">
            {localStorage.getItem("user")
              ? token.role == "client"
                ? appPagesClient.map((appPage, index) => {
                    return (
                      <IonMenuToggle key={index} autoHide={false}>
                        <IonItem
                          className={
                            location.pathname === appPage.url ? "selected" : ""
                          }
                          routerLink={appPage.url}
                          lines="none"
                          detail="false"
                        >
                          <div className="menuItem">
                            {appPage.img ? (
                              <div className="menuIcon">
                                <IonImg
                                  src={appPage.img}
                                  style={{
                                    height: "25px",
                                    width: "25px",
                                    marginRight: "32px",
                                  }}
                                  className="filtersvgcolor"
                                />
                              </div>
                            ) : (
                              <div
                                className="menuIcon d-flex"
                                style={{ verticalAlign: "middle" }}
                              >
                                <IonIcon
                                  slot="start"
                                  ios={appPage.icon}
                                  md={appPage.icon}
                                  style={{
                                    height: "25px",
                                    width: "25px",
                                    marginRight: "32px",
                                  }}
                                />
                              </div>
                            )}
                            <div className="menuLabel">
                              <IonLabel>{appPage.title}</IonLabel>
                            </div>
                          </div>
                        </IonItem>
                        <IonRouterOutlet id="main"></IonRouterOutlet>
                      </IonMenuToggle>
                    );
                  })
                : token.role == "designer"
                ? appPages.map((appPage, index) => {
                    return (
                      <IonMenuToggle key={index} autoHide={false}>
                        <IonItem
                          className={
                            appPage.title === "Explore"
                              ? location.pathname === appPage.url ||
                                location.pathname === "/viewFurniture" ||
                                location.pathname === "/viewItem"
                                ? "selected"
                                : ""
                              : appPage.title === "How To"
                              ? location.pathname === appPage.url ||
                                location.pathname === "/howto"
                                ? "selected"
                                : ""
                              : appPage.title === "Business"
                              ? location.pathname === appPage.url
                                ? "selected"
                                : ""
                              : location.pathname === appPage.url
                              ? "selected"
                              : ""
                          }
                          routerLink={appPage.url}
                          lines="none"
                          detail="false"
                        >
                          <div className="menuItem">
                            {appPage.img ? (
                              <div className="menuIcon">
                                <IonImg
                                  src={appPage.img}
                                  style={{
                                    height: "25px",
                                    width: "25px",
                                    marginRight: "32px",
                                  }}
                                  className="filtersvgcolor"
                                />
                              </div>
                            ) : (
                              <div
                                className="menuIcon d-flex"
                                style={{ verticalAlign: "middle" }}
                              >
                                <IonIcon
                                  slot="start"
                                  ios={appPage.icon}
                                  md={appPage.icon}
                                  style={{
                                    height: "25px",
                                    width: "25px",
                                    marginRight: "32px",
                                  }}
                                  // className="filtersvgcolor"
                                />
                              </div>
                            )}
                            <div className="menuLabel">
                              <IonLabel>{appPage.title}</IonLabel>
                            </div>
                          </div>
                        </IonItem>
                        <IonRouterOutlet id="main"></IonRouterOutlet>
                      </IonMenuToggle>
                    );
                  })
                : appPagesAdmin.map((appPage, index) => {
                    return (
                      <IonMenuToggle key={index} autoHide={false}>
                        <IonItem
                          className={
                            location.pathname === appPage.url ? "selected" : ""
                          }
                          routerLink={appPage.url}
                          lines="none"
                          detail="false"
                        >
                          {/* <div className="menuItem"> */}
                          {appPage.img ? (
                            <div className="menuIcon">
                              <IonImg
                                src={appPage.img}
                                style={{
                                  height: "25px",
                                  width: "25px",
                                  marginRight: "32px",
                                }}
                                className="filtersvgcolor"
                              />
                            </div>
                          ) : (
                            // <div className="menuIcon">
                            <IonIcon
                              slot="start"
                              ios={appPage.icon}
                              md={appPage.icon}
                              style={{
                                height: "25px",
                                width: "25px",
                                marginRight: "30px",
                              }}
                            />
                            // </div>
                          )}
                          <div className="menuLabel">
                            <IonLabel>{appPage.title}</IonLabel>
                          </div>
                          {/* </div> */}
                        </IonItem>
                        <IonRouterOutlet id="main"></IonRouterOutlet>
                      </IonMenuToggle>
                    );
                  })
              : null}
            {localStorage.getItem("token") ? (
              <IonMenuToggle autoHide={false}>
                <IonItem
                  onClick={() => {
                    dispatch(logout());
                    // localStorage.clear();
                    // history.push("/");
                    // console.log("token...", localStorage.getItem("token"));
                  }}
                  lines="none"
                  style={{ cursor: "pointer" }}
                >
                  <IonIcon
                    slot="start"
                    ios={logOutOutline}
                    md={logOutOutline}
                  />
                  <IonLabel>Logout</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ) : null}
          </IonList>

          <div
            style={{
              color: "#8E5542",
              position: "fixed",
              bottom: "75px",
              left: "0%",
              right: "0%",
            }}
            className="d-flex justify-content-center"
          >
            Beta Version
          </div>
        </IonContent>
      </IonMenu>
      {/* <IonRouterOutlet id="main"></IonRouterOutlet> */}
    </>
  );
}

export default withRouter(Menu);
