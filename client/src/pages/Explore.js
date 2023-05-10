import {
  IonContent,
  IonGrid,
  IonCard,
  IonCardTitle,
  IonRow,
  IonCol,
  IonImg,
  IonTitle,
  IonIcon,
  IonItem,
  IonSpinner,
  IonButton,
} from "@ionic/react";

import React from "react";
import "./Page.css";

import sofa from "../images/sofa.png";
import chairs from "../images/chairs.jpg";
import diningChairs from "../images/diningChairsNew.jpg";

import Beds from "../images/Bedsnews.jpg";
import coffeeTables from "../images/coffeTables&Ottomans.jpg";
import Miscellaneous from "../images/Miscellaneous.jpg";
import consoleTables from "../images/console&sideboards.jpg";
import diningTables from "../images/DiningTablesnew.jpg";
import dressers from "../images/dressingTables.jpg";
import nightStands from "../images/nightStands.jpg";
import office from "../images/office.jpg";
import Outside from "../images/Outside.jpg";
import sideTables from "../images/sideTables.jpg";
import stoolsBenches from "../images/Benches&Stools.jpg";
import tvTables from "../images/TVTablesNew.jpg";
import Lighting from "../images/Lighting.jpg";
import { Link } from "react-router-dom";
import CabinetsStorage from "../images/Cabinets&Storage.jpg";
import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";
import ToolbarExplore from "../components/ToolbarExplore";

import { connect } from "react-redux";
import { logout, validateToken } from "../actions/userActions";
class Explore extends React.Component {
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
      nextbtnliked: true,
      prevbtnliked: false,
      searchDecor: false,
      savedItems: false,
      likedItems: false,
      passedItems: false,
    };
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    if (localStorage.getItem("token")) {
      this.props.validateToken();
    }
    if (window.location.pathname == "/searchDecor") {
      let projectID = params.get("project");
      let client = params.get("client");
      let room = params.get("room");
      this.setState({
        projectID: projectID,
        client: client,
        room: room,
        searchDecor: true,
      });
    }
    if (window.location.pathname == "/savedItems") {
      let client = params.get("client");
      let room = params.get("room");
      let projectID = params.get("project");
      this.setState({
        client: client,
        projectID: projectID,
        room: room,
        savedItems: true,
      });
    }
    if (window.location.pathname == "/likedItems") {
      let client = params.get("client");
      let room = params.get("room");
      let projectID = params.get("project");
      this.setState({
        client: client,
        projectID: projectID,
        room: room,
        likedItems: true,
      });
    }
    if (window.location.pathname == "/passedItems") {
      let client = params.get("client");
      let room = params.get("room");
      let projectID = params.get("project");
      this.setState({
        client: client,
        projectID: projectID,
        room: room,
        passedItems: true,
      });
    }
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
  }
  resize() {
    let currentHideNav = window.innerWidth <= 769;

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
  prevliked = () => {
    var mySwiper = document.querySelector(".swiper-containerliked").swiper;
    mySwiper.slidePrev();
  };
  nextliked = () => {
    var mySwiper = document.querySelector(".swiper-containerliked").swiper;
    mySwiper.slideNext();
  };
  render() {
    const Categories = [
      {
        class: "sofas, Sectionals",
        title: "Sofas",
        image: sofa,
      },
      {
        class: "coffee Tables, Ottomans",
        title: "Coffee Tables & Ottomans",
        image: coffeeTables,
      },
      {
        class: "Side Tables, accent Tables, End tables",
        title: "Side / accent Tables",
        image: sideTables,
      },
      {
        class: "chairs",
        title: "Accent Chairs",
        image: chairs,
      },
      {
        class: "tv Tables",
        title: "TV Tables",
        image: tvTables,
      },

      {
        class: "console tables, Sideboards & Storage, Bars & Cabinets & Carts",
        title: "Console & SideBoards",
        image: consoleTables,
      },
      {
        class: "Lighting",
        title: "Lighting",
        image: Lighting,
      },

      {
        class: "Benches, Stools, Bar & Counter Stools",
        title: "Benches & Stools",
        image: stoolsBenches,
      },

      {
        class: "dining Chairs",
        title: "Dining Chairs",
        image: diningChairs,
      },
      {
        class: "dining Tables",
        title: "Dining Tables",
        image: diningTables,
      },
      {
        class: "Dressers",
        title: "Dressers",
        image: dressers,
      },
      {
        class: "Beds, Daybeds & Chaises",
        title: "Beds",
        image: Beds,
      },
      {
        class: "Nightstands",
        title: "Nightstands",
        image: nightStands,
      },
      {
        class: "office",
        title: "Office",
        image: office,
      },
      {
        class: "Outdoor",
        title: "Outdoor",
        image: Outside,
      },
      {
        class: "Cabinets & Storage",
        title: "Cabinets & Storage",
        image: CabinetsStorage,
      },
      {
        class: "accents",
        title: "Miscellaneous",
        image: Miscellaneous,
      },
    ];
    return (
      <>
        <ToolbarMobile />
        {this.state.searchDecor ||
        this.state.savedItems ||
        this.state.likedItems ||
        this.state.passedItems ? null : (
          <ToolbarExplore />
        )}
        <BottomMenu />
        <IonContent fullscreen>
          <IonGrid
            className="grid mobilemarginwithPRojectNAv"
            style={{ padding: "0" }}
          >
            {this.state.searchDecor ||
            this.state.savedItems ||
            this.state.likedItems ||
            this.state.passedItems ? (
              <IonRow>
                <IonCol size="12">
                  <IonCardTitle class="projectCardTitle  ion-margin-top lineAroundText">
                    <span
                      style={{
                        background: "#fff",
                        padding: "0 0 0 10px ",
                        textTransform: "capitalize",
                      }}
                    >
                      {`${this.state.client}'s `}
                    </span>
                    <span
                      style={{
                        background: "#fff",
                        padding: "0 10px 0 0  ",
                        textTransform: "lowercase",
                      }}
                    >
                      {`${this.state.room}`} Project
                    </span>
                  </IonCardTitle>
                </IonCol>
                <IonCol
                  sizeXl="3"
                  sizeLg="6"
                  sizeMd="6"
                  sizeSm="12"
                  sizeXs="12"
                  className="clientPagedHEaderButtons"
                >
                  <Link
                    to={{
                      pathname: "/searchDecor",
                      search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                    }}
                  >
                    <IonButton
                      className={
                        this.state.searchDecor
                          ? "selectedButton"
                          : "checkoutButton "
                      }
                      title="Search for Decor"
                    >
                      Search for decor
                    </IonButton>
                  </Link>
                </IonCol>
                <IonCol
                  sizeXl="3"
                  sizeLg="6"
                  sizeMd="6"
                  sizeSm="12"
                  className="clientPagedHEaderButtons"
                  sizeXs="12"
                >
                  <Link
                    to={{
                      pathname: `/viewsavedItems`,
                      search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                    }}
                  >
                    <IonButton
                      className={
                        this.state.savedItems
                          ? "selectedButton"
                          : "checkoutButton "
                      }
                      title="  See Saved Items"
                    >
                      See saved items
                    </IonButton>
                  </Link>
                </IonCol>
                <IonCol
                  sizeXl="3"
                  sizeLg="6"
                  sizeMd="6"
                  sizeSm="12"
                  className="clientPagedHEaderButtons"
                  sizeXs="12"
                >
                  {" "}
                  <Link
                    to={{
                      pathname: `/viewlikedItems`,
                      search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                    }}
                  >
                    <IonButton
                      className={
                        this.state.likedItems
                          ? "selectedButton"
                          : "checkoutButton "
                      }
                      title="Search for Decor"
                    >
                      See liked items from client
                    </IonButton>{" "}
                  </Link>
                </IonCol>
                <IonCol
                  sizeXl="3"
                  sizeLg="6"
                  sizeMd="6"
                  sizeSm="12"
                  className="clientPagedHEaderButtons"
                  sizeXs="12"
                >
                  {" "}
                  <Link
                    to={{
                      pathname: `/viewpassedItems`,
                      search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                    }}
                  >
                    <IonButton
                      className={
                        this.state.passedItems
                          ? "selectedButton"
                          : "checkoutButton "
                      }
                      title="Search for Decor"
                    >
                      See passed items from client
                    </IonButton>
                  </Link>
                </IonCol>
              </IonRow>
            ) : null}
            <IonRow style={{ padding: "0" }} className="">
              {
                this.state.loading ? (
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
                ) : (
                  // this.state.categories == "" ||
                  //   this.state.categories == null ||
                  //   this.state.categories == [] ?
                  Categories.map((Category) => (
                    <IonCol
                      sizeXl="6"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                      style={{ padding: "5px 10px" }}
                      className="exploreCol"
                    >
                      <Link
                        to={
                          this.state.searchDecor
                            ? {
                                pathname: `/viewDecor`,
                                search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                state: { category: Category.class },
                              }
                            : this.state.savedItems
                            ? {
                                pathname: `viewsavedItems`,
                                search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                state: { category: Category.class },
                              }
                            : this.state.likedItems
                            ? {
                                pathname: `viewlikedItems`,
                                search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                state: { category: Category.class },
                              }
                            : this.state.passedItems
                            ? {
                                pathname: `viewpassedItems`,
                                search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                state: { category: Category.class },
                              }
                            : {
                                pathname: `viewFurniture`,
                                state: { category: Category.class },
                              }
                        }
                        className={` hoverClass `}
                        style={{ textDecoration: "none", cursor: "pointer" }}
                      >
                        {/* <div
                          style={{}}
                          className="ExploreTitle position-absolute"
                        >
                          {Category.title}
                        </div> */}
                        <div
                          style={{}}
                          className="ExploreTitleNew position-absolute"
                        >
                          <span className="ExploreTitleSpan">
                            {Category.title}
                          </span>
                        </div>
                        <IonImg
                          src={Category.image}
                          className="exploreImg position-relative"
                          style={{ padding: 0 }}
                        />
                      </Link>
                    </IonCol>
                  ))
                )
                // : null
                // this.state.categories.map((Category) => (
                //   <IonCol
                //     sizeXl="6"
                //     sizeMd="12"
                //     sizeSm="12"
                //     sizeXs="12"
                //     style={{ padding: "5px 10px" }}
                //     className="exploreCol"
                //   >
                //     <Link
                //       to={
                //         this.state.searchDecor
                //           ? `viewDecor?category=${Category.class}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`
                //           : this.state.savedItems
                //           ? `viewsavedItems?category=${Category.class}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`
                //           : this.state.likedItems
                //           ? `viewlikedItems?category=${Category.class}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`
                //           : this.state.passedItems
                //           ? `viewpassedItems?category=${Category.class}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`
                //           : `viewFurniture?category=${Category.class}`
                //       }
                //       className={` hoverClass `}
                //       style={{ textDecoration: "none" }}
                //     >
                //       <div
                //         style={{}}
                //         className="ExploreTitle position-absolute"
                //       >
                //         {Category.description}
                //       </div>

                //       <IonImg
                //         src={
                //           Category.name === "sofas"
                //             ? sofa
                //             : Category.name === "coffee tables"
                //             ? coffeeTables
                //             : Category.name === "chairs"
                //             ? chairs
                //             : Category.name === "tv tables"
                //             ? tvTables
                //             : Category.name === "side or accent tables"
                //             ? sideTables
                //             : Category.name === "stools and benches"
                //             ? stoolsBenches
                //             : Category.name === "dining chairs"
                //             ? diningChairs
                //             : Category.name === "dining tables"
                //             ? diningTables
                //             : Category.name === "dressers"
                //             ? dressers
                //             : Category.name === "beds"
                //             ? Beds
                //             : Category.name === "nightstands"
                //             ? nightStands
                //             : Category.name === "office"
                //             ? office
                //             : Category.name === "outdoor"
                //             ? Outside
                //             : Category.name === "console tables"
                //             ? consoleTables
                //             : Outside
                //         }
                //         className="exploreImg position-relative"
                //         style={{ padding: 0 }}
                //       />
                //     </Link>
                //   </IonCol>
                // )
                //  )
              }
            </IonRow>
          </IonGrid>
        </IonContent>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  user: state.user,
});
export default connect(mapStateToProps, {
  logout,
  validateToken,
})(Explore);
