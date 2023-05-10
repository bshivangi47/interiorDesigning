import { IonIcon, IonImg } from "@ionic/react";

import React from "react";
import { useLocation } from "react-router-dom";
import { logOutOutline, schoolOutline } from "ionicons/icons";
import projects from "../images/projects.svg";
import currentproject from "../images/projects_current.svg";
import pastproject from "../images/projects_past.svg";
import referrals from "../images/referals.svg";
import business from "../images/business.svg";
import "./Menu.css";
import { useHistory, withRouter } from "react-router";
import explore from "../images/explore.svg";
import cart from "../images/cart.svg";
const appPages = [
  {
    title: "Explore",
    url: "/explore",
    img: explore,
  },
  {
    title: "Projects",
    url: "/currentprojects",
    img: projects,
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
    title: "Cart",
    url: "/Cart",
    img: cart,
  },
];

function BottomMenu(props) {
  const location = useLocation();

  const history = useHistory();
  let currentHideNav = window.innerWidth <= 760;
  var menubuttons = false;
  if (currentHideNav === true) {
    menubuttons = true;
  }
  var token = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <ion-scroll
        scrollX={true}
        class="bottomnav"
        overflowScroll={true}
        forceOverscroll={true}
      >
        {/* <ion-item-group
              class="bottomnav"
              overflowScroll={true}
              forceOverscroll={true}
            > */}
        <div class="bottomnavscroll ion-justify-content-around">
          {localStorage.getItem("user")
            ? token.role == "client"
              ? appPagesClient.map((appPage, index) => {
                  return (
                    // <ion-item >
                    <>
                      {appPage.img ? (
                        <a className="menuIconclient" href={appPage.url}>
                          <IonImg
                            src={appPage.img}
                            style={{
                              height: "55px",
                              width: "30px",
                              margin: "0 !important",
                            }}
                            className={
                              window.location.pathname === appPage.url
                                ? "selected filtersvgcolor activeBottom"
                                : "filtersvgcolor activeBottom"
                            }
                          />
                          <div
                            class={
                              window.location.pathname === appPage.url
                                ? "pageTitlediv pageTitleselected"
                                : "pageTitlediv pageTitle"
                            }
                            style={{ textAlign: "center" }}
                          >
                            {appPage.title}
                          </div>
                        </a>
                      ) : (
                        <a className="menuIcon" href={appPage.url}>
                          <IonIcon slot="start" icon={appPage.icon} />
                          <div
                            class={
                              window.location.pathname === appPage.url
                                ? "pageTitlediv pageTitleselected"
                                : "pageTitlediv pageTitle"
                            }
                            style={{ textAlign: "center" }}
                          >
                            {appPage.title}
                          </div>
                        </a>
                      )}
                    </>
                    // </ion-item>
                  );
                })
              : appPages.map((appPage, index) => {
                  return (
                    // <ion-item >
                    <>
                      {appPage.img ? (
                        <a className="menuIconclient" href={appPage.url}>
                          <IonImg
                            src={appPage.img}
                            style={{
                              height: "55px",
                              width: "30px",
                              margin: "0 !important",
                            }}
                            className={
                              appPage.title === "Projects"
                                ? window.location.pathname === appPage.url ||
                                  window.location.pathname === "/newProject" ||
                                  window.location.pathname ===
                                    "/pastProjects" ||
                                  window.location.pathname === "/project" ||
                                  window.location.pathname === "/searchDecor" ||
                                  window.location.pathname === "/savedItems" ||
                                  window.location.pathname === "/likedItems" ||
                                  window.location.pathname === "/passedItems" ||
                                  window.location.pathname === "/viewDecor" ||
                                  window.location.pathname ===
                                    "/viewsavedItems" ||
                                  window.location.pathname ===
                                    "/viewlikedItems" ||
                                  window.location.pathname ===
                                    "/viewpassedItems" ||
                                  window.location.pathname ===
                                    "/viewDecorItem" ||
                                  window.location.pathname ===
                                    "/viewsavedItem" ||
                                  window.location.pathname ===
                                    "/viewlikedItem" ||
                                  window.location.pathname === "/viewpassedItem"
                                  ? "selected filtersvgcolor activeBottom"
                                  : "filtersvgcolor"
                                : appPage.title === "Explore"
                                ? window.location.pathname === appPage.url ||
                                  window.location.pathname === "/Cart" ||
                                  window.location.pathname ===
                                    "/viewFurniture" ||
                                  window.location.pathname === "/viewItem"
                                  ? "selected filtersvgcolor activeBottom"
                                  : "filtersvgcolor"
                                : appPage.title === "Business"
                                ? location.pathname === appPage.url ||
                                  location.pathname === "/howto"
                                  ? "selected filtersvgcolor activeBottom"
                                  : "filtersvgcolor"
                                : window.location.pathname === appPage.url
                                ? "selected filtersvgcolor activeBottom"
                                : "filtersvgcolor activeBottom"
                            }
                          />
                          <div
                            class={
                              appPage.title === "Projects"
                                ? window.location.pathname === appPage.url ||
                                  window.location.pathname === "/newProject" ||
                                  window.location.pathname === "/pastProjects"
                                  ? "pageTitlediv pageTitleselected"
                                  : "pageTitlediv pageTitle"
                                : appPage.title === "Business"
                                ? location.pathname === appPage.url ||
                                  location.pathname === "/howto"
                                  ? "pageTitlediv pageTitleselected"
                                  : "pageTitlediv pageTitle"
                                : window.location.pathname === appPage.url
                                ? " pageTitlediv pageTitleselected"
                                : "pageTitlediv pageTitle"
                            }
                            style={{ textAlign: "center" }}
                          >
                            {appPage.title}
                          </div>
                        </a>
                      ) : (
                        <a className="menuIconBottom" href={appPage.url}>
                          <IonIcon
                            slot="start"
                            ios={appPage.icon}
                            md={appPage.icon}
                            className={
                              window.location.pathname === appPage.url
                                ? "selected d-flex justify-content-center"
                                : "d-flex justify-content-center"
                            }
                            style={{
                              // textAlign: "center",
                              // marginTop: "-2px",
                              textDecoration: "none",
                            }}
                          />
                          <div
                            class={
                              window.location.pathname === appPage.url
                                ? "pageTitlediv  pageTitleselected d-flex justify-content-center"
                                : "pageTitlediv pageTitle d-flex justify-content-center"
                            }
                            style={{
                              textAlign: "center",
                              marginTop: "-2px",
                              textDecoration: "none",
                            }}
                          >
                            {appPage.title}
                          </div>
                        </a>
                      )}
                    </>
                    // </ion-item>
                  );
                })
            : null}
        </div>
        {/* </ion-item-group> */}
      </ion-scroll>
    </>
  );
}

export default withRouter(BottomMenu);
