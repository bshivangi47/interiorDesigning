import {
  IonContent,
  IonGrid,
  IonIcon,
  IonButton,
  IonRow,
  IonImg,
  IonText,
  IonCol,
  IonSpinner,
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import { Link } from "react-router-dom";

import React from "react";
import "./Page.css";

import couch from "../images/couch.jpg";
import chair from "../images/download.jpg";
import chairs from "../images/image.jpg";
import cafe from "../images/backgroundimage.jpg";

import { thumbsDownOutline, thumbsUpOutline } from "ionicons/icons";
import cart from "../images/cart.svg";
import TinderCard from "react-tinder-card";

import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/userActions";
import {
  AddToCart,
  GetCartItem,
  UpdateQuantity,
  GetCartItems,
} from "../actions/cartActions";
import {
  GetSavedItems,
  LikeItem,
  PassItem,
  GetLikedItems,
  GetPassedItems,
} from "../actions/projectActions";
class ItemsAdded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItems: true,
      likeItems: false,
      passedItems: false,
      AddedTocart: false,
      cartItem: "",
      cartItems: [],
      loading: true,
      menuClose: false,
      alredyRemoved: [],
      inventoryItems: [],
      inventoryLikedItems: [],
      inventoryPassedItems: [],
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
      imagesState: [
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
      imagesStatedb: [
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
      lastDirection: "",
      // alredyRemoved: [],
      liked: [],
      passed: [],
      alertMsg: "",
      showAlert: false,
    };
    this.childRefs = React.createRef();
    this.childRefs.current = [];
  }
  static propTypes = {
    GetSavedItems: PropTypes.func,
    LikeItem: PropTypes.func,
    PassItem: PropTypes.func,
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
    if (
      this.props.location.state &&
      (this.props.location.state.newItems ||
        this.props.location.state.likeItems ||
        this.props.location.state.passedItems)
    ) {
      this.setState({
        newItems: this.props.location.state.newItems,
        likeItems: this.props.location.state.likeItems,
        passedItems: this.props.location.state.passedItems,
      });
    }
    const data = {
      projectId: atob(params.get("project")),
      room: room,
    };
    this.props.GetSavedItems(data);
    this.props.GetLikedItems(data);
    this.props.GetPassedItems(data);
    this.props.GetCartItems();
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
    if (this.props.cartItems != prevProps.cartItems) {
      if (this.props.cartItems.success == true) {
        this.setState({
          cartItems: this.props.cartItems.message,
        });
      }
    }
    if (this.props.getSavedItemsMessage != prevProps.getSavedItemsMessage) {
      if (this.props.getSavedItemsSuccess == true) {
        const result = this.props.getSavedItemsMessage;
        // .filter(
        //   (items) => items.liked != true
        // );
        this.setState({
          inventoryItems: result,
          loading: false,
        });
        if (result.length > 0)
          this.props.GetCartItem(result[result.length - 1].MOE_item);
      }
    }
    if (this.props.getlikeItems != prevProps.getlikeItems) {
      if (this.props.getlikeItems.success == true) {
        const result = this.props.getlikeItems.message;
        // .filter(
        //   (items) => items.liked != true
        // );
        this.setState({
          inventoryLikedItems: result,
          loading: false,
        });
      }
    }
    if (this.props.getpassItems != prevProps.getpassItems) {
      if (this.props.getpassItems.success == true) {
        const result = this.props.getpassItems.message;
        // .filter(
        //   (items) => items.liked != true
        // );
        this.setState({
          inventoryPassedItems: result,
          loading: false,
        });
      }
    }
    if (this.props.addtoCart != prevProps.addtoCart) {
      if (this.props.addtoCart.success == true) {
        this.setState({ AddedTocart: true });
        const cardsLeft = this.state.inventoryItems.filter(
          (person) => !this.state.alredyRemoved.includes(person._id)
        );
        console.log("cardsLEft-=-==--=-=", cardsLeft);
        if (cardsLeft.length) {
          const toBeRemoved = cardsLeft[cardsLeft.length - 1]; // Find the card object to be removed

          console.log(" toBeRemoved", toBeRemoved);
          this.props.GetCartItem(toBeRemoved.MOE_item);
        }
        this.props.GetCartItems();
      }
    }
    if (this.props.getItemFromCart != prevProps.getItemFromCart) {
      if (this.props.getItemFromCart.success == true) {
        if (this.props.getItemFromCart.message.length != 0) {
          this.setState({
            AddedTocart: true,
            cartItem: this.props.getItemFromCart.message[0],
          });
        } else {
          this.setState({
            AddedTocart: false,
            cartItem: "",
          });
        }
      }
    }
    if (this.props.updateQuantity != prevProps.updateQuantity) {
      if (this.props.updateQuantity.success == true) {
        // this.setState({ AddedTocart: true });
        const cardsLeft = this.state.inventoryItems.filter(
          (person) => !this.state.alredyRemoved.includes(person._id)
        );
        console.log("cardsLEft-=-==--=-=", cardsLeft);
        if (cardsLeft.length) {
          const toBeRemoved = cardsLeft[cardsLeft.length - 1]; // Find the card object to be removed

          console.log(" toBeRemoved", toBeRemoved);
          this.props.GetCartItem(toBeRemoved.MOE_item);
        }
        this.props.GetCartItems();
      }
    }
    if (this.props.likeItems != prevProps.likeItems) {
      if (this.props.likeItems.success == true) {
        const data = {
          projectId: atob(this.state.projectId),
          room: this.state.room,
        };
        this.props.GetLikedItems(data);
        this.props.GetPassedItems(data);
      }
    }
    if (this.props.passItems != prevProps.passItems) {
      if (this.props.passItems.success == true) {
        const data = {
          projectId: atob(this.state.projectId),
          room: this.state.room,
        };
        this.props.GetPassedItems(data);
        this.props.GetLikedItems(data);
      }
    }
  }
  handleCallBack = (childData) => {
    this.setState({ menuClose: childData });
  };
  addToRefs = (el) => {
    if (el && !this.childRefs.current.includes(el)) {
      this.childRefs.current.push(el);
    }
  };
  handleMenutoggle = () => {
    this.setState({ menuClose: false });
  };
  swiped = (direction, nameToDelete, data) => {
    console.log("removing: " + nameToDelete);
    this.setState({ lastDirection: direction });
    if (!this.childRefs.current.includes(nameToDelete)) {
      this.state.alredyRemoved.push(nameToDelete);
    }
    const cardsLeft = this.state.inventoryItems.filter(
      (person) =>
        !this.state.alredyRemoved.includes(person._id) &&
        person._id != nameToDelete
    );
    console.log("cardsLEft-=-==--=-=", cardsLeft);
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1]; // Find the card object to be removed

      console.log(" toBeRemoved", toBeRemoved);
      this.props.GetCartItem(toBeRemoved.MOE_item);
    }
    const APIdata = {
      projectId: data.projectId,
      MOE_item: data.MOE_item,
      room: data.room,
    };
    if (direction == "right") {
      this.state.liked.push(nameToDelete);
      this.props.LikeItem(APIdata);
    } else if (direction == "left") {
      this.state.passed.push(nameToDelete);
      this.props.PassItem(APIdata);
    } else if (direction == "up") {
      this.props.history.push({
        pathname: "/itemview",

        state: { productImagesLinks: data.productinfo.productImagesLinks },
      });
    }

    console.log("alredyRemoved...", this.state.alredyRemoved);
  };
  swipe = (dir) => {
    const cardsLeft = this.state.inventoryItems.filter(
      (person) => !this.state.alredyRemoved.includes(person._id)
    );
    console.log("cardsLEft-=-==--=-=", cardsLeft);
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1]._id; // Find the card object to be removed
      const index = this.state.inventoryItems
        .map((person) => person._id)
        .indexOf(toBeRemoved); // Find the index of which to make the reference to

      this.childRefs.current[index].swipe(dir); // Swipe the card!
    }
  };
  outOfFrame = (name, data) => {
    console.log(name + " left the screen!");

    this.state.imagesStatedb = this.state.imagesStatedb.filter(
      (character) => character.id !== name
    );
    this.setState({ imagesState: this.state.imagesStatedb });
  };
  AddCart = () => {
    const cardsLeft = this.state.inventoryItems.filter(
      (person) => !this.state.alredyRemoved.includes(person._id)
    );
    console.log("cardsLEft-=-==--=-=", cardsLeft);
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1]; // Find the card object to be removed

      console.log(" toBeRemoved", toBeRemoved);
      this.props.AddToCart(toBeRemoved.pricing[0].Map, toBeRemoved.MOE_item);
    }
  };
  updateQuantity = (quantity) => {
    const cardsLeft = this.state.inventoryItems.filter(
      (person) => !this.state.alredyRemoved.includes(person._id)
    );
    console.log("cardsLEft-=-==--=-=", cardsLeft);
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1]; // Find the card object to be removed

      console.log(" toBeRemoved", toBeRemoved);
      this.props.UpdateQuantity(toBeRemoved.MOE_item, quantity);
    }
  };
  render() {
    let newItems = this.state.inventoryItems;
    // .filter(
    //   (items) => items.liked !== true
    // );
    let likedItems = this.state.inventoryLikedItems;
    let passedItems = this.state.inventoryPassedItems;
    console.log("this.state.cart", this.state.cartItems);
    return (
      <>
        {/* <Toolbar /> */}
        <ToolbarMobile />
        <BottomMenu />
        <IonContent>
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
          <IonGrid
            className="ion-justify-content-center  ion-align-items-center  "
            style={this.state.loading ? { height: "100%", margin: "0" } : null}
          >
            <IonRow className="ion-justify-content-center ion-align-items-center ion-nowrap">
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
                    {`${this.state.room}`} Project
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
                {/* <Link
                  to={{
                    pathname: "/likeItems",
                    search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                  }}
                > */}
                <IonButton
                  className={
                    this.state.newItems ? "selectedButton" : "checkoutButton "
                  }
                  onClick={() => {
                    this.setState({
                      newItems: true,
                      likeItems: false,
                      passedItems: false,
                    });
                  }}
                  title="Search for Decor"
                >
                  see new items from designer
                </IonButton>
                {/* </Link> */}
              </IonCol>
              <IonCol
                sizeXl="4"
                sizeLg="6"
                sizeMd="6"
                sizeSm="12"
                className=""
                sizeXs="12"
              >
                <IonButton
                  className={
                    this.state.likeItems ? "selectedButton" : "checkoutButton "
                  }
                  onClick={() => {
                    this.setState({
                      newItems: false,
                      likeItems: true,
                      passedItems: false,
                    });
                  }}
                  title="  See Saved Items"
                >
                  See items you liked
                </IonButton>
              </IonCol>
              <IonCol
                sizeXl="4"
                sizeLg="6"
                sizeMd="6"
                sizeSm="12"
                className=""
                sizeXs="12"
              >
                <IonButton
                  className={
                    this.state.passedItems
                      ? "selectedButton"
                      : "checkoutButton "
                  }
                  onClick={() => {
                    this.setState({
                      newItems: false,
                      likeItems: false,
                      passedItems: true,
                    });
                  }}
                  title="Search for Decor"
                >
                  See items you passed
                </IonButton>
              </IonCol>
            </IonRow>
            {this.state.loading ? (
              <IonRow style={{ height: "100%", margin: "0" }}>
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
                </IonCol>{" "}
              </IonRow>
            ) : this.state.newItems ? (
              newItems.length == 0 ? (
                <IonRow className="mt-5">
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
                          You have no items from the designer
                        </IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                  </IonCol>
                </IonRow>
              ) : (
                <>
                  <IonRow className="ion-justify-content-center  ion-align-items-center  ">
                    <IonCol style={{ width: "100%", textAlign: "center" }}>
                      <div className="cardContainer justify-content-center mt-3 d-flex">
                        {newItems.map((index, i) => (
                          <TinderCard
                            ref={this.addToRefs}
                            className="swipe m-auto"
                            key={index._id}
                            onSwipe={(dir) =>
                              this.swiped(dir, index._id, index)
                            }
                            onCardLeftScreen={() =>
                              this.outOfFrame(index._id, index)
                            }
                            preventSwipe={["down"]}
                          >
                            <>
                              <IonImg
                                src={index.productinfo.productImagesLinks[0]}
                                className="col-md-12 card "
                                title="Swipe left to pass and right to like"
                                style={{ borderRadius: "20px" }}
                              />
                            </>
                          </TinderCard>
                        ))}
                        {this.state.alredyRemoved.length ===
                        this.state.inventoryItems.length ? (
                          <IonText style={{ margin: "auto" }}>
                            You have reached the end
                          </IonText>
                        ) : null}
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <div
                      style={{ textAlign: "center", margin: "auto" }}
                      className="  mt-3"
                    >
                      <small>
                        *Swipe left if you do not like this item or swipe right
                        if you do and swipe up to see more images of the item
                      </small>
                    </div>
                  </IonRow>
                  <IonRow>
                    <span className="buttons mt-1" style={{ margin: "auto " }}>
                      <IonButton
                        className="charcoal ion-margin-end"
                        onClick={() => this.swipe("left")}
                      >
                        Pass{" "}
                        <IonIcon
                          className="ion-margin-start pass"
                          icon={thumbsDownOutline}
                        />
                      </IonButton>
                      <IonButton
                        className="charcoal"
                        onClick={() => this.swipe("right")}
                      >
                        Like{" "}
                        <IonIcon
                          icon={thumbsUpOutline}
                          className="ion-margin-start pass"
                        />
                      </IonButton>
                    </span>
                    {this.state.lastDirection == "right" ? (
                      <IonText className="infoText">You liked the item</IonText>
                    ) : this.state.lastDirection == "left" ? (
                      <IonText className="infoText">
                        You passed the item
                      </IonText>
                    ) : null}
                  </IonRow>
                  {this.state.alredyRemoved.length !==
                  this.state.inventoryItems.length ? (
                    <IonRow className="ion-justify-content-center  ion-align-items-center container mobilemargin ">
                      {this.state.AddedTocart ? (
                        <div
                          class="input-group my-2"
                          style={{ maxWidth: "115px" }}
                        >
                          <div class="input-group-prepend">
                            <button
                              class="input-group-text"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                this.updateQuantity(
                                  this.state.cartItem.quantity - 1
                                );
                                // this.props.UpdateQuantity(
                                //   this.props.location.state.product.MOE_item,
                                //   this.state.cartItem.quantity - 1
                                // );
                              }}
                            >
                              -
                            </button>
                          </div>
                          <input
                            className="form-control text-center"
                            value={this.state.cartItem.quantity}
                            type="text"
                          />
                          <div class="input-group-append">
                            <button
                              class="input-group-text"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                this.updateQuantity(
                                  this.state.cartItem.quantity + 1
                                );
                                // this.props.UpdateQuantity(
                                //   this.props.location.state.product.MOE_item,
                                //   this.state.cartItem.quantity + 1
                                // );
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <IonButton
                          className="cashmere"
                          onClick={() => this.AddCart()}
                        >
                          Add to cart{" "}
                          <IonImg
                            src={cart}
                            style={{
                              height: "12px",
                              width: "12px",
                            }}
                            className="ml-2 "
                          />
                        </IonButton>
                      )}
                    </IonRow>
                  ) : null}{" "}
                </>
              )
            ) : this.state.likeItems ? (
              likedItems.length == 0 ? (
                <IonRow className="mt-5">
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
                          You have no liked items
                        </IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                  </IonCol>
                </IonRow>
              ) : (
                <IonRow className="">
                  {likedItems.map((items, i) => {
                    let found = this.state.cartItems.filter(
                      (el) => el.MOE_ITEM === items.MOE_item
                    );
                    console.log("found=-==", found);
                    if (
                      items.InventoryDetails.Stock_WA != 0 ||
                      items.InventoryDetails.Stock_NJ != 0
                    ) {
                      return (
                        <IonCol
                          sizeXl="4"
                          sizeLg="4"
                          sizeMd="6"
                          sizeSm="6"
                          sizeXs="6"
                          className="furnitureCol"
                          key={i}
                        >
                          <IonCard className="viewFurnitureCard">
                            <IonCardContent style={{ padding: "10px" }}>
                              <Link
                                to={{
                                  pathname: "/viewItem",
                                  search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,

                                  state: { product: items },
                                }}
                                className="furnitureLink"
                              >
                                <IonImg
                                  src={items.productinfo.productImagesLinks[0]}
                                  onError={(e) => {
                                    console.log("onError-=--=-=", e);
                                    e.target.onerror = null;
                                    e.target.src =
                                      items.productImagesLinks[1] ||
                                      items.productinfo.productImagesLinks[0];
                                  }}
                                  alt={items.productinfo.MOE_productName}
                                  className="furniture"
                                />
                                <div className="priceDiv d-flex ion-justify-content-between">
                                  <IonCardSubtitle
                                    className="ion-text-nowrap mt-1 DetailsSingleItem"
                                    style={{ fontWeight: "500" }}
                                  >
                                    {items.productinfo.MOE_productName}
                                  </IonCardSubtitle>
                                  {/* <div>
                                  <IonIcon
                                    icon={heartOutline}
                                    style={{
                                      color: "black",
                                      verticalAlign: "bottom",
                                      fontSize: "15px",
                                    }}
                                  />
                                </div> */}
                                </div>{" "}
                                <div className="priceDiv d-flex ion-justify-content-between">
                                  <IonCardSubtitle
                                    style={{ fontWeight: "300" }}
                                    className=" DetailsSingleItem"
                                  >
                                    Retail Price: {`$${items.pricing[0].Map}`}
                                  </IonCardSubtitle>
                                </div>
                                <IonCardSubtitle
                                  className="furnitureDetails DetailsSingleItem"
                                  style={{ fontWeight: "400" }}
                                >
                                  Details:
                                </IonCardSubtitle>
                                <IonText
                                  className="furnitureDetails DetailsSingleItem mb-2 furnitureDetailstext"
                                  style={{ fontWeight: "300" }}
                                >
                                  {items.productinfo.SEO.shortDescription}
                                </IonText>{" "}
                              </Link>
                              <IonRow>
                                <IonCol size="6">
                                  <IonButton
                                    className="cashmere"
                                    style={{ margin: 0, width: "100%" }}
                                    onClick={(e) => {
                                      const APIdata = {
                                        projectId: items.projectId,
                                        MOE_item: items.MOE_item,
                                        room: items.room,
                                      };
                                      this.props.PassItem(APIdata);
                                    }}
                                  >
                                    Pass{" "}
                                    <IonIcon
                                      className="ion-margin-start pass"
                                      icon={thumbsDownOutline}
                                    />
                                  </IonButton>
                                </IonCol>
                                <IonCol size="6">
                                  {found.length == 0 ? (
                                    <IonButton
                                      className="charcoal"
                                      style={{ margin: 0, width: "100%" }}
                                      onClick={(e) => {
                                        this.props.AddToCart(
                                          items.pricing[0].Map,
                                          items.MOE_item
                                        );
                                      }}
                                    >
                                      Add to Cart
                                    </IonButton>
                                  ) : (
                                    <div
                                      class="input-group"
                                      // style={{ maxWidth: "115px" }}
                                    >
                                      <div class="input-group-prepend">
                                        <button
                                          class="input-group-text"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            this.props.UpdateQuantity(
                                              found[0].MOE_ITEM,
                                              found[0].quantity - 1
                                            );
                                          }}
                                        >
                                          -
                                        </button>
                                      </div>
                                      <input
                                        className="form-control text-center"
                                        value={found[0].quantity}
                                        type="text"
                                      />
                                      <div class="input-group-append">
                                        <button
                                          class="input-group-text"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            this.props.UpdateQuantity(
                                              found[0].MOE_ITEM,
                                              found[0].quantity + 1
                                            );
                                          }}
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </IonCol>
                              </IonRow>{" "}
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      );
                    }
                  })}
                  {likedItems.map((items, i) => {
                    if (
                      items.InventoryDetails.Stock_WA == 0 &&
                      items.InventoryDetails.Stock_NJ == 0
                    ) {
                      console.log("items-=-=-=-=", items);
                      return (
                        <IonCol
                          sizeXl="4"
                          sizeLg="4"
                          sizeMd="6"
                          sizeSm="6"
                          sizeXs="6"
                          className="furnitureCol"
                          key={i}
                        >
                          <IonCard className="viewFurnitureCard">
                            <IonCardContent style={{ padding: "10px" }}>
                              <Link
                                to={{
                                  pathname: "/viewItem",
                                  search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,

                                  state: { product: items },
                                }}
                                className="furnitureLink"
                              >
                                <IonImg
                                  src={items.productinfo.productImagesLinks[0]}
                                  onError={(e) => {
                                    console.log("onError-=--=-=", e);
                                    e.target.onerror = null;
                                    e.target.src = items.productImagesLinks[1];
                                  }}
                                  alt={items.productinfo.MOE_productName}
                                  className="furniture"
                                />
                                <IonCardSubtitle
                                  className="ion-text-nowrap mt-1 DetailsSingleItem"
                                  style={{ fontWeight: "500" }}
                                >
                                  {items.productinfo.MOE_productName}
                                </IonCardSubtitle>
                                <div className="priceDiv d-flex ion-justify-content-between">
                                  <IonCardSubtitle
                                    style={{ fontWeight: "300" }}
                                    className=" DetailsSingleItem"
                                  >
                                    Retail Price:
                                    {` $${items.pricing[0].Map}`}
                                  </IonCardSubtitle>
                                </div>
                                <IonCardSubtitle
                                  style={{ fontWeight: "400", color: "red" }}
                                  className="DetailsSingleItem"
                                >
                                  Out of stock
                                </IonCardSubtitle>
                                <IonCardSubtitle
                                  className="furnitureDetails DetailsSingleItem"
                                  style={{ fontWeight: "400" }}
                                >
                                  Details:
                                </IonCardSubtitle>
                                <IonText
                                  className="furnitureDetails DetailsSingleItem mb-2 furnitureDetailstext"
                                  style={{ fontWeight: "300" }}
                                >
                                  {items.productinfo.SEO.shortDescription}
                                </IonText>{" "}
                              </Link>

                              <IonButton
                                className="cashmere"
                                style={{ margin: 0, width: "100%" }}
                                onClick={(e) => {
                                  const APIdata = {
                                    projectId: items.projectId,
                                    MOE_item: items.MOE_item,
                                    room: items.room,
                                  };
                                  this.props.PassItem(APIdata);
                                }}
                              >
                                Pass{" "}
                                <IonIcon
                                  className="ion-margin-start pass"
                                  icon={thumbsDownOutline}
                                />
                              </IonButton>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      );
                    }
                  })}
                </IonRow>
              )
            ) : this.state.passedItems ? (
              passedItems.length == 0 ? (
                <IonRow className="mt-5">
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
                          You have no passed items
                        </IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                  </IonCol>
                </IonRow>
              ) : (
                <IonRow className="">
                  {passedItems.map((items, i) => {
                    let found = this.state.cartItems.filter(
                      (el) => el.MOE_ITEM === items.MOE_item
                    );
                    if (
                      items.InventoryDetails.Stock_WA != 0 ||
                      items.InventoryDetails.Stock_NJ != 0
                    ) {
                      return (
                        <IonCol
                          sizeXl="4"
                          sizeLg="4"
                          sizeMd="6"
                          sizeSm="6"
                          sizeXs="6"
                          className="furnitureCol"
                          key={i}
                        >
                          <IonCard className="viewFurnitureCard">
                            <IonCardContent style={{ padding: "10px" }}>
                              <Link
                                to={{
                                  pathname: "/viewItem",
                                  search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,
                                  state: { product: items },
                                }}
                                className="furnitureLink"
                              >
                                <IonImg
                                  src={items.productinfo.productImagesLinks[0]}
                                  onError={(e) => {
                                    console.log("onError-=--=-=", e);
                                    e.target.onerror = null;
                                    e.target.src =
                                      items.productImagesLinks[1] ||
                                      items.productinfo.productImagesLinks[0];
                                  }}
                                  alt={items.productinfo.MOE_productName}
                                  className="furniture"
                                />
                                <div className="priceDiv d-flex ion-justify-content-between">
                                  <IonCardSubtitle
                                    className="ion-text-nowrap mt-1 DetailsSingleItem"
                                    style={{ fontWeight: "500" }}
                                  >
                                    {items.productinfo.MOE_productName}
                                  </IonCardSubtitle>
                                  {/* <div>
                                  <IonIcon
                                    icon={heartOutline}
                                    style={{
                                      color: "black",
                                      verticalAlign: "bottom",
                                      fontSize: "15px",
                                    }}
                                  />
                                </div> */}
                                </div>{" "}
                                <div className="priceDiv d-flex ion-justify-content-between">
                                  <IonCardSubtitle
                                    style={{ fontWeight: "300" }}
                                    className=" DetailsSingleItem"
                                  >
                                    Retail Price: {`$${items.pricing[0].Map}`}
                                  </IonCardSubtitle>
                                </div>
                                <IonCardSubtitle
                                  className="furnitureDetails DetailsSingleItem"
                                  style={{ fontWeight: "400" }}
                                >
                                  Details:
                                </IonCardSubtitle>
                                <IonText
                                  className="furnitureDetails DetailsSingleItem mb-2 furnitureDetailstext"
                                  style={{ fontWeight: "300" }}
                                >
                                  {items.productinfo.SEO.shortDescription}
                                </IonText>{" "}
                              </Link>
                              <IonRow>
                                <IonCol size="6">
                                  <IonButton
                                    className="cashmere "
                                    style={{ margin: 0, width: "100%" }}
                                    onClick={(e) => {
                                      const APIdata = {
                                        projectId: items.projectId,
                                        MOE_item: items.MOE_item,
                                        room: items.room,
                                      };
                                      this.props.LikeItem(APIdata);
                                    }}
                                  >
                                    Like{" "}
                                    <IonIcon
                                      icon={thumbsUpOutline}
                                      className="ion-margin-start pass"
                                    />
                                  </IonButton>
                                </IonCol>
                                <IonCol size="6">
                                  {found.length == 0 ? (
                                    <IonButton
                                      className="charcoal m-0"
                                      style={{
                                        width: "100%",
                                        textAlign: "center",
                                      }}
                                      onClick={(e) => {
                                        this.props.AddToCart(
                                          items.pricing[0].Map,
                                          items.MOE_item
                                        );
                                      }}
                                    >
                                      Add to Cart
                                    </IonButton>
                                  ) : (
                                    <div
                                      class="input-group"
                                      // style={{ maxWidth: "115px" }}
                                    >
                                      <div class="input-group-prepend">
                                        <button
                                          class="input-group-text"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            this.props.UpdateQuantity(
                                              found[0].MOE_ITEM,
                                              found[0].quantity - 1
                                            );
                                          }}
                                        >
                                          -
                                        </button>
                                      </div>
                                      <input
                                        className="form-control text-center"
                                        value={found[0].quantity}
                                        type="text"
                                      />
                                      <div class="input-group-append">
                                        <button
                                          class="input-group-text"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            this.props.UpdateQuantity(
                                              found[0].MOE_ITEM,
                                              found[0].quantity + 1
                                            );
                                          }}
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </IonCol>
                              </IonRow>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      );
                    }
                  })}
                  {passedItems.map((items, i) => {
                    if (
                      items.InventoryDetails.Stock_WA == 0 &&
                      items.InventoryDetails.Stock_NJ == 0
                    ) {
                      console.log("items-=-=-=-=", items);
                      return (
                        <IonCol
                          sizeXl="4"
                          sizeLg="4"
                          sizeMd="6"
                          sizeSm="6"
                          sizeXs="6"
                          className="furnitureCol"
                          key={i}
                        >
                          <IonCard className="viewFurnitureCard">
                            <IonCardContent style={{ padding: "10px" }}>
                              <Link
                                to={{
                                  pathname: "/viewItem",
                                  search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectId}`,

                                  state: { product: items },
                                }}
                                className="furnitureLink"
                              >
                                <IonImg
                                  src={items.productinfo.productImagesLinks[0]}
                                  onError={(e) => {
                                    console.log("onError-=--=-=", e);
                                    e.target.onerror = null;
                                    e.target.src = items.productImagesLinks[1];
                                  }}
                                  alt={items.productinfo.MOE_productName}
                                  className="furniture"
                                />
                                <IonCardSubtitle
                                  className="ion-text-nowrap mt-1 DetailsSingleItem"
                                  style={{ fontWeight: "500" }}
                                >
                                  {items.productinfo.MOE_productName}
                                </IonCardSubtitle>
                                <div className="priceDiv d-flex ion-justify-content-between">
                                  <IonCardSubtitle
                                    style={{ fontWeight: "300" }}
                                    className=" DetailsSingleItem"
                                  >
                                    Retail Price:
                                    {` $${items.pricing[0].Map}`}
                                  </IonCardSubtitle>
                                </div>
                                <IonCardSubtitle
                                  style={{ fontWeight: "400", color: "red" }}
                                  className="DetailsSingleItem"
                                >
                                  Out of stock
                                </IonCardSubtitle>
                                <IonCardSubtitle
                                  className="furnitureDetails DetailsSingleItem"
                                  style={{ fontWeight: "400" }}
                                >
                                  Details:
                                </IonCardSubtitle>
                                <IonText
                                  className="furnitureDetails DetailsSingleItem mb-2 furnitureDetailstext"
                                  style={{ fontWeight: "300" }}
                                >
                                  {items.productinfo.SEO.shortDescription}
                                </IonText>{" "}
                              </Link>

                              <IonButton
                                className="cashmere"
                                style={{ margin: 0, width: "100%" }}
                                onClick={(e) => {
                                  const APIdata = {
                                    projectId: items.projectId,
                                    MOE_item: items.MOE_item,
                                    room: items.room,
                                  };
                                  this.props.LikeItem(APIdata);
                                }}
                              >
                                Like{" "}
                                <IonIcon
                                  icon={thumbsUpOutline}
                                  className="ion-margin-start pass"
                                />
                              </IonButton>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      );
                    }
                  })}
                </IonRow>
              )
            ) : null}
          </IonGrid>
        </IonContent>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  user: state.user,
  getSavedItemsMessage: state.project.getSavedItemsMessage,
  getSavedItemsSuccess: state.project.getSavedItemsSuccess,
  likeItems: state.project.likeItems,
  passItems: state.project.passItems,
  getlikeItems: state.project.getlikeItems,
  getpassItems: state.project.getpassItems,
  addtoCart: state.cart.addtoCart,
  cartItems: state.cart.cartItems,
  getItemFromCart: state.cart.getItemFromCart,
  updateQuantity: state.cart.updateQuantity,
});
export default connect(mapStateToProps, {
  logout,
  GetSavedItems,
  LikeItem,
  PassItem,
  AddToCart,
  GetCartItem,
  UpdateQuantity,
  GetLikedItems,
  GetPassedItems,
  GetCartItems,
})(ItemsAdded);
