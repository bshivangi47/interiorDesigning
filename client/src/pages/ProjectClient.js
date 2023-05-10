import {
  IonContent,
  IonGrid,
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
  IonSpinner,
  IonButton,
} from "@ionic/react";

import React from "react";
import "./Page.css";
import {
  chevronBackCircleOutline,
  chevronForwardCircleOutline,
} from "ionicons/icons";
import couch from "../images/couch.jpg";
import chair from "../images/download.jpg";
import chairs from "../images/image.jpg";
import { Link } from "react-router-dom";
import cafe from "../images/backgroundimage.jpg";
import Toolbar from "../components/Toolbar";
import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/userActions";

import { GetSavedItems } from "../actions/projectActions";
class ProjectClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuClose: false,
      client: "",
      room: "",
      nextbtn: true,
      prevbtn: false,
      loadingNewItems: true,
      nextbtnpassed: true,
      prevbtnpassed: false,
      nextbtnliked: true,
      prevbtnliked: false,
      inventoryItems: [],
      designer: "Designer",
      images: [
        {
          id: 1,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 2,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 3,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 4,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 5,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 6,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 7,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 8,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 9,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 10,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 11,
          image: cafe,
          legend: "this is couch",
        },
        {
          id: 12,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 13,
          image: cafe,
          legend: "this is couch",
        },
      ],
      imagesliked: [
        {
          id: 1,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 2,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 3,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 4,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 5,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 6,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 7,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 8,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 9,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 10,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 11,
          image: cafe,
          legend: "this is couch",
        },
        {
          id: 12,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 13,
          image: cafe,
          legend: "this is couch",
        },
      ],
      imagespassed: [
        {
          id: 1,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 2,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 3,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 4,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 5,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 6,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 7,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 8,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 9,
          image: chairs,
          legend: "this is couch",
        },
        {
          id: 10,
          image: couch,
          legend: "this is couch",
        },
        {
          id: 11,
          image: cafe,
          legend: "this is couch",
        },
        {
          id: 12,
          image: chair,
          legend: "this is couch",
        },
        {
          id: 13,
          image: cafe,
          legend: "this is couch",
        },
      ],
    };
    // window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  static propTypes = {
    GetSavedItems: PropTypes.func,
    logout: PropTypes.func,
    error: PropTypes.object.isRequired,
    user: PropTypes.object,
    getSavedItemsMessage: PropTypes.string,
    getSavedItemsSuccess: PropTypes.string,
  };
  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let client = params.get("client");
    let room = params.get("room");
    this.setState({
      client: client,
      room: room,
      projectId: params.get("project"),
    });
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    const data = {
      projectId: atob(params.get("project")),
      room: room,
    };
    this.props.GetSavedItems(data);
  }
  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      console.log("ERROEMSG___", this.props.error.id);

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

    if (this.props.getSavedItemsMessage != prevProps.getSavedItemsMessage) {
      if (this.props.getSavedItemsSuccess == true) {
        this.setState({
          inventoryItems: this.props.getSavedItemsMessage,
          loadingNewItems: false,
        });
      }
    }
  }
  resize() {
    let currentHideNav = window.innerWidth <= 768;

    if (currentHideNav === true) {
      this.setState({ menuClose: true });
    } else {
      this.setState({ menuClose: false });
    }
  }

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
    const slideOpts = {
      initialSlide: 0,
      speed: 300,
      slidesPerView: this.state.menuClose ? "1" : "3",
    };
    let newItems = this.state.inventoryItems.filter(
      (items) => items.liked !== true && items.liked !== false
    );
    let clientprojectname = this.state.room;
    let likedItems = this.state.inventoryItems.filter(
      (items) => items.liked == true
    );
    let passedItems = this.state.inventoryItems.filter(
      (items) => items.liked == false
    );

    return (
      <>
        {/* <Toolbar /> */}
        <ToolbarMobile />
        <BottomMenu />
        <IonContent fullscreen>
          <IonGrid className="grid">
            <IonRow className="ion-justify-content-center  ion-align-items-center ion-nowrap">
              <IonCol>
                {/* <IonCard className="">
                  <IonCardHeader> */}{" "}
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
              </IonCol>{" "}
            </IonRow>
            <IonRow>
              <IonCol
                sizeXl="4"
                sizeLg="6"
                sizeMd="6"
                sizeSm="12"
                sizeXs="12"
                className=""
              >
                <Link
                  to={{
                    pathname: "/likeItems",
                    search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                    state: {
                      newItems: true,
                      likeItems: false,
                      passedItems: false,
                    },
                  }}
                >
                  <IonButton
                    className={
                      window.location.pathname == "/likeItems"
                        ? "selectedButton"
                        : "checkoutButton "
                    }
                    title="Search for Decor"
                  >
                    See new items from designer
                  </IonButton>
                </Link>
              </IonCol>
              <IonCol
                sizeXl="4"
                sizeLg="6"
                sizeMd="6"
                sizeSm="12"
                className=""
                sizeXs="12"
              >
                <Link
                  to={{
                    pathname: "/likeItems",
                    search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                    state: {
                      newItems: false,
                      likeItems: true,
                      passedItems: false,
                    },
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
                    See items you liked
                  </IonButton>
                </Link>
              </IonCol>
              <IonCol
                sizeXl="4"
                sizeLg="6"
                sizeMd="6"
                sizeSm="12"
                className=""
                sizeXs="12"
              >
                {" "}
                <Link
                  to={{
                    pathname: "/likeItems",
                    search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                    state: {
                      newItems: false,
                      likeItems: false,
                      passedItems: true,
                    },
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
                    See items you passed
                  </IonButton>{" "}
                </Link>
              </IonCol>
            </IonRow>{" "}
            <IonRow className="align-baseline mt-1">
              <IonCol className="py-0 ">
                <IonTitle className="itemsTitle" style={{ padding: "0" }}>
                  New Items from {this.state.designer}
                </IonTitle>
              </IonCol>
            </IonRow>
            {this.state.loadingNewItems ? (
              <IonRow
                className="mt-5  ion-align-items-center d-flex"
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
              </IonRow>
            ) : newItems.length == 0 ? (
              <IonRow className="mt-5">
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
                      // width: "fit-content",
                      margin: "auto",
                    }}
                  >
                    <IonCardHeader>
                      <IonCardTitle class="itemsTitle">
                        There are no new items from {this.state.designer}
                      </IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
            ) : (
              <IonRow>
                <IonCol size="12" className="py-0 ">
                  <div className="morePhotos mb-2">
                    <small>Click for more photos</small>
                  </div>
                  <IonSlides
                    // pager={true}
                    options={slideOpts}
                    paginationType="bullets"
                    className="swiper-container position-relative"
                    direction="vertical"
                    onIonSlideDidChange={() => {
                      var myswiper = document.querySelector(
                        ".swiper-container"
                      );
                      myswiper.isBeginning().then((result) => {
                        if (result == true) {
                          this.setState({ prevbtn: false });
                        } else {
                          this.setState({ prevbtn: true });
                        }
                      });
                      myswiper.isEnd().then((result) => {
                        if (result == true) {
                          this.setState({ nextbtn: false });
                        } else {
                          this.setState({ nextbtn: true });
                        }
                      });
                    }}
                  >
                    {newItems.length != 0
                      ? newItems.map((image) => (
                          <IonSlide>
                            <Link
                              to={{
                                pathname: "/likeItems",
                                search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                                state: {
                                  newItems: true,
                                  likeItems: false,
                                  passedItems: false,
                                },

                                // pathname: "/viewsavedItem",
                                // search: `?item=${image.MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,

                                // state: { product: image },
                                // pathname: "/itemview",
                                // state: {
                                //   productImagesLinks:
                                //     image.productinfo.productImagesLinks,
                                //   client: this.state.client,
                                //   room: this.state.room,
                                //   projectId: this.state.projectId,
                                // },
                              }}
                              title="Click on the image to see more photos of the item"
                            >
                              <IonImg
                                src={image.productinfo.productImagesLinks[0]}
                                className="addedItems"
                              />
                            </Link>
                          </IonSlide>
                        ))
                      : null}
                    {}
                  </IonSlides>

                  {this.state.prevbtn ? (
                    <a onClick={this.prev} className="backBtn">
                      <IonIcon
                        icon={chevronBackCircleOutline}
                        title="Go back"
                      />
                    </a>
                  ) : null}
                  {this.state.nextbtn &&
                  this.state.inventoryItems.length > 3 ? (
                    <a
                      onClick={this.next}
                      className="nextBtn"
                      id="nextBtn"
                      title="Go forward"
                    >
                      <IonIcon icon={chevronForwardCircleOutline} />
                    </a>
                  ) : null}
                </IonCol>
              </IonRow>
            )}
            <IonRow className="mt-4">
              <IonCol>
                <IonTitle className="itemsTitle" style={{ padding: "0" }}>
                  Items you liked
                </IonTitle>
              </IonCol>
            </IonRow>
            {this.state.loadingNewItems ? (
              <IonRow
                className="mt-5  ion-align-items-center d-flex"
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
              </IonRow>
            ) : likedItems.length == 0 ? (
              <IonRow className="mt-5">
                {" "}
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
                      // width: "fit-content",
                      margin: "auto",
                    }}
                  >
                    <IonCardHeader>
                      <IonCardTitle class="itemsTitle">
                        You have not liked any items
                      </IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
            ) : (
              <IonRow>
                <IonCol size="12" className="">
                  <div className="morePhotos mb-2">
                    <small>Click for more photos</small>
                  </div>
                  <IonSlides
                    // pager={true}
                    options={slideOpts}
                    paginationType="bullets"
                    className="swiper-containerliked position-relative"
                    direction="vertical"
                    onIonSlideDidChange={() => {
                      var myswiper = document.querySelector(
                        ".swiper-containerliked"
                      );
                      myswiper.isBeginning().then((result) => {
                        if (result == true) {
                          this.setState({ prevbtnliked: false });
                        } else {
                          this.setState({ prevbtnliked: true });
                        }
                      });
                      myswiper.isEnd().then((result) => {
                        if (result == true) {
                          this.setState({ nextbtnliked: false });
                        } else {
                          this.setState({ nextbtnliked: true });
                        }
                      });
                    }}
                  >
                    {likedItems.map((image, i) => (
                      <IonSlide key={i}>
                        <Link
                          to={{
                            pathname: "/likeItems",
                            search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                            state: {
                              newItems: false,
                              likeItems: true,
                              passedItems: false,
                            },
                            // pathname: "/viewItem",
                            // search: `?item=${image.MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,

                            // state: { product: image },
                            // pathname: "/itemview",
                            // state: {
                            //   productImagesLinks:
                            //     image.productinfo.productImagesLinks,
                            //   client: this.state.client,
                            //   room: this.state.room,
                            //   projectId: this.state.projectId,
                            // },
                          }}
                          title="Click on the image to see more photos of the item"
                        >
                          <IonImg
                            src={image.productinfo.productImagesLinks[0]}
                            className="addedItems"
                          />
                        </Link>
                      </IonSlide>
                    ))}
                  </IonSlides>

                  {this.state.prevbtnliked ? (
                    <a onClick={this.prevliked} className="backBtn">
                      <IonIcon
                        icon={chevronBackCircleOutline}
                        title="Go back"
                      />
                    </a>
                  ) : null}
                  {this.state.nextbtnliked && likedItems.length > 3 ? (
                    <a
                      onClick={this.nextliked}
                      className="nextBtn"
                      id="nextBtn"
                      title="Go forward"
                    >
                      <IonIcon icon={chevronForwardCircleOutline} />
                    </a>
                  ) : null}
                </IonCol>
              </IonRow>
            )}
            <IonRow className="mt-4">
              <IonCol>
                <IonTitle className="itemsTitle" style={{ padding: "0" }}>
                  Items you passed
                </IonTitle>
              </IonCol>
            </IonRow>
            {this.state.loadingNewItems ? (
              <IonRow
                className="mt-5  ion-align-items-center d-flex"
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
              </IonRow>
            ) : passedItems.length == 0 ? (
              <IonRow className="mt-5">
                {" "}
                <IonCol
                  size="6"
                  style={{
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  <IonCard
                    className="projectCards"
                    style={{
                      textAlign: "center",
                      // width: "fit-content",
                      margin: "auto",
                    }}
                  >
                    <IonCardHeader>
                      <IonCardTitle class="itemsTitle">
                        You have not passed any items
                      </IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
            ) : (
              <IonRow>
                <IonCol size="12" className=" mobilemargin">
                  <div className="morePhotos mb-2">
                    <small>Click for more photos</small>
                  </div>
                  <IonSlides
                    // pager={true}
                    options={slideOpts}
                    paginationType="bullets"
                    className="swiper-containerpassed position-relative"
                    direction="vertical"
                    onIonSlideDidChange={() => {
                      var myswiper = document.querySelector(
                        ".swiper-containerpassed"
                      );
                      myswiper.isBeginning().then((result) => {
                        if (result == true) {
                          this.setState({ prevbtnpassed: false });
                        } else {
                          this.setState({ prevbtnpassed: true });
                        }
                      });
                      myswiper.isEnd().then((result) => {
                        if (result == true) {
                          this.setState({ nextbtnpassed: false });
                        } else {
                          this.setState({ nextbtnpassed: true });
                        }
                      });
                    }}
                  >
                    {passedItems.map((image, i) => (
                      <IonSlide key={i}>
                        <Link
                          to={{
                            pathname: "/likeItems",
                            search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                            state: {
                              newItems: false,
                              likeItems: false,
                              passedItems: true,
                            },
                            // pathname: "/viewItem",
                            // search: `?item=${image.MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                            // state: { product: image },
                          }}
                          // to={{
                          //   pathname: "/itemview",
                          //   state: {
                          //     productImagesLinks:
                          //       image.productinfo.productImagesLinks,
                          //     client: this.state.client,
                          //     room: this.state.room,
                          //     projectId: this.state.projectId,
                          //   },
                          // }}
                          title="Click on the image to see more photos of the item"
                        >
                          <IonImg
                            src={image.productinfo.productImagesLinks[0]}
                            className="addedItems"
                          />
                        </Link>
                      </IonSlide>
                    ))}
                  </IonSlides>

                  {this.state.prevbtnpassed ? (
                    <a onClick={this.prevpassed} className="backBtn">
                      <IonIcon
                        icon={chevronBackCircleOutline}
                        title="Go back"
                      />
                    </a>
                  ) : null}
                  {this.state.nextbtnpassed && passedItems.length > 3 ? (
                    <a
                      onClick={this.nextpassed}
                      className="nextBtn"
                      id="nextBtn"
                      title="Go forward"
                    >
                      <IonIcon icon={chevronForwardCircleOutline} />
                    </a>
                  ) : null}
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
        </IonContent>
        {/* </IonPage>
      </IonSplitPane> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  user: state.user,
  getSavedItemsMessage: state.project.getSavedItemsMessage,
  getSavedItemsSuccess: state.project.getSavedItemsSuccess,
});
export default connect(mapStateToProps, {
  logout,
  GetSavedItems,
})(ProjectClient);
