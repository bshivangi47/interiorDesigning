import {
  IonContent,
  IonGrid,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonCardSubtitle,
  IonIcon,
  IonCardHeader,
} from "@ionic/react";

import React from "react";
import "./Page.css";
import { Link } from "react-router-dom";
import { trashOutline } from "ionicons/icons";
import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";
import ToolbarExplore from "../components/ToolbarExplore";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/userActions";
import {
  AddToCart,
  GetCartItem,
  UpdateQuantity,
  GetCartItems,
} from "../actions/cartActions";
class FinalCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuClose: false,
      Qty: { item1: 1, item2: 1 },
      cartItems: [],
    };
  }
  static propTypes = {
    SaveToProject: PropTypes.func,
    AddToCart: PropTypes.func,
    UpdateQuantity: PropTypes.func,
    GetCartItem: PropTypes.func,
    GetCartItems: PropTypes.func,
    logout: PropTypes.func,
    inventory: PropTypes.object,
    error: PropTypes.object.isRequired,
  };
  componentDidMount() {
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
          AddedTocart: false,
          cartItems: this.props.cartItems.message,
        });
      }
    }
    if (this.props.updateQuantity != prevProps.updateQuantity) {
      if (this.props.updateQuantity.success == true) {
        // this.setState({ AddedTocart: true });
        this.props.GetCartItems();
      }
    }
  }
  increaseQty = (val, id) => {
    this.setState({ Qty: { ...this.state.Qty, [id]: val + 1 } });
  };
  decreaseQty = (val, id) => {
    this.setState({ Qty: { ...this.state.Qty, [id]: val - 1 } });
  };
  render() {
    let userType,
      SubtotalClient = 0,
      SubtotalDesigner = 0;
    if (localStorage.getItem("user")) {
      var token = JSON.parse(localStorage.getItem("user"));
      userType = token.role;
    }

    return (
      <>
        <ToolbarMobile />
        {localStorage.getItem("user") ? (
          JSON.parse(localStorage.getItem("user")).role == "designer" ? (
            <ToolbarExplore />
          ) : null
        ) : null}
        <BottomMenu />
        {console.log("this.sta.cartItems2", this.state.cartItems)}
        <IonContent fullscreen>
          <IonGrid className="grid mobilemarginCart">
            {this.state.cartItems.length != 0 ? (
              <>
                <IonRow>
                  <IonCol style={{ textAlign: "center" }}>
                    <IonButton className="checkoutButton" expand="block">
                      Proceed to Checkout
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow className=" ">
                  <IonCol
                    sizeXl="12"
                    sizeLg="12"
                    sizeMd="12"
                    sizeSm="12"
                    sizeXs="12"
                  >
                    {/* <IonCard>
                  <IonCardHeader> */}
                    <IonCardTitle className="ion-nowrap projectCardTitle">
                      Review Your Personal Cart
                    </IonCardTitle>
                    {/* </IonCardHeader>
                </IonCard> */}
                  </IonCol>
                </IonRow>
                <IonRow className="justify-content-center">
                  {this.state.cartItems.map((cartITem, i) => {
                    let priceClient =
                      cartITem.quantity * parseFloat(cartITem.pricing[0].Map);
                    let priceDesigner =
                      cartITem.quantity *
                      parseFloat(cartITem.pricing[0].ECommerceCost);
                    SubtotalClient = SubtotalClient + priceClient;
                    SubtotalDesigner = SubtotalDesigner + priceDesigner;

                    return (
                      <IonCol sizeMd="10" sizeXs="12">
                        <IonCard className="cartCard">
                          <IonCardContent className="cart-content">
                            <IonGrid className="">
                              <IonRow className=" ">
                                <IonCol size="12">
                                  <div className="mainWrapper">
                                    <div className="cartWrapper">
                                      <div className="cartImgWrapper">
                                        <Link
                                          to={{
                                            pathname: "/itemview",
                                            search: `?id=${cartITem.id}`,
                                          }}
                                        >
                                          <IonImg
                                            src={
                                              cartITem.productinfo
                                                .productImagesLinks[0]
                                            }
                                            className="cartImg "
                                          />
                                        </Link>
                                      </div>
                                      <div className="cartDetailWrapper">
                                        <div className="itemNameWrapper">
                                          <IonCardTitle className=" itemName">
                                            {
                                              cartITem.productinfo
                                                .MOE_productName
                                            }
                                          </IonCardTitle>
                                        </div>
                                        <div className=" price">
                                          {userType == "client" ? (
                                            <IonCardTitle
                                              style={{ marginTop: "4px" }}
                                              className=" cartprice"
                                            >
                                              ${cartITem.pricing[0].Map}
                                            </IonCardTitle>
                                          ) : (
                                            <IonCardTitle
                                              style={{ marginTop: "4px" }}
                                              className=" cartprice"
                                            >
                                              $
                                              {
                                                cartITem.pricing[0]
                                                  .ECommerceCost
                                              }
                                            </IonCardTitle>
                                          )}
                                        </div>
                                        <p className="cartText ">
                                          {
                                            cartITem.productinfo.SEO
                                              .shortDescription
                                          }
                                        </p>
                                      </div>
                                    </div>

                                    <div className="QtyWrapper">
                                      <div
                                        class="input-group qty"
                                        style={{ maxWidth: "200px" }}
                                      >
                                        <div class="input-group-prepend">
                                          <button
                                            class="input-group-text"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              this.props.UpdateQuantity(
                                                cartITem.MOE_ITEM,
                                                cartITem.quantity - 1
                                              );
                                            }}
                                          >
                                            {/* {cartITem.quantity == 1 ? (
                                            <span>Qty</span>
                                          ) : (
                                            <span style={{ fontSize: "14px" }}> */}
                                            -{/* </span> */}
                                            {/* )} */}
                                          </button>
                                        </div>
                                        <input
                                          className="form-control"
                                          value={cartITem.quantity}
                                          type="text"
                                        />
                                        <div class="input-group-append">
                                          <button
                                            class="input-group-text"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              this.props.UpdateQuantity(
                                                cartITem.MOE_ITEM,
                                                cartITem.quantity + 1
                                              );
                                            }}
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>

                                      {/* <center> */}
                                      {/* <IonButton
                                        className="charcoal cartRemove"
                                        style={{ marginTop: "-5px" }}
                                      > */}
                                      <IonIcon
                                        icon={trashOutline}
                                        style={{ fontSize: "26px" }}
                                      />
                                      {/* </IonButton> */}
                                      {/* </center> */}

                                      <div className=" price-hidden">
                                        <IonCardTitle
                                          style={{ marginTop: "4px" }}
                                          className=" cartprice"
                                        >
                                          {userType == "client" ? (
                                            <IonCardTitle
                                              style={{ marginTop: "4px" }}
                                              className=" cartprice"
                                            >
                                              ${cartITem.pricing[0].Map}
                                            </IonCardTitle>
                                          ) : (
                                            <IonCardTitle
                                              style={{ marginTop: "4px" }}
                                              className=" cartprice"
                                            >
                                              $
                                              {
                                                cartITem.pricing[0]
                                                  .ECommerceCost
                                              }
                                            </IonCardTitle>
                                          )}
                                        </IonCardTitle>
                                      </div>
                                    </div>
                                  </div>
                                </IonCol>
                              </IonRow>
                            </IonGrid>
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                    );
                  })}

                  <IonCol sizeMd="10" sizeXs="12">
                    <IonCard className="cartCard">
                      <IonCardContent className="cart-content">
                        <IonCardTitle
                          className="d-flex  itemName "
                          style={{
                            fontSize: "17px",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Subtotal</div>
                          <div className="">
                            {userType == "client"
                              ? `$${SubtotalClient}`
                              : `$${SubtotalDesigner}`}
                          </div>
                        </IonCardTitle>
                        {/* <IonCardSubtitle
                          className=""
                          style={{ fontSize: "14px" }}
                        ></IonCardSubtitle> */}
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </>
            ) : (
              <IonCol
                sizeMd="10"
                sizeXs="12"
                style={{
                  textAlign: "center",
                }}
              >
                <IonCard
                  className="projectCards cartCard"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <IonCardHeader>
                    <IonCardTitle class="projectCardTitle">
                      Your cart is empty
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            )}

            <IonRow className="justify-content-center">
              <IonCol sizeMd="10" sizeXs="12">
                <IonCard className="cartCard">
                  <IonCardContent className="cart-content">
                    <IonCardTitle
                      className=" itemName mb-2"
                      style={{ fontSize: "16px" }}
                    >
                      Need help? Our customers are our priority!
                    </IonCardTitle>
                    <IonCardSubtitle className="" style={{ fontSize: "14px" }}>
                      Email: hello@hemlyco.com
                    </IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
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
const mapStateToProps = (state) => ({
  error: state.error,
  addtoCart: state.cart.addtoCart,
  getItemFromCart: state.cart.getItemFromCart,
  updateQuantity: state.cart.updateQuantity,
  cartItems: state.cart.cartItems,
});
export default connect(mapStateToProps, {
  logout,
  GetCartItems,
  AddToCart,
  GetCartItem,
  UpdateQuantity,
})(FinalCart);
