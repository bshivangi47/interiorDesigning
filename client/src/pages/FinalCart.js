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
  IonAlert,
  IonLoading,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonFooter,
  IonInput,
  IonItem,
  IonLabel,
  IonSelectOption,
  IonSelect,
  IonTextarea,
} from "@ionic/react";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import "./Page.css";
import { Link } from "react-router-dom";
import { trashOutline, closeOutline } from "ionicons/icons";
import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";
import ToolbarExplore from "../components/ToolbarExplore";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout, GetUser } from "../actions/userActions";
import {
  AddToCart,
  GetCartItem,
  UpdateQuantity,
  GetCartItems,
  ChangePaidStatus,
} from "../actions/cartActions";
import {
  payment,
  AffirmConfirmation,
  GetTaxes,
} from "../actions/paymentActions";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
var _affirm_config = {
  public_api_key: process.env.REACT_APP_AFFIRM_API_KEY,
  // public_api_key: "YRRJ1GXU1E3XEZBY",
  script: "https://cdn1.affirm.com/js/v2/affirm.js",
  // script: "https://cdn1-sandbox.affirm.com/js/v2/affirm.js",
};
(function (l, g, m, e, a, f, b) {
  var d,
    c = l[m] || {},
    h = document.createElement(f),
    n = document.getElementsByTagName(f)[0],
    k = function (a, b, c) {
      return function () {
        a[b]._.push([c, arguments]);
      };
    };
  c[e] = k(c, e, "set");
  d = c[e];
  c[a] = {};
  c[a]._ = [];
  d._ = [];
  c[a][b] = k(c, a, b);
  a = 0;
  for (
    b =
      "set add save post open empty reset on off trigger ready setProduct".split(
        " "
      );
    a < b.length;
    a++
  )
    d[b[a]] = k(c, e, b[a]);
  a = 0;
  for (b = ["get", "token", "url", "items"]; a < b.length; a++)
    d[b[a]] = function () {};
  h.async = !0;
  h.src = g[f];
  n.parentNode.insertBefore(h, n);
  delete g[f];
  d(g);
  l[m] = c;
})(window, _affirm_config, "affirm", "checkout", "ui", "script", "ready");

class FinalCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuClose: false,
      Qty: { item1: 1, item2: 1 },
      cartItems: [],
      showAlert: false,
      affirmPaid: false,
      loadingAffirm: false,
      showModal: false,
      addressInfo: {
        pointOfContact: "",
        Contactphonenumber: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        zipcode: "",
        country: "USA",
        shippingInstructions: "",
      },
      SubtotalClient: 0,
      SubtotalDesigner: 0,
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
    this.props.GetUser();
    this.props.GetCartItems();
    const query = new URLSearchParams(window.location.search);
    if (query.get("auth") && localStorage.getItem("stripeSession")) {
      let token_decoded = atob(query.get("auth"));
      if (token_decoded == localStorage.getItem("token")) {
        if (query.get("success")) {
          localStorage.removeItem("stripeSession");
          this.setState({ showModal: false });
          this.props.ChangePaidStatus();
          console.log("Order placed! You will receive an email confirmation.");
        }
        if (query.get("canceled")) {
          this.setState({ showModal: false });
          localStorage.removeItem("stripeSession");
          console.log(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }
    }
  }
  async componentDidUpdate(prevProps) {
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

    if (this.props.getUser != prevProps.getUser) {
      if (this.props.getUser.success == true) {
        if (this.props.getUser.message.address) {
          this.setState({
            addressInfo: {
              pointOfContact: this.props.getUser.message.address.pointOfContact
                ? this.props.getUser.message.address.pointOfContact
                : "",
              Contactphonenumber: this.props.getUser.message.address
                .Contactphonenumber
                ? this.props.getUser.message.address.Contactphonenumber
                : "",
              line1: this.props.getUser.message.address.line1,
              line2: this.props.getUser.message.address.line2,
              city: this.props.getUser.message.address.city,
              state: this.props.getUser.message.address.state,
              zipcode: this.props.getUser.message.address.zipcode,
              country: this.props.getUser.message.address.country,
              shippingInstructions: this.props.getUser.message.address
                .shippingInstructions
                ? this.props.getUser.message.address.shippingInstructions
                : "",
            },
          });
        }
      }
    }
    if (this.props.cartItems != prevProps.cartItems) {
      if (this.props.cartItems.success == true) {
        let SubtotalClient = 0;
        let SubtotalDesigner = 0;
        this.setState({
          AddedTocart: false,
          cartItems: this.props.cartItems.message,
        });
        this.props.cartItems.message.map((cartITem, i) => {
          let priceClient =
            cartITem.quantity * parseFloat(cartITem.pricing[0].Map);
          let priceDesigner =
            cartITem.quantity * parseFloat(cartITem.pricing[0].ECommerceCost);
          SubtotalClient = SubtotalClient + priceClient;
          SubtotalDesigner = SubtotalDesigner + priceDesigner;
        });
        this.setState(
          {
            SubtotalClient: SubtotalClient,
            SubtotalDesigner: SubtotalDesigner,
          },
          () => {
            window.affirm.ui.refresh();
          }
        );
      }
    }
    if (this.props.changePaidStatus != prevProps.changePaidStatus) {
      if (this.props.changePaidStatus.success == true) {
        // this.setState({
        //   AddedTocart: false,
        //   cartItems: this.props.cartItems.message,
        // });
        this.props.GetCartItems();
      }
    }
    if (this.props.updateQuantity != prevProps.updateQuantity) {
      if (this.props.updateQuantity.success == true) {
        // this.setState({ AddedTocart: true });
        this.props.GetCartItems();
      }
    }
    if (this.props.paymentReducer != prevProps.paymentReducer) {
      if (this.props.paymentReducer.success == true) {
        console.log("session", this.props.paymentReducer.message);
        localStorage.setItem(
          "stripeSession",
          this.props.paymentReducer.message.id
        );
        this.setState({ loadingAffirm: false });

        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
          sessionId: this.props.paymentReducer.message.id,
        });

        if (result.error) {
          console.log("result.error=--=-=-=", result.error);
          this.setState({
            alertMsg: result.error,
            showAlert: true,
          });
        }
      }
    }
    if (this.props.affirm != prevProps.affirm) {
      this.setState({
        alertMsg: this.props.affirm.message,
        showAlert: true,
        affirmPaid: true,
        loadingAffirm: false,
        showModal: false,
      });
    }
    if (this.props.tax != prevProps.tax) {
      if (this.props.tax.success == true) {
        console.log("taxObj-==-=", this.props.tax.message);
        this.handleCheckOutAffirm(
          this.props.tax.message.totalTaxCalculated * 100
        );
      }
    }
  }
  handleCheckOut = () => {
    if (this.state.addressInfo.line1 == "") {
      this.setState({
        errorline1: "Address line 1 cannot be empty",
      });
      var email = document.getElementById("fname");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorline1: "" });
      var email = document.getElementById("fname");
      email.style.borderColor = "#ddd";
    }
    if (this.state.addressInfo.city == "") {
      this.setState({
        errorCity: "City cannot be empty",
      });
      var email = document.getElementById("city");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorCity: "" });
      var email = document.getElementById("city");
      email.style.borderColor = "#ddd";
    }
    if (this.state.addressInfo.state == "") {
      this.setState({
        errorState: "Please select your state",
      });
      var email = document.getElementById("State");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorState: "" });
      var email = document.getElementById("State");
      email.style.borderColor = "#ddd";
    }
    if (this.state.addressInfo.zipcode == "") {
      this.setState({
        errorZip: "Zip code cannot be empty",
      });
      var email = document.getElementById("zip");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorZip: "" });
      var email = document.getElementById("zip");
      email.style.borderColor = "#ddd";
    }

    if (
      this.state.addressInfo.line1 != "" &&
      this.state.addressInfo.city != "" &&
      this.state.addressInfo.state != "" &&
      this.state.addressInfo.zipcode != ""
    ) {
      let line_items = [];
      var token = JSON.parse(localStorage.getItem("user"));
      let userType = token.role;
      // console.log("cartItems-=", this.state.cartItems);

      this.state.cartItems.map((cartITem) => {
        let priceClient = parseFloat(cartITem.pricing[0].Map) * 100;
        let priceDesigner = parseFloat(cartITem.pricing[0].ECommerceCost) * 100;
        let images = [];
        // SubtotalClient = SubtotalClient + priceClient;
        // SubtotalDesigner = SubtotalDesigner + priceDesigner;
        cartITem.productinfo.productImagesLinks.map((image, i) => {
          if (
            image != "" &&
            i < cartITem.productinfo.productImagesLinks.length - 1
          ) {
            images.push(image);
          }
        });
        // console.log("images-=", images);

        if (userType == "client") {
          line_items.push({
            price_data: {
              currency: "usd",
              product_data: {
                name: cartITem.productinfo.MOE_productName,
                description: cartITem.productinfo.SEO.shortDescription,
                images: images,
              },
              unit_amount: priceClient,
            },
            quantity: parseInt(cartITem.quantity),
          });
        } else {
          line_items.push({
            price_data: {
              currency: "usd",
              product_data: {
                name: cartITem.productinfo.MOE_productName,
                description: cartITem.productinfo.SEO.shortDescription,
                images: images,
              },
              unit_amount: priceDesigner,
            },
            quantity: parseInt(cartITem.quantity),
          });
        }
      });
      this.props.payment(line_items, this.state.addressInfo);
      this.setState({ loadingAffirm: true });
    }
  };
  getTaxes = () => {
    let line_items = [];
    let self = this;
    var user = JSON.parse(localStorage.getItem("user"));
    let userType = user.role;
    let SubtotalClient = 0;
    let SubtotalDesigner = 0;
    console.log("handleCheckOutAffirm");

    if (this.state.addressInfo.line1 == "") {
      this.setState({
        errorline1: "Address line 1 cannot be empty",
      });
      var email = document.getElementById("fname");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorline1: "" });
      var email = document.getElementById("fname");
      email.style.borderColor = "#ddd";
    }
    if (this.state.addressInfo.city == "") {
      this.setState({
        errorCity: "City cannot be empty",
      });
      var email = document.getElementById("city");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorCity: "" });
      var email = document.getElementById("city");
      email.style.borderColor = "#ddd";
    }
    if (this.state.addressInfo.state == "") {
      this.setState({
        errorState: "Please select your state",
      });
      var email = document.getElementById("State");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorState: "" });
      var email = document.getElementById("State");
      email.style.borderColor = "#ddd";
    }
    if (this.state.addressInfo.zipcode == "") {
      this.setState({
        errorZip: "Zip code cannot be empty",
      });
      var email = document.getElementById("zip");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorZip: "" });
      var email = document.getElementById("zip");
      email.style.borderColor = "#ddd";
    }

    if (
      this.state.addressInfo.line1 != "" &&
      this.state.addressInfo.city != "" &&
      this.state.addressInfo.state != "" &&
      this.state.addressInfo.zipcode != ""
    ) {
      console.log("handleCheckOutAffirm2");

      this.state.cartItems.map((cartITem, i) => {
        let priceClient = parseFloat(cartITem.pricing[0].Map);
        let priceDesigner = parseFloat(cartITem.pricing[0].ECommerceCost);

        SubtotalClient = SubtotalClient + priceClient;
        SubtotalDesigner = SubtotalDesigner + priceDesigner;

        if (userType == "client") {
          line_items.push({
            number: i,

            amount: priceClient,

            quantity: parseInt(cartITem.quantity),
          });
        } else {
          line_items.push({
            number: i,

            amount: priceDesigner,

            quantity: parseInt(cartITem.quantity),
          });
        }
      });

      // this.state.cartItems.map((cartITem) => {
      //   let priceClient = parseFloat(cartITem.pricing[0].Map);
      //   let priceDesigner = parseFloat(cartITem.pricing[0].ECommerceCost);
      //   let images = [];
      //   SubtotalClient = SubtotalClient + priceClient;
      //   SubtotalDesigner = SubtotalDesigner + priceDesigner;
      //   // SubtotalClient = SubtotalClient + priceClient;
      //   // SubtotalDesigner = SubtotalDesigner + priceDesigner;
      //   // cartITem.productinfo.productImagesLinks.map((image, i) => {
      //   //   if (
      //   //     image != "" &&
      //   //     i < cartITem.productinfo.productImagesLinks.length - 1
      //   //   ) {
      //   //     images.push(image);
      //   //   }
      //   // });
      //   // console.log("images-=", images);

      //   if (userType == "client") {
      //     line_items.push({
      //       display_name: cartITem.productinfo.MOE_productName,
      //       sku: cartITem.MOE_ITEM,
      //       unit_price: priceClient,
      //       item_url: "http://13.59.176.130/viewItem?item=" + cartITem.MOE_ITEM,
      //       item_image_url: cartITem.productinfo.productImagesLinks[0],

      //       quantity: parseInt(cartITem.quantity),
      //     });
      //   } else {
      //     line_items.push({
      //       display_name: cartITem.productinfo.MOE_productName,
      //       sku: cartITem.MOE_ITEM,
      //       unit_price: priceDesigner,
      //       item_url: "http://13.59.176.130/viewItem?item=" + cartITem.MOE_ITEM,
      //       item_image_url: cartITem.productinfo.productImagesLinks[0],

      //       quantity: parseInt(cartITem.quantity),
      //     });
      //   }
      // });
      this.props.GetTaxes(line_items, this.state.addressInfo);

      // console.log("lineITems-=-=-=-=", line_items);
      // window.affirm.ui.ready(function () {
      // console.log("ready***************", this.state.addressInfo);

      // window.affirm.checkout({
      //   merchant: {
      //     user_confirmation_url: process.env.REACT_APP_URL + "/Cart",
      //     // user_confirmation_url: "http://localhost:3000/Cart",
      //     // api_URL + "/payment/affirmConfirmation?user=" + user._id,
      //     user_cancel_url: process.env.REACT_APP_URL + "/Cart",
      //     // user_cancel_url: "http://localhost:3000/Cart",
      //     user_confirmation_url_action: "GET",
      //   },
      //   shipping: {
      //     name: {
      //       first: user.firstname,
      //       last: user.lastname,
      //     },
      //     address: {
      //       line1: this.state.addressInfo.line1,
      //       line2: this.state.addressInfo.line2,
      //       city: this.state.addressInfo.city,
      //       state: this.state.addressInfo.state,
      //       zipcode: this.state.addressInfo.zipcode,
      //       country: "USA",
      //     },
      //     // phone_number: "4151234567",
      //     email: user.email,
      //   },

      //   items: line_items,
      //   currency: "USD",
      //   shipping_amount: 0,
      //   tax_amount: 0,
      //   total: userType == "client" ? SubtotalClient : SubtotalDesigner,
      // });
      // window.affirm.checkout.open({
      //   onFail: function (error) {
      //     console.log("error***************", error);
      //   },
      //   onSuccess: function (checkout) {
      //     console.log("checkout***************", checkout);
      //     self.props.AffirmConfirmation(
      //       checkout.checkout_token,
      //       user._id,
      //       self.state.addressInfo
      //     );
      //     self.setState({ loadingAffirm: true });
      //   },
      // });
      // });
    }
    // this.props.payment(line_items);
  };
  handleCheckOutAffirm = (tax_amount) => {
    let line_items = [];
    let self = this;
    var user = JSON.parse(localStorage.getItem("user"));
    let userType = user.role;
    let SubtotalClient = 0;
    let SubtotalDesigner = 0;
    this.state.cartItems.map((cartITem) => {
      let priceClient = parseFloat(cartITem.pricing[0].Map) * 100;
      let priceDesigner = parseFloat(cartITem.pricing[0].ECommerceCost) * 100;
      let images = [];
      SubtotalClient = SubtotalClient + priceClient;
      SubtotalDesigner = SubtotalDesigner + priceDesigner;
      // SubtotalClient = SubtotalClient + priceClient;
      // SubtotalDesigner = SubtotalDesigner + priceDesigner;
      // cartITem.productinfo.productImagesLinks.map((image, i) => {
      //   if (
      //     image != "" &&
      //     i < cartITem.productinfo.productImagesLinks.length - 1
      //   ) {
      //     images.push(image);
      //   }
      // });
      // console.log("images-=", images);

      if (userType == "client") {
        line_items.push({
          display_name: cartITem.productinfo.MOE_productName,
          sku: cartITem.MOE_ITEM,
          unit_price: priceClient,
          item_url: "http://13.59.176.130/viewItem?item=" + cartITem.MOE_ITEM,
          item_image_url: cartITem.productinfo.productImagesLinks[0],

          quantity: parseInt(cartITem.quantity),
        });
      } else {
        line_items.push({
          display_name: cartITem.productinfo.MOE_productName,
          sku: cartITem.MOE_ITEM,
          unit_price: priceDesigner,
          item_url: "http://13.59.176.130/viewItem?item=" + cartITem.MOE_ITEM,
          item_image_url: cartITem.productinfo.productImagesLinks[0],

          quantity: parseInt(cartITem.quantity),
        });
      }
    });

    // console.log("lineITems-=-=-=-=", line_items);
    // window.affirm.ui.ready(function () {
    console.log("ready***************", this.state.addressInfo);

    window.affirm.checkout({
      merchant: {
        user_confirmation_url: process.env.REACT_APP_URL + "/Cart",
        // user_confirmation_url: "http://localhost:3000/Cart",
        // api_URL + "/payment/affirmConfirmation?user=" + user._id,
        user_cancel_url: process.env.REACT_APP_URL + "/Cart",
        // user_cancel_url: "http://localhost:3000/Cart",
        user_confirmation_url_action: "GET",
      },
      shipping: {
        name: {
          first: user.firstname,
          last: user.lastname,
        },
        address: {
          line1: this.state.addressInfo.line1,
          line2: this.state.addressInfo.line2,
          city: this.state.addressInfo.city,
          state: this.state.addressInfo.state,
          zipcode: this.state.addressInfo.zipcode,
          country: "USA",
        },
        // phone_number: "4151234567",
        email: user.email,
      },

      items: line_items,
      currency: "USD",
      shipping_amount: 0,
      tax_amount: tax_amount,
      total:
        userType == "client"
          ? SubtotalClient + tax_amount
          : SubtotalDesigner + tax_amount,
    });
    window.affirm.checkout.open({
      onFail: function (error) {
        console.log("error***************", error);
      },
      onSuccess: function (checkout) {
        console.log("checkout***************", checkout);
        self.props.AffirmConfirmation(
          checkout.checkout_token,
          user._id,
          self.state.addressInfo
        );
        self.setState({ loadingAffirm: true });
      },
    });
  };
  increaseQty = (val, id) => {
    this.setState({ Qty: { ...this.state.Qty, [id]: val + 1 } });
  };
  decreaseQty = (val, id) => {
    this.setState({ Qty: { ...this.state.Qty, [id]: val - 1 } });
  };
  handleChange = (e) => {
    this.setState({
      addressInfo: {
        ...this.state.addressInfo,
        [e.target.name]: e.target.value,
      },
    });
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
        {/* {console.log("this.sta.cartItems2", this.state.cartItems)} */}
        <IonContent fullscreen>
          {this.state.loadingAffirm ? (
            <IonLoading
              cssClass="my-custom-class"
              isOpen={this.state.loadingAffirm}
              message={"Please wait..."}
            />
          ) : null}
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
                  if (this.state.affirmPaid) {
                    this.props.GetCartItems();
                  }
                },
              },
            ]}
          />

          <IonModal
            isOpen={this.state.showModal}
            cssClass="change-address-shipping-modal"
            onDidDismiss={() => this.setState({ showModal: false })}
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>Add Shipping Information</IonTitle>

                <IonButtons slot="end">
                  <IonButton
                    onClick={() => this.setState({ showModal: false })}
                  >
                    <IonIcon icon={closeOutline} style={{ color: "black" }} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="">
              <form id="nprojectForm">
                <IonGrid>
                  <IonRow className="py-2 ">
                    <IonCol
                      sizeXl="6"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonItem
                        className="forDarkMode newProjectItem "
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Point of Contact (name)
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.handleChange(e);
                            if (this.state.addressInfo.pointOfContact == "") {
                              this.setState({
                                errorpointOfContact:
                                  "Point of Contact (name) cannot be empty",
                              });
                            } else {
                              this.setState({ errorpointOfContact: "" });
                            }
                          }}
                          value={this.state.addressInfo.pointOfContact}
                          style={{ textTransform: "capitalize" }}
                          type="text"
                          name="pointOfContact"
                          placeholder="Point of Contact (name)"
                          required
                          id="fname"
                        />{" "}
                      </IonItem>
                      {this.state.errorpointOfContact != "" ? (
                        <p
                          style={{
                            color: "red",
                            marginLeft: "16px",
                            fontSize: "14px",
                          }}
                        >
                          {this.state.errorpointOfContact}
                        </p>
                      ) : null}
                    </IonCol>{" "}
                    <IonCol
                      sizeXl="6"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonItem
                        className="forDarkMode newProjectItem "
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Contact phone number
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.handleChange(e);
                            if (
                              this.state.addressInfo.Contactphonenumber == ""
                            ) {
                              this.setState({
                                errorContactphonenumber:
                                  "Contact phone number cannot be empty",
                              });
                            } else {
                              this.setState({ errorContactphonenumber: "" });
                            }
                          }}
                          value={this.state.addressInfo.Contactphonenumber}
                          style={{ textTransform: "capitalize" }}
                          type="text"
                          name="Contactphonenumber"
                          placeholder="Contact phone number"
                          required
                          id="fname"
                        />{" "}
                      </IonItem>
                      {this.state.errorContactphonenumber != "" ? (
                        <p
                          style={{
                            color: "red",
                            marginLeft: "16px",
                            fontSize: "14px",
                          }}
                        >
                          {this.state.errorContactphonenumber}
                        </p>
                      ) : null}
                    </IonCol>{" "}
                    <IonCol
                      sizeXl="6"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonItem
                        className="forDarkMode newProjectItem "
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Address line 1
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.handleChange(e);
                            if (this.state.addressInfo.line1 == "") {
                              this.setState({
                                errorline1: "Address line 1 cannot be empty",
                              });
                              var email = document.getElementById("fname");
                              email.style.borderColor = "red";
                            } else {
                              this.setState({ errorline1: "" });
                              var email = document.getElementById("fname");
                              email.style.borderColor = "#ddd";
                            }
                          }}
                          value={this.state.addressInfo.line1}
                          style={{ textTransform: "capitalize" }}
                          type="text"
                          name="line1"
                          placeholder="Address line 1"
                          required
                          id="fname"
                        />{" "}
                      </IonItem>
                      {this.state.errorline1 != "" ? (
                        <p
                          style={{
                            color: "red",
                            marginLeft: "16px",
                            fontSize: "14px",
                          }}
                        >
                          {this.state.errorline1}
                        </p>
                      ) : null}
                    </IonCol>{" "}
                    <IonCol
                      sizeXl="6"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom "
                          position="stacked"
                        >
                          Address line 2
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.handleChange(e);
                          }}
                          value={this.state.addressInfo.line2}
                          type="text"
                          name="line2"
                          placeholder="Address line 2"
                          required
                          id="lname"
                          style={{ textTransform: "capitalize" }}
                        />
                      </IonItem>{" "}
                    </IonCol>{" "}
                    <IonCol
                      sizeXl="12"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          City
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.handleChange(e);
                            if (this.state.addressInfo.city == "") {
                              this.setState({
                                errorCity: "City cannot be empty",
                              });
                              var email = document.getElementById("city");
                              email.style.borderColor = "red";
                            } else {
                              this.setState({ errorCity: "" });
                              var email = document.getElementById("city");
                              email.style.borderColor = "#ddd";
                            }
                          }}
                          value={this.state.addressInfo.city}
                          // type="number"
                          style={{ textTransform: "capitalize" }}
                          name="city"
                          placeholder="Enter City"
                          required
                          id="city"
                        />{" "}
                      </IonItem>
                      {this.state.errorCity != "" ? (
                        <p
                          style={{
                            color: "red",
                            marginLeft: "16px",
                            fontSize: "14px",
                          }}
                        >
                          {this.state.errorCity}
                        </p>
                      ) : null}
                    </IonCol>{" "}
                    <IonCol
                      sizeXl="12"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          State
                        </IonLabel>
                        <IonSelect
                          interface="popover"
                          className=""
                          onIonChange={(e) => {
                            this.handleChange(e);
                            if (this.state.addressInfo.state == "") {
                              this.setState({
                                errorState: "Please select your state",
                              });
                              var email = document.getElementById("State");
                              email.style.borderColor = "red";
                            } else {
                              this.setState({ errorState: "" });
                              var email = document.getElementById("State");
                              email.style.borderColor = "#ddd";
                            }
                          }}
                          value={this.state.addressInfo.state}
                          type="text"
                          name="state"
                          placeholder="Select state"
                          required
                          id="State"
                        >
                          {/* <IonSelectOption></IonSelectOption> */}
                          <IonSelectOption value="AL">Alabama</IonSelectOption>

                          <IonSelectOption value="AZ">Arizona</IonSelectOption>
                          <IonSelectOption value="AR">Arkansas</IonSelectOption>
                          <IonSelectOption value="CA">
                            California
                          </IonSelectOption>
                          <IonSelectOption value="CO">Colorado</IonSelectOption>
                          <IonSelectOption value="CT">
                            Connecticut
                          </IonSelectOption>
                          <IonSelectOption value="DE">Delaware</IonSelectOption>
                          <IonSelectOption value="DC">
                            District Of Columbia
                          </IonSelectOption>
                          <IonSelectOption value="FL">Florida</IonSelectOption>
                          <IonSelectOption value="GA">Georgia</IonSelectOption>

                          <IonSelectOption value="ID">Idaho</IonSelectOption>
                          <IonSelectOption value="IL">Illinois</IonSelectOption>
                          <IonSelectOption value="IN">Indiana</IonSelectOption>
                          <IonSelectOption value="IA">Iowa</IonSelectOption>
                          <IonSelectOption value="KS">Kansas</IonSelectOption>
                          <IonSelectOption value="KY">Kentucky</IonSelectOption>
                          <IonSelectOption value="LA">
                            Louisiana
                          </IonSelectOption>
                          <IonSelectOption value="ME">Maine</IonSelectOption>
                          <IonSelectOption value="MD">Maryland</IonSelectOption>
                          <IonSelectOption value="MA">
                            Massachusetts
                          </IonSelectOption>
                          <IonSelectOption value="MI">Michigan</IonSelectOption>
                          <IonSelectOption value="MN">
                            Minnesota
                          </IonSelectOption>
                          <IonSelectOption value="MS">
                            Mississippi
                          </IonSelectOption>
                          <IonSelectOption value="MO">Missouri</IonSelectOption>
                          <IonSelectOption value="MT">Montana</IonSelectOption>
                          <IonSelectOption value="NE">Nebraska</IonSelectOption>
                          <IonSelectOption value="NV">Nevada</IonSelectOption>
                          <IonSelectOption value="NH">
                            New Hampshire
                          </IonSelectOption>
                          <IonSelectOption value="NJ">
                            New Jersey
                          </IonSelectOption>
                          <IonSelectOption value="NM">
                            New Mexico
                          </IonSelectOption>
                          <IonSelectOption value="NY">New York</IonSelectOption>
                          <IonSelectOption value="NC">
                            North Carolina
                          </IonSelectOption>
                          <IonSelectOption value="ND">
                            North Dakota
                          </IonSelectOption>
                          <IonSelectOption value="OH">Ohio</IonSelectOption>
                          <IonSelectOption value="OK">Oklahoma</IonSelectOption>
                          <IonSelectOption value="OR">Oregon</IonSelectOption>
                          <IonSelectOption value="PA">
                            Pennsylvania
                          </IonSelectOption>
                          <IonSelectOption value="RI">
                            Rhode Island
                          </IonSelectOption>
                          <IonSelectOption value="SC">
                            South Carolina
                          </IonSelectOption>
                          <IonSelectOption value="SD">
                            South Dakota
                          </IonSelectOption>
                          <IonSelectOption value="TN">
                            Tennessee
                          </IonSelectOption>
                          <IonSelectOption value="TX">Texas</IonSelectOption>
                          <IonSelectOption value="UT">Utah</IonSelectOption>
                          <IonSelectOption value="VT">Vermont</IonSelectOption>
                          <IonSelectOption value="VA">Virginia</IonSelectOption>
                          <IonSelectOption value="WA">
                            Washington
                          </IonSelectOption>
                          <IonSelectOption value="WV">
                            West Virginia
                          </IonSelectOption>
                          <IonSelectOption value="WI">
                            Wisconsin
                          </IonSelectOption>
                          <IonSelectOption value="WY">Wyoming</IonSelectOption>
                        </IonSelect>
                      </IonItem>{" "}
                      {this.state.errorState != "" ? (
                        <p
                          style={{
                            color: "red",
                            marginLeft: "16px",
                            fontSize: "14px",
                          }}
                        >
                          {this.state.errorState}
                        </p>
                      ) : null}
                    </IonCol>{" "}
                    <IonCol
                      sizeXl="6"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Zip code
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.handleChange(e);
                            if (this.state.addressInfo.zipcode == "") {
                              this.setState({
                                errorZip: "Zip code cannot be empty",
                              });
                              var email = document.getElementById("zip");
                              email.style.borderColor = "red";
                            } else {
                              this.setState({ errorZip: "" });
                              var email = document.getElementById("zip");
                              email.style.borderColor = "#ddd";
                            }
                          }}
                          value={this.state.addressInfo.zipcode}
                          // type="number"
                          name="zipcode"
                          placeholder="Enter Zip code"
                          required
                          id="zip"
                        />{" "}
                      </IonItem>
                      {this.state.errorZip != "" ? (
                        <p
                          style={{
                            color: "red",
                            marginLeft: "16px",
                            fontSize: "14px",
                          }}
                        >
                          {this.state.errorZip}
                        </p>
                      ) : null}
                    </IonCol>{" "}
                    <IonCol
                      sizeXl="6"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Country
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.handleChange(e);
                            if (this.state.addressInfo.zip == "") {
                              this.setState({
                                errorZip: "Zip code cannot be empty",
                              });
                              var email = document.getElementById("zip");
                              email.style.borderColor = "red";
                            } else {
                              this.setState({ errorZip: "" });
                              var email = document.getElementById("zip");
                              email.style.borderColor = "#ddd";
                            }
                          }}
                          value={"USA"}
                          // type="number"
                          disabled={true}
                          name="zip"
                          placeholder="Enter Zip code"
                          required
                          id="zip"
                        />{" "}
                      </IonItem>
                    </IonCol>{" "}
                    {/* <IonCol
                      sizeXl="12"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Shipping instructions (optional)
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.handleChange(e);
                          }}
                          value={this.state.addressInfo.shippingInstructions}
                          name="shippingInstructions"
                          placeholder="Please include any desired delivery days or delivery preferences for our carrier."
                          required
                          id="zip"
                        />
                      </IonItem>{" "}
                    </IonCol>{" "}
                   */}
                    <IonCol
                      sizeXl="12"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Shipping instructions (optional)
                        </IonLabel>
                        <IonTextarea
                          // className="ion-margin-end "
                          value={this.state.addressInfo.shippingInstructions}
                          onIonChange={(e) => {
                            this.setState({
                              addressInfo: {
                                ...this.state.addressInfo,
                                shippingInstructions: e.detail.value,
                              },
                            });
                          }}
                          name="shippingInstructions"
                          placeholder="Please include any desired delivery days or delivery preferences for our carrier."
                        ></IonTextarea>
                      </IonItem>{" "}
                    </IonCol>{" "}
                  </IonRow>{" "}
                </IonGrid>{" "}
              </form>{" "}
            </IonContent>
            <IonFooter>
              <ion-row class="ion-justify-content-end filterEndRow ">
                {this.state.stripe ? (
                  <IonButton
                    className="charcoal"
                    onClick={() => this.handleCheckOut()}
                    // className="checkoutButton"
                  >
                    Continue
                  </IonButton>
                ) : (
                  <IonButton
                    className="charcoal"
                    onClick={() => this.getTaxes()}
                    // className="checkoutButton"
                  >
                    Continue
                  </IonButton>
                )}
              </ion-row>
            </IonFooter>
          </IonModal>

          <IonGrid className="grid mobilemarginCart">
            {this.state.cartItems.length != 0 ? (
              <>
                <IonRow className=" ">
                  <IonCol
                    sizeXl="12"
                    sizeLg="12"
                    sizeMd="12"
                    sizeSm="12"
                    sizeXs="12"
                    className="mt-3"
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
                    let category = cartITem.productinfo.grouping.category
                      .toLowerCase()
                      .split(">");
                    return (
                      <IonCol sizeXl="10" sizeMd="12" sizeXs="12">
                        <IonCard className="cartCard">
                          <IonCardContent className="cart-content p-0">
                            <IonGrid className="">
                              <IonRow className=" ">
                                <IonCol size="12">
                                  <div className="mainWrapper">
                                    <div className="cartWrapper">
                                      <div className="cartImgWrapper">
                                        <Link
                                          to={
                                            userType != "client"
                                              ? {
                                                  pathname: `/viewItem`,
                                                  search: `?item=${cartITem.MOE_ITEM}`,
                                                  state: {
                                                    product: cartITem,
                                                  },
                                                }
                                              : {
                                                  pathname: `/viewItem`,
                                                  search: `?item=${cartITem.MOE_ITEM}`,
                                                  state: {
                                                    product: cartITem,
                                                  },
                                                }
                                          }
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
                                          <IonCardTitle
                                            className=" itemName"
                                            style={{
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {cartITem.productinfo.grouping
                                              .color +
                                              " " +
                                              cartITem.productinfo.grouping.style.toLowerCase() +
                                              " " +
                                              category[
                                                category.length - 1
                                              ].slice(0, -1)}
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
                                              .featuresBenefits[0]
                                          }
                                          .{" "}
                                          {
                                            cartITem.productinfo.SEO
                                              .featuresBenefits[1]
                                          }
                                          .{" "}
                                          {
                                            cartITem.productinfo.SEO
                                              .featuresBenefits[2]
                                          }
                                          .{" "}
                                          {
                                            cartITem.productinfo.SEO
                                              .featuresBenefits[3]
                                          }
                                          .
                                        </p>
                                      </div>
                                    </div>

                                    <div className="QtyWrapper">
                                      <div
                                        class="input-group qty"
                                        style={{ maxWidth: "110px" }}
                                      >
                                        <div class="input-group-prepend" on>
                                          <button
                                            class="input-group-text "
                                            style={
                                              cartITem.quantity <= 1
                                                ? { cursor: "not-allowed" }
                                                : null
                                            }
                                            disabled={
                                              cartITem.quantity > 1
                                                ? false
                                                : true
                                            }
                                            onClick={() => {
                                              if (cartITem.quantity > 1)
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
                                      <div className=" ">
                                        <IonButton
                                          className="charcoal cartRemove"
                                          onClick={() => {
                                            this.props.UpdateQuantity(
                                              cartITem.MOE_ITEM,
                                              0
                                            );
                                          }}
                                        >
                                          Delete
                                          {/* <div className=" ">
                                        <IonIcon
                                          icon={trashOutline}
                                          style={{ fontSize: "26px" }}
                                        />
                                      </div> */}
                                        </IonButton>
                                      </div>
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

                  <IonCol sizeXl="10" sizeMd="12" sizeXs="12">
                    <IonCard
                      className="d-flex justify-content-end"
                      style={{ border: "none" }}
                    >
                      <p
                        class="affirm-as-low-as itemName"
                        data-page-type="cart"
                        id="affirm"
                        data-learnmore-show={true}
                        data-amount={
                          userType == "client"
                            ? `${this.state.SubtotalClient * 100}`
                            : `${this.state.SubtotalDesigner * 100}`
                        }
                        style={{ color: "black", fontSize: "16px" }}
                      ></p>
                    </IonCard>

                    <IonCard className="cartCard">
                      <IonCardContent className="cart-content">
                        <IonCardTitle
                          className="d-flex  itemName "
                          style={{
                            fontSize: "16px",
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

                  {/* <IonCol
                    sizeXl="10"
                    sizeMd="12"
                    sizeXs="12"
                    className="d-flex justify-content-end"
                  >
                    <IonButton
                      className="charcoal"
                      onClick={() => {
                        this.setState({ showModal: true });
                      }}
                      // className="checkoutButton"
                    >
                      Proceed to Checkout
                    </IonButton>
                  </IonCol> */}

                  <IonCol
                    sizeXl="10"
                    sizeMd="12"
                    sizeXs="12"
                    className="d-flex justify-content-end"
                  >
                    <IonCard
                      className="d-flex justify-content-end"
                      style={{ border: "none" }}
                    >
                      <p
                        class="itemName m-0"
                        style={{ color: "black", fontSize: "16px" }}
                      >
                        <i class="fas fa-truck mr-2"></i>
                        Products typically ship in 3-5 business days.
                      </p>
                    </IonCard>
                  </IonCol>
                  <IonCol
                    sizeXl="10"
                    sizeMd="12"
                    sizeXs="12"
                    className="d-flex justify-content-end"
                  >
                    <IonCard
                      className="d-flex align-items-center  "
                      style={{ border: "none" }}
                    >
                      <IonButton
                        className="charcoal"
                        style={{
                          margin: 0,
                          height: "41px",
                        }}
                        onClick={() => {
                          this.setState({ showModal: true, stripe: true });
                        }}
                        // className="checkoutButton"
                      >
                        Checkout
                      </IonButton>
                      {/* </IonCol> */}
                      {/* <IonCol
                    sizeXl="10"
                    sizeMd="12"
                    sizeXs="12"
                    className="d-flex justify-content-end"
                  > */}
                      {/* <IonButton
                      className="p-0"
                      onClick={() => {
                        this.setState({ showModal: true, stripe: false });
                      }}
                      // className="checkoutButton"
                    > */}
                      <img
                        src="https://cdn-assets.affirm.com/images/buttons/checkout/42x205-white.jpg"
                        // width="100px"
                        // height="30px"
                        style={{
                          cursor: "pointer",
                          marginLeft: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                        }}
                        onClick={() => {
                          this.setState({ showModal: true, stripe: false });
                        }}
                      />
                    </IonCard>
                    {/* </IonButton> */}
                  </IonCol>
                </IonRow>
              </>
            ) : (
              <IonRow className="justify-content-center">
                <IonCol
                  sizeXl="10"
                  sizeMd="12"
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
              </IonRow>
            )}

            <IonRow className="justify-content-center">
              <IonCol sizeXl="10" sizeMd="12" sizeXs="12">
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
  changePaidStatus: state.cart.changePaidStatus,
  paymentReducer: state.payment,
  getUser: state.user.getUser,
  affirm: state.affirm,
  tax: state.tax,
});
export default connect(mapStateToProps, {
  logout,
  GetCartItems,
  AddToCart,
  GetCartItem,
  UpdateQuantity,
  payment,
  ChangePaidStatus,
  AffirmConfirmation,
  GetUser,
  GetTaxes,
})(FinalCart);
