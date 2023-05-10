import {
  IonContent,
  IonGrid,
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  IonImg,
  IonCardSubtitle,
  IonText,
  IonSlides,
  IonSlide,
  IonIcon,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonAlert,
  IonModal,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonChip,
  IonInput,
} from "@ionic/react";

import React from "react";
import "./Page.css";
import {
  closeOutline,
  checkmarkOutline,
  thumbsDownOutline,
  thumbsUpOutline,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";

import ToolbarExplore from "../components/ToolbarExplore";
import {
  chevronBackCircleOutline,
  chevronForwardCircleOutline,
} from "ionicons/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout, GetUser } from "../actions/userActions";
import {
  SaveToProject,
  RemoveFromProject,
  GetSavedItems,
  LikeItem,
  PassItem,
  GetAllProjects,
  GetProjectswithSavedItem,
} from "../actions/projectActions";
import {
  AddToCart,
  GetCartItem,
  UpdateQuantity,
  AddToOrder,
} from "../actions/cartActions";
import { GetProduct } from "../actions/inventoryActions";
import {
  BuyNow,
  AffirmConfirmationBuyNow,
  GetTaxes,
} from "../actions/paymentActions";
import ToolbarProjects from "../components/ToolbarProjects";
import { loadStripe } from "@stripe/stripe-js";
import ToolBarClientProject from "../components/ToolBarClientProject";
import axios from "axios";
import apiURL, {
  getSavedItems,
  getLikedItems,
  getPassedItems,
} from "../apiURL/apiURL";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
class ViewSingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newBuyNow: false,
      AddedTocart: false,
      cartItem: "",
      selectProject: [],
      SavedItems: [],
      allProjects: [],
      menuClose: false,
      showModal: false,
      selectSort: "priceLtoH",
      showAlert: false,
      alertMsg: "",
      showModalBuyNow: false,
      nextbtn: true,
      prevbtn: false,
      searchDecor: false,
      savedItems: false,
      likedItems: false,
      passedItems: false,
      viewCartItemClient: false,
      savedItemsClient: false,
      addressInfo: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        zipcode: "",
        country: "USA",
      },
      loadingAffirm: false,
    };
  }

  componentDidMount() {
    let userType;
    const query = new URLSearchParams(window.location.search);
    if (query.get("auth") && localStorage.getItem("stripeSession")) {
      let token_decoded = atob(query.get("auth"));
      if (token_decoded == localStorage.getItem("token")) {
        if (query.get("success")) {
          localStorage.removeItem("stripeSession");
          this.props.AddToOrder(query.get("item"), 1);
          console.log("Order placed! You will receive an email confirmation.");
        }
        if (query.get("canceled")) {
          localStorage.removeItem("stripeSession");
          console.log(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }
    }
    if (localStorage.getItem("user")) {
      var token = JSON.parse(localStorage.getItem("user"));
      userType = token.role;
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    this.props.GetAllProjects();
    let itemId = params.get("item");

    if (params.get("item")) {
      this.props.GetCartItem(params.get("item"));
    } else {
      this.props.history.goBack();
    }

    let projectID = params.get("project");
    let category = params.get("category");
    let client = params.get("client");
    let room = params.get("room");
    this.setState({
      itemId: itemId,
      category: category,
      client: client,
      room: room,
      projectID: projectID,
    });
    this.props.GetProduct(itemId);
    this.props.GetProjectswithSavedItem({
      MOE_item: itemId,
    });
    if (params.get("project") && params.get("room")) {
      const data = {
        projectId: atob(params.get("project")),
        room: params.get("room"),
      };
      this.props.GetSavedItems(data);
    }
    if (!params.get("project") && !params.get("room") && userType == "client") {
      this.setState({ viewCartItemClient: true });
    }
    if (window.location.pathname == "/viewsavedItem" && userType == "client") {
      this.setState({ savedItemsClient: true });
    }
    if (window.location.pathname == "/viewDecorItem") {
      this.setState({
        searchDecor: true,
      });
    }
    if (window.location.pathname == "/viewsavedItem" && userType !== "client") {
      this.setState({
        savedItems: true,
      });
    }
    if (window.location.pathname == "/viewlikedItem") {
      this.setState({
        likedItems: true,
      });
    }
    if (window.location.pathname == "/viewpassedItem") {
      this.setState({
        passedItems: true,
      });
    }
    this.props.GetUser();
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
              line1: this.props.getUser.message.address.line1,
              line2: this.props.getUser.message.address.line2,
              city: this.props.getUser.message.address.city,
              state: this.props.getUser.message.address.state,
              zipcode: this.props.getUser.message.address.zipcode,
              country: this.props.getUser.message.address.country,
            },
          });
        }
      }
    }
    if (this.props.getSavedItemsMessage != prevProps.getSavedItemsMessage) {
      if (this.props.getSavedItemsSuccess == true) {
        this.setState({
          SavedItems: this.props.getSavedItemsMessage,
        });
      }
    }
    if (this.props.savedItem !== prevProps.savedItem) {
      if (this.props.saveItemToProjectSuccess == true) {
        let search = window.location.search;
        let params = new URLSearchParams(search);

        this.props.GetProjectswithSavedItem({
          MOE_item: this.state.itemId,
        });

        if (params.get("project") && params.get("room")) {
          const data = {
            projectId: atob(params.get("project")),
            room: params.get("room"),
          };
          this.props.GetSavedItems(data);
          // this.setState({
          //   showAlert: true,
          //   alertMsg: this.props.saveItemToProjectMessage,
          // });
        }
      }
    }
    if (this.props.removedItem != prevProps.removedItem) {
      if (this.props.removeSavedItemsSuccess == true) {
        let search = window.location.search;
        let params = new URLSearchParams(search);

        if (params.get("project") && params.get("room")) {
          const data = {
            projectId: atob(params.get("project")),
            room: params.get("room"),
          };
          this.props.GetSavedItems(data);

          // this.setState({
          //   showAlert: true,
          //   alertMsg: this.props.removeSavedItemsMessage,
          // });
        }

        this.props.GetProjectswithSavedItem({
          MOE_item: this.state.itemId,
        });
      }
    }
    if (this.props.addtoCart != prevProps.addtoCart) {
      if (this.props.addtoCart.success == true) {
        this.setState({ AddedTocart: true });
        this.props.GetCartItem(this.state.itemId);
        if (this.state.newBuyNow) {
          this.props.history.push("/Cart");
        }
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
        this.props.GetCartItem(this.state.itemId);
      }
    }
    if (this.props.likeItems != prevProps.likeItems) {
      if (this.props.likeItems.success == true) {
        const data = {
          projectId: atob(this.state.projectID),
          room: this.state.room,
        };
        // this.props.GetSavedItems(data);
        if (!this.state.savedItemsClient) {
          axios
            .post(apiURL + getPassedItems, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              if (res.data.message.length > 0) {
                window.location.replace(
                  `/viewItem?item=${res.data.message[0].MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`
                );
              } else {
                this.props.history.push({
                  pathname: "/likeItems",
                  search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                  state: {
                    newItems: false,
                    likeItems: false,
                    passedItems: true,
                  },
                });
              }
            })
            .catch((err) => {
              if (err.response.data.message == "Unauthenticated") {
                this.props.logout();
              } else {
                this.setState({
                  alertMsg: err.response.data.message,
                  showAlert: true,
                });
              }
            });
        } else {
          axios
            .post(apiURL + getSavedItems, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              let newItems = res.data.message.filter(
                (items) => items.liked !== true && items.liked !== false
              );
              if (newItems.length > 0) {
                window.location.replace(
                  `/viewsavedItem?item=${newItems[0].MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`
                );
              } else {
                this.props.history.push({
                  pathname: "/likeItems",
                  search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                  state: {
                    newItems: false,
                    likeItems: false,
                    passedItems: true,
                  },
                });
              }
            })
            .catch((err) => {
              if (err.response.data.message == "Unauthenticated") {
                this.props.logout();
              } else {
                this.setState({
                  alertMsg: err.response.data.message,
                  showAlert: true,
                });
              }
            });
        }
      }
    }
    if (this.props.passItems != prevProps.passItems) {
      if (this.props.passItems.success == true) {
        const data = {
          projectId: atob(this.state.projectID),
          room: this.state.room,
        };
        // this.props.GetSavedItems(data);
        if (!this.state.savedItemsClient) {
          axios
            .post(apiURL + getLikedItems, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              if (res.data.message.length > 0) {
                window.location.replace(
                  `/viewItem?item=${res.data.message[0].MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`
                );
              } else {
                this.props.history.push({
                  pathname: "/likeItems",
                  search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                  state: {
                    newItems: false,
                    likeItems: true,
                    passedItems: false,
                  },
                });
              }
            })
            .catch((err) => {
              if (err.response.data.message == "Unauthenticated") {
                this.props.logout();
              } else {
                this.setState({
                  alertMsg: err.response.data.message,
                  showAlert: true,
                });
              }
            });
        } else {
          axios
            .post(apiURL + getSavedItems, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              let newItems = res.data.message.filter(
                (items) => items.liked !== true && items.liked !== false
              );
              if (newItems.length > 0) {
                window.location.replace(
                  `/viewsavedItem?item=${newItems[0].MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`
                );
              } else {
                this.props.history.push({
                  pathname: "/likeItems",
                  search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                  state: {
                    newItems: false,
                    likeItems: false,
                    passedItems: true,
                  },
                });
              }
            })
            .catch((err) => {
              if (err.response.data.message == "Unauthenticated") {
                this.props.logout();
              } else {
                this.setState({
                  alertMsg: err.response.data.message,
                  showAlert: true,
                });
              }
            });
        }
      }
    }
    if (this.props.getAllProjects != prevProps.getAllProjects) {
      if (this.props.getAllProjects.success == true) {
        this.setState({ allProjects: this.props.getAllProjects.message });
      }
    }
    if (
      this.props.getProjectswithSavedItem != prevProps.getProjectswithSavedItem
    ) {
      if (this.props.getProjectswithSavedItem.success == true) {
        this.setState({
          getProjectswithSavedItem: this.props.getProjectswithSavedItem.message,
        });
      }
    }
    if (this.props.paymentReducer != prevProps.paymentReducer) {
      if (this.props.paymentReducer.success == true) {
        // if (localStorage.getItem("stripeSession")) {
        // } else {
        localStorage.setItem(
          "stripeSession",
          this.props.paymentReducer.message.id
        );
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
          sessionId: this.props.paymentReducer.message.id,
        });

        if (result.error) {
          this.setState({
            alertMsg: result.error,
            showAlert: true,
          });
        }
        // }
      }
    }
    if (this.props.getProduct != prevProps.getProduct) {
      if (this.props.getProduct.success == true) {
        this.setState({ productInfo: this.props.getProduct.message });
      }
    }
    if (this.props.affirm != prevProps.affirm) {
      this.setState({
        alertMsg: this.props.affirm.message,
        showAlert: true,
        affirmPaid: true,
        loadingAffirm: false,
        showModalBuyNow: false,
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
  resize() {
    let currentHideNav = window.innerWidth <= 768;

    if (currentHideNav === true) {
      this.setState({ menuClose: true });
    } else {
      this.setState({ menuClose: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  AddCart = (e, price, item) => {
    let userType;
    if (localStorage.getItem("user")) {
      var token = JSON.parse(localStorage.getItem("user"));
      userType = token.role;
    }

    if (userType == "client") {
      this.props.AddToCart(price, item, 1, atob(this.state.projectID));
    } else {
      this.props.AddToCart(price, item);
    }
    // this.setState({ AddedTocart: true });
  };
  prev = () => {
    var mySwiper = document.querySelector(".swiper-container").swiper;
    var myswiper = document.querySelector(".swiper-container");
    mySwiper.slidePrev();
  };
  next = () => {
    var mySwiper = document.querySelector(".swiper-container").swiper;
    mySwiper.slideNext();
  };
  addToProject = (item) => {
    const data = {
      projectId: atob(this.state.projectID),
      room: this.state.room,
      MOE_item: item,
    };
    this.props.SaveToProject(data);
  };
  RemovefromProject = (item) => {
    const data = {
      projectId: atob(this.state.projectID),
      room: this.state.room,
      MOE_item: item,
    };
    this.props.RemoveFromProject(data);
  };
  likeItem = (item) => {};
  passItem = (item) => {};
  setnewItems = () => {
    this.setState({
      newItems: true,
      likeItems: false,
      passedItems: false,
    });
  };
  setlikeItems = () => {
    this.setState({
      newItems: false,
      likeItems: true,
      passedItems: false,
    });
  };
  setpassedItems = () => {
    this.setState({
      newItems: false,
      likeItems: false,
      passedItems: true,
    });
  };
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

      // this.state.cartItems.map((cartITem) => {
      let priceClient = parseFloat(this.state.productInfo.pricing[0].Map) * 100;
      let priceDesigner =
        parseFloat(this.state.productInfo.pricing[0].ECommerceCost) * 100;
      let images = [];
      // SubtotalClient = SubtotalClient + priceClient;
      // SubtotalDesigner = SubtotalDesigner + priceDesigner;

      this.state.productInfo.productImagesLinks.map((image, i) => {
        if (
          image != "" &&
          i < this.state.productInfo.productImagesLinks.length - 1
        ) {
          images.push(image);
        }
      });

      if (userType == "client") {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: this.state.productInfo.MOE_productName,
              description: this.state.productInfo.SEO.shortDescription,
              images: images,
            },
            unit_amount: priceClient,
          },
          quantity: 1,
        });
      } else {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: this.state.productInfo.MOE_productName,
              description: this.state.productInfo.SEO.shortDescription,
              images: images,
            },
            unit_amount: priceDesigner,
          },
          quantity: 1,
        });
      }
      // });

      this.props.BuyNow(line_items, this.state.itemId, this.state.addressInfo);
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

      let priceClient = parseFloat(this.state.productInfo.pricing[0].Map);
      let priceDesigner = parseFloat(
        this.state.productInfo.pricing[0].ECommerceCost
      );
      let images = [];
      SubtotalClient = SubtotalClient + priceClient;
      SubtotalDesigner = SubtotalDesigner + priceDesigner;

      if (userType == "client") {
        line_items.push({
          number: 1,

          amount: priceClient,

          quantity: 1,
        });
      } else {
        line_items.push({
          number: 1,

          amount: priceDesigner,

          quantity: 1,
        });
      }

      this.props.GetTaxes(line_items, this.state.addressInfo);
    }
  };
  handleCheckOutAffirm = (tax_amount) => {
    let line_items = [];
    let self = this;
    var user = JSON.parse(localStorage.getItem("user"));
    let userType = user.role;
    let SubtotalClient = 0;
    let SubtotalDesigner = 0;

    let priceClient = parseFloat(this.state.productInfo.pricing[0].Map) * 100;
    let priceDesigner =
      parseFloat(this.state.productInfo.pricing[0].ECommerceCost) * 100;
    let images = [];
    SubtotalClient = SubtotalClient + priceClient;
    SubtotalDesigner = SubtotalDesigner + priceDesigner;

    if (userType == "client") {
      line_items.push({
        display_name: this.state.productInfo.MOE_productName,
        sku: this.state.productInfo.MOE_item,
        unit_price: priceClient,
        item_url:
          "http://13.59.176.130/viewItem?item=" +
          this.state.productInfo.MOE_item,
        item_image_url: this.state.productInfo.productImagesLinks[0],

        quantity: 1,
      });
    } else {
      line_items.push({
        display_name: this.state.productInfo.MOE_productName,
        sku: this.state.productInfo.MOE_item,
        unit_price: priceDesigner,
        item_url:
          "http://13.59.176.130/viewItem?item=" +
          this.state.productInfo.MOE_item,
        item_image_url: this.state.productInfo.productImagesLinks[0],

        quantity: 1,
      });
    }

    // window.affirm.ui.ready(function () {

    window.affirm.checkout({
      merchant: {
        user_confirmation_url:
          process.env.REACT_APP_URL +
          "/viewItem?item=" +
          this.state.productInfo.MOE_item,
        // user_confirmation_url:
        //   "http://localhost:3000/viewItem?item=" +
        //   this.state.productInfo.MOE_item,

        user_cancel_url:
          process.env.REACT_APP_URL +
          "/viewItem?item=" +
          this.state.productInfo.MOE_item,
        // user_cancel_url:
        //   "http://localhost:3000/viewItem?item=" +
        //   this.state.productInfo.MOE_item,
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
        self.props.AffirmConfirmationBuyNow(
          checkout.checkout_token,
          user._id,
          self.state.addressInfo
        );
        self.setState({ loadingAffirm: true });
      },
    });
    // });

    // this.props.payment(line_items);
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
    const slideOpts = {
      initialSlide: 0,
      speed: 300,
      slidesPerView: "1",
    };
    let like = false;
    let pass = false;
    let userType;
    var category = "";
    if (localStorage.getItem("user")) {
      var token = JSON.parse(localStorage.getItem("user"));
      userType = token.role;
    }
    let found = false;
    if (this.state.productInfo) {
      found = this.state.SavedItems.some(
        (el) => el.MOE_item === this.state.productInfo.MOE_item
      );
      if (userType == "client") {
        found = this.state.SavedItems.filter(
          (el) => el.MOE_item === this.state.productInfo.MOE_item
        );
      }
      if (userType == "client" && !this.state.savedItemsClient) {
        if (found.length > 0) {
          if (found[0].liked == true) {
            like = true;
          }
          if (found[0].liked == false) {
            pass = true;
          }
        }
      }
      category = this.state.productInfo.grouping.category
        .toLowerCase()
        .split(">");
    }

    return (
      <>
        <ToolbarMobile />
        {userType != "client" ? (
          this.state.searchDecor ||
          this.state.savedItems ||
          this.state.likedItems ||
          this.state.passedItems ? (
            <IonToolbar className="headerToolbar headerProjects">
              <IonButtons className="ion-justify-content-center">
                <Link to="/currentprojects" style={{ textDecoration: "none" }}>
                  <IonChip
                    className={
                      window.location.pathname === "/currentprojects"
                        ? "LoginBtn"
                        : "Projectchips"
                    }
                  >
                    <IonLabel
                      style={{ textAlign: "center", fontSize: "12.9px" }}
                    >
                      Current projects
                    </IonLabel>
                  </IonChip>
                </Link>
                <Link
                  to={`project?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`}
                  style={{ textDecoration: "none" }}
                >
                  <IonChip
                    className={
                      // window.location.pathname === "/newProject"
                      // ?
                      "LoginBtn "
                      // : "Projectchips"
                    }
                  >
                    <IonLabel
                      style={{ textAlign: "center", fontSize: "12.9px" }}
                    >
                      {this.state.client}'s project
                    </IonLabel>
                  </IonChip>
                </Link>
              </IonButtons>
            </IonToolbar>
          ) : (
            <ToolbarExplore />
          )
        ) : null}

        <BottomMenu />
        <IonAlert
          isOpen={this.state.showAlert}
          onDidDismiss={() => {
            if (
              this.state.alertMsg ==
              "Item removed from the project successfully"
            ) {
              this.props.history.goBack();
            }
            this.setState({ showAlert: false });
          }}
          cssClass=""
          message={this.state.alertMsg}
          buttons={[
            {
              text: "Okay",
              role: "cancel",
              cssClass: "cashmereAlertBtn",
            },
          ]}
        />
        <IonContent fullscreen>
          <IonModal
            isOpen={this.state.showModal}
            cssClass="change-address-shipping-modal"
            onDidDismiss={() => this.setState({ showModal: false })}
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>Save to Project</IonTitle>

                <IonButtons slot="end">
                  <IonButton
                    onClick={() => this.setState({ showModal: false })}
                  >
                    <IonIcon icon={closeOutline} style={{ color: "black" }} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonGrid>
                <IonRow>
                  {this.state.allProjects.length > 0 ? (
                    this.state.allProjects.map((project) => {
                      let projectFound = [];

                      if (project.projectRooms.completed != true) {
                        if (this.state.getProjectswithSavedItem) {
                          projectFound =
                            this.state.getProjectswithSavedItem.filter(
                              (el) => el.projectId === project._id
                            );
                        }
                        return (
                          <IonCol sizeXl="6" sizeMd="12">
                            <IonItem
                              lines="none"
                              onClick={() => {
                                if (projectFound.length > 0) {
                                  let datahere = {
                                    projectId: project._id,
                                    room: project.projectRooms.room,
                                    MOE_item: this.state.productInfo.MOE_item
                                      ? this.state.productInfo.MOE_item
                                      : this.state.productInfo.MOE_ITEM,
                                  };

                                  this.props.RemoveFromProject(datahere);
                                } else {
                                  const datasave = {
                                    projectId: project._id,
                                    room: project.projectRooms.room,
                                    MOE_item: this.state.productInfo.MOE_item
                                      ? this.state.productInfo.MOE_item
                                      : this.state.productInfo.MOE_ITEM,
                                  };
                                  this.props.SaveToProject(datasave);
                                }
                              }}
                              className="newprojectRadio"
                            >
                              <IonCheckbox
                                slot="start"
                                // value={val}
                                checked={projectFound.length > 0 ? true : false}
                                // name={room.room}
                              />
                              <IonLabel style={{ textTransform: "capitalize" }}>
                                {`${project.client_lastname}'s ${project.projectRooms.room} project`}
                              </IonLabel>{" "}
                            </IonItem>
                          </IonCol>
                        );
                      }
                    })
                  ) : (
                    <IonCol>
                      <IonLabel>No projects found</IonLabel>
                    </IonCol>
                  )}
                </IonRow>
              </IonGrid>
            </IonContent>
            {/* <IonFooter>
              <ion-row class="ion-justify-content-end filterEndRow ">
                <IonButton
                  className="charcoal mr-3"
                  onClick={() => this.setState({ showModal: false })}
                >
                  Cancel
                </IonButton>
                <IonButton
                  className="cashmere"
                  onClick={() => this.setState({ showModal: false })}
                >
                  Save
                </IonButton>
              </ion-row>
            </IonFooter> */}
          </IonModal>

          <IonModal
            isOpen={this.state.showModalBuyNow}
            cssClass="change-address-shipping-modal"
            onDidDismiss={() => this.setState({ showModalBuyNow: false })}
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>Add Shipping Information</IonTitle>

                <IonButtons slot="end">
                  <IonButton
                    onClick={() => this.setState({ showModalBuyNow: false })}
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
                          name="city"
                          placeholder="Enter City"
                          required
                          id="city"
                          style={{ textTransform: "capitalize" }}
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
                  </IonRow>{" "}
                </IonGrid>{" "}
              </form>{" "}
            </IonContent>
            <IonFooter>
              <ion-row class="ion-justify-content-end filterEndRow ">
                <IonButton
                  className="charcoal"
                  onClick={() => this.handleCheckOut()}
                  // className="checkoutButton"
                >
                  Buy Now
                </IonButton>
                <IonButton
                  className="charcoal"
                  onClick={() => this.getTaxes()}
                  // className="checkoutButton"
                >
                  Proceed with Affirm
                </IonButton>
              </ion-row>
            </IonFooter>
          </IonModal>

          <IonGrid className="" style={{ padding: "0" }}>
            {userType == "client" ? (
              !this.state.viewCartItemClient || this.state.savedItemsClient ? (
                <>
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
                          {`${this.state.room}`} Project
                        </span>
                      </IonCardTitle>
                      {/* </IonCardHeader>
                </IonCard> */}
                    </IonCol>{" "}
                  </IonRow>
                  <IonRow>
                    <ToolBarClientProject
                      newItems={this.state.savedItemsClient}
                      setnewItems={this.setnewItems}
                      likeItems={like}
                      setlikeItems={this.setlikeItems}
                      passedItems={pass}
                      setpassedItems={this.setpassedItems}
                      client={this.state.client}
                      room={this.state.room}
                      projectId={this.state.projectID}
                    />
                  </IonRow>
                  <IonRow className="projectClientDesktopNavigation">
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
                          search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                          state: {
                            newItems: true,
                            likeItems: false,
                            passedItems: false,
                          },
                        }}
                      >
                        <IonButton
                          className={
                            this.state.savedItemsClient
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
                          search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                          state: {
                            newItems: false,
                            likeItems: true,
                            passedItems: false,
                          },
                        }}
                      >
                        <IonButton
                          className={
                            like == true ? "selectedButton" : "checkoutButton "
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
                          search: `?client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                          state: {
                            newItems: false,
                            likeItems: false,
                            passedItems: true,
                          },
                        }}
                      >
                        <IonButton
                          className={
                            pass == true ? "selectedButton" : "checkoutButton "
                          }
                          title="Search for Decor"
                        >
                          See items you passed
                        </IonButton>{" "}
                      </Link>
                    </IonCol>
                  </IonRow>{" "}
                </>
              ) : null
            ) : null}
            {this.state.searchDecor ||
            this.state.savedItems ||
            this.state.likedItems ||
            this.state.passedItems ? (
              <>
                <IonRow className="">
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
                    <IonGrid className="p-0">
                      <IonRow>
                        <IonCol
                          sizeXl="3"
                          sizeLg="6"
                          sizeMd="6"
                          sizeSm="12"
                          sizeXs="12"
                          className="clientPagedHEaderButtons py-0"
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
                          className="clientPagedHEaderButtons py-0"
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
                          className="clientPagedHEaderButtons py-0"
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
                          className="clientPagedHEaderButtons py-0"
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
                      </IonRow>{" "}
                    </IonGrid>
                  </IonCol>
                </IonRow>{" "}
              </>
            ) : null}
            {this.state.productInfo ? (
              <IonRow className="">
                {/* {this.state.furnitureItems

                .filter((item) => this.state.itemId == item.id)
                .map((items) => ( */}
                <>
                  <IonCol
                    size="12"
                    className={
                      this.state.searchDecor ||
                      this.state.savedItems ||
                      this.state.likedItems ||
                      this.state.passedItems
                        ? "mobilemargin p-0"
                        : "mobilemarginwithPRojectNAv2 p-0 mt-4"
                    }
                  >
                    <div className="position-relative ">
                      <IonSlides
                        pager={true}
                        options={slideOpts}
                        style={{ height: "300px" }}
                        paginationType="bullets"
                        className="swiper-container"
                        ionSlidesDidLoad={() => {
                          this.setState({
                            prevbtn: false,
                            nextbtn: true,
                          });
                        }}
                        onIonSlideDidChange={() => {
                          var myswiper =
                            document.querySelector(".swiper-container");
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
                        {
                          // this.state.savedItems == true ||
                          // this.state.likedItems == true ||
                          // this.state.passedItems == true
                          this.state.productInfo.productImagesLinks.map(
                            (image, i) =>
                              image != "" &&
                              i <
                                this.state.productInfo.productImagesLinks
                                  .length -
                                  1 ? (
                                <IonSlide>
                                  <IonImg
                                    src={image}
                                    className="signleItemImages"
                                  />
                                </IonSlide>
                              ) : null
                          )
                        }
                      </IonSlides>

                      {this.state.prevbtn ? (
                        <a onClick={this.prev} className="backChev">
                          <IonIcon
                            icon={chevronBackCircleOutline}
                            title="Go back"
                          />
                        </a>
                      ) : null}
                      {this.state.nextbtn ? (
                        <a
                          onClick={this.next}
                          className="nextChev"
                          id="nextChev"
                          title="Go forward"
                        >
                          <IonIcon icon={chevronForwardCircleOutline} />
                        </a>
                      ) : null}
                    </div>
                    {this.state.savedItemsClient ? (
                      <div className="text-center clientSavedItems">
                        <div className="mt-1 mb-2">
                          {found.length > 0 ? (
                            <>
                              {found[0].liked == null ||
                              found[0].liked == true ? (
                                <IonButton
                                  className="charcoal  m-0"
                                  onClick={(e) => {
                                    const APIdata = {
                                      projectId: atob(this.state.projectID),
                                      MOE_item: this.state.productInfo.MOE_item,
                                      room: this.state.room,
                                    };
                                    this.props.PassItem(APIdata);
                                  }}
                                >
                                  Pass{" "}
                                  <i
                                    className="ion-margin-start pass far fa-thumbs-down"
                                    style={{
                                      fontSize: "14px",
                                      marginLeft: "14px",
                                      verticalAlign: " baseline",
                                    }}
                                    // icon={thumbsDownOutline}
                                  />
                                </IonButton>
                              ) : null}{" "}
                              {found[0].liked == false ? (
                                <IonButton
                                  className="saved  m-0"
                                  onClick={(e) => {
                                    const APIdata = {
                                      projectId: atob(this.state.projectID),
                                      MOE_item: this.state.productInfo.MOE_item,
                                      room: this.state.room,
                                    };
                                    this.props.LikeItem(APIdata);
                                  }}
                                >
                                  Passed
                                  <IonIcon
                                    icon={checkmarkOutline}
                                    style={{
                                      fontSize: "20px",
                                      marginLeft: "10px",
                                      verticalAlign: " baseline",
                                    }}
                                  />
                                </IonButton>
                              ) : null}
                              {found[0].liked == null ||
                              found[0].liked == false ? (
                                <IonButton
                                  className="charcoal  m-0 ml-2"
                                  onClick={(e) => {
                                    const APIdata = {
                                      projectId: atob(this.state.projectID),
                                      MOE_item: this.state.productInfo.MOE_item,
                                      room: this.state.room,
                                    };
                                    this.props.LikeItem(APIdata);
                                  }}
                                >
                                  Like{" "}
                                  <i
                                    className="far fa-thumbs-up"
                                    style={{
                                      fontSize: "14px",
                                      marginLeft: "14px",
                                      verticalAlign: " baseline",
                                    }}
                                    // icon={thumbsDownOutline}
                                  />
                                </IonButton>
                              ) : null}{" "}
                              {found[0].liked == true ? (
                                <IonButton
                                  className="saved  m-0 ml-2"
                                  onClick={(e) => {
                                    const APIdata = {
                                      projectId: atob(this.state.projectID),
                                      MOE_item: this.state.productInfo.MOE_item,
                                      room: this.state.room,
                                    };
                                    this.props.PassItem(APIdata);
                                  }}
                                >
                                  Liked
                                  <IonIcon
                                    icon={checkmarkOutline}
                                    style={{
                                      fontSize: "20px",
                                      marginLeft: "10px",
                                      verticalAlign: " baseline",
                                    }}
                                  />
                                </IonButton>
                              ) : null}
                            </>
                          ) : null}
                        </div>
                        <div>
                          {this.state.AddedTocart ? (
                            <IonButton
                              className="saved m-0"
                              onClick={(e) => {
                                this.props.UpdateQuantity(
                                  this.state.productInfo.MOE_item,
                                  0
                                );
                              }}
                            >
                              Added to Cart{" "}
                              <span>
                                <IonIcon
                                  icon={checkmarkOutline}
                                  style={{
                                    fontSize: "20px",
                                    marginLeft: "10px",
                                    verticalAlign: " baseline",
                                  }}
                                />
                              </span>
                            </IonButton>
                          ) : (
                            <IonButton
                              className="cashmere  m-0"
                              onClick={(e) =>
                                this.AddCart(
                                  e,
                                  this.state.productInfo.pricing[0]
                                    .ECommerceCost,
                                  this.state.productInfo.MOE_item
                                )
                              }
                            >
                              Add to Cart
                            </IonButton>
                          )}
                        </div>
                      </div>
                    ) : null}
                    <div className="container px-4 ">
                      <IonCardSubtitle
                        className=" mt-1 itemNameSingleItem"
                        style={{ fontWeight: "500" }}
                      >
                        {/* {this.state.productInfo.MOE_productName} */}
                        {this.state.productInfo.grouping.color +
                          " " +
                          this.state.productInfo.grouping.style.toLowerCase() +
                          " " +
                          category[category.length - 1].slice(0, -1)}
                      </IonCardSubtitle>
                      {/* <div className="priceDiv d-flex ion-justify-content-between"> */}
                      <IonCardSubtitle
                        style={{ fontWeight: "300" }}
                        className=" itemDetailsSingleItem"
                      >
                        {userType == "client"
                          ? `Price: $${this.state.productInfo.pricing[0].Map}`
                          : `Retail Price: $${this.state.productInfo.pricing[0].Map}`}
                      </IonCardSubtitle>
                      {userType !== "designer" ? null : (
                        <>
                          {" "}
                          <IonCardSubtitle
                            style={{ fontWeight: "300" }}
                            className=" itemDetailsSingleItem"
                          >
                            Your Price:{" "}
                            {` $${this.state.productInfo.pricing[0].ECommerceCost}`}
                          </IonCardSubtitle>
                          {this.state.productInfo.InventoryDetails.Stock_WA ==
                            0 &&
                          this.state.productInfo.InventoryDetails.Stock_NJ ==
                            0 ? (
                            <IonCardSubtitle
                              style={{ fontWeight: "400", color: "red" }}
                              className="itemDetailsSingleItem"
                            >
                              Out of stock
                            </IonCardSubtitle>
                          ) : (
                            <IonCardSubtitle
                              style={{ fontWeight: "400", color: "green" }}
                              className="itemDetailsSingleItem"
                            >
                              Your potential commission :
                              {` $${
                                parseFloat(
                                  this.state.productInfo.pricing[0].Map
                                ) -
                                parseFloat(
                                  this.state.productInfo.pricing[0]
                                    .ECommerceCost
                                )
                              }
                                `}
                            </IonCardSubtitle>
                          )}
                        </>
                      )}
                      {/* </div> */}
                      <IonCardSubtitle
                        className="itemDetailsSingleItem "
                        style={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                      >
                        Details:
                      </IonCardSubtitle>
                      <IonText
                        className="DetailsSingleItem "
                        style={{ fontWeight: "300" }}
                      >
                        <p className="m-0">
                          {this.state.productInfo.SEO.featuresBenefits[0]}.{" "}
                          {this.state.productInfo.SEO.featuresBenefits[1]}.{" "}
                          {this.state.productInfo.SEO.featuresBenefits[2]}.{" "}
                          {this.state.productInfo.SEO.featuresBenefits[3]}.{" "}
                        </p>
                      </IonText>
                      <div className="d-flex" style={{ marginTop: "1px" }}>
                        <IonCardSubtitle
                          style={{ fontWeight: "300" }}
                          className="itemDetailsSingleItem mr-3"
                        >
                          Height: {this.state.productInfo.dimension.height} IN
                        </IonCardSubtitle>
                        <IonCardSubtitle
                          style={{ fontWeight: "300" }}
                          className="itemDetailsSingleItem mr-3"
                        >
                          {" "}
                          Width: {this.state.productInfo.dimension.width} IN
                        </IonCardSubtitle>
                        <IonCardSubtitle
                          style={{ fontWeight: "300" }}
                          className="itemDetailsSingleItem mr-3"
                        >
                          {" "}
                          Depth: {this.state.productInfo.dimension.depth} IN
                        </IonCardSubtitle>
                        <IonCardSubtitle
                          style={{ fontWeight: "300" }}
                          className="itemDetailsSingleItem mr-2"
                        >
                          {" "}
                          Weight: {this.state.productInfo.dimension.weight} LBS
                        </IonCardSubtitle>
                      </div>{" "}
                    </div>{" "}
                  </IonCol>{" "}
                  <IonRow class="ion-justify-content-center  bottomButtons ">
                    {this.state.searchDecor ? (
                      <IonCol
                        sizeMd="6"
                        sizeXs="12"
                        className="addBuyCol ion-text-center"
                      >
                        {!found ? (
                          <IonButton
                            className="saveButton addCart "
                            onClick={(e) => {
                              this.addToProject(
                                this.state.productInfo.MOE_item
                              );
                            }}
                          >
                            Save to Project
                          </IonButton>
                        ) : (
                          <IonButton
                            className="saved "
                            style={{ margin: 0 }}
                            onClick={(e) =>
                              this.RemovefromProject(
                                this.state.productInfo.MOE_item
                              )
                            }
                          >
                            Saved{" "}
                            <span>
                              <IonIcon
                                icon={checkmarkOutline}
                                style={{
                                  fontSize: "20px",
                                  marginLeft: "10px",
                                  verticalAlign: " baseline",
                                }}
                              />
                            </span>
                          </IonButton>
                        )}
                      </IonCol>
                    ) : this.state.savedItems ? (
                      <IonCol
                        sizeMd="6"
                        sizeXs="12"
                        className="addBuyCol ion-text-center"
                      >
                        {found ? (
                          <IonButton
                            className=" addCart saved "
                            onClick={(e) => {
                              this.RemovefromProject(
                                this.state.productInfo.MOE_item
                              );
                            }}
                          >
                            Saved{" "}
                            <span>
                              <IonIcon
                                icon={checkmarkOutline}
                                style={{
                                  fontSize: "20px",
                                  marginLeft: "10px",
                                  verticalAlign: " baseline",
                                }}
                              />
                            </span>
                          </IonButton>
                        ) : (
                          <IonButton
                            className="saveButton addCart "
                            onClick={(e) => {
                              this.addToProject(
                                this.state.productInfo.MOE_item
                              );
                            }}
                          >
                            Save to Project
                          </IonButton>
                        )}
                      </IonCol>
                    ) : this.state.likedItems ? null : this.state // </IonCol> //   </IonButton> //     Pass //   > //     }} //       ); //         this.state.productInfo.MOE_item //       this.likeItem( //     onClick={(e) => { //     className="saveButton addCart " //   <IonButton // > //   className="addBuyCol ion-text-center" //   sizeXs="12" //   sizeMd="6" // <IonCol
                        .passedItems ? null : (
                      <>
                        {
                          userType == "client" ? (
                            !this.state.savedItemsClient ? (
                              <>
                                <IonCol
                                  sizeMd="6"
                                  sizeXs="6"
                                  className="addBuyCol d-flex justify-content-end"
                                >
                                  {found.length > 0 ? (
                                    found[0].liked == true ? (
                                      <IonButton
                                        className="charcoal buyNow m-0"
                                        onClick={(e) => {
                                          const APIdata = {
                                            projectId: atob(
                                              this.state.projectID
                                            ),
                                            MOE_item: this.state.itemId,
                                            room: this.state.room,
                                          };
                                          this.props.PassItem(APIdata);
                                        }}
                                      >
                                        Pass{" "}
                                        {/* <IonIcon
                                          className="ion-margin-start pass"
                                          icon={thumbsDownOutline}
                                        /> */}
                                        <i
                                          className="ion-margin-start pass far fa-thumbs-down"
                                          style={{
                                            fontSize: "14px",
                                            marginLeft: "14px",
                                            verticalAlign: " baseline",
                                          }}
                                          // icon={thumbsDownOutline}
                                        />
                                      </IonButton>
                                    ) : found[0].liked == false ? (
                                      <IonButton
                                        className="charcoal buyNow m-0"
                                        onClick={(e) => {
                                          const APIdata = {
                                            projectId: atob(
                                              this.state.projectID
                                            ),
                                            MOE_item: this.state.itemId,
                                            room: this.state.room,
                                          };
                                          this.props.LikeItem(APIdata);
                                        }}
                                      >
                                        Like{" "}
                                        <i
                                          className="ion-margin-start pass far fa-thumbs-up"
                                          style={{
                                            fontSize: "14px",
                                            marginLeft: "14px",
                                            verticalAlign: " baseline",
                                          }}
                                          // icon={thumbsDownOutline}
                                        />
                                      </IonButton>
                                    ) : null
                                  ) : null}
                                </IonCol>

                                <IonCol
                                  sizeMd={
                                    this.state.viewCartItemClient ? "12" : "6"
                                  }
                                  sizeXs={
                                    this.state.viewCartItemClient ? "12" : "6"
                                  }
                                  className={
                                    this.state.viewCartItemClient
                                      ? "addBuyCol d-flex justify-content-center"
                                      : "addBuyCol d-flex justify-content-start"
                                  }
                                >
                                  {this.state.AddedTocart ? (
                                    <IonButton
                                      className="saved addCart m-0"
                                      onClick={(e) => {
                                        this.props.UpdateQuantity(
                                          this.state.productInfo.MOE_item,
                                          0
                                        );
                                      }}
                                    >
                                      Added to Cart{" "}
                                      <span>
                                        <IonIcon
                                          icon={checkmarkOutline}
                                          style={{
                                            fontSize: "20px",
                                            marginLeft: "10px",
                                            verticalAlign: " baseline",
                                          }}
                                        />
                                      </span>
                                    </IonButton>
                                  ) : (
                                    <IonButton
                                      className="cashmere addCart m-0"
                                      onClick={(e) =>
                                        this.AddCart(
                                          e,
                                          this.state.productInfo.pricing[0]
                                            .ECommerceCost,
                                          this.state.productInfo.MOE_item
                                        )
                                      }
                                    >
                                      Add to Cart
                                    </IonButton>
                                  )}
                                </IonCol>
                              </>
                            ) : (
                              <>
                                <IonCol className="hiddenSaveItemsButton">
                                  <div
                                    className="d-flex addBuyDiv justify-content-center px-1 "
                                    // style={{ width: "100%" }}
                                  >
                                    {found.length > 0 ? (
                                      <>
                                        <div className="m-0 p-0 m-1 ">
                                          {found[0].liked == null ||
                                          found[0].liked == true ? (
                                            <IonButton
                                              className="charcoal buttonMobile m-0"
                                              onClick={(e) => {
                                                const APIdata = {
                                                  projectId: atob(
                                                    this.state.projectID
                                                  ),
                                                  MOE_item:
                                                    this.state.productInfo
                                                      .MOE_item,
                                                  room: this.state.room,
                                                };
                                                this.props.PassItem(APIdata);
                                              }}
                                            >
                                              Pass{" "}
                                              <i
                                                className="ion-margin-start pass far fa-thumbs-down"
                                                style={{
                                                  fontSize: "14px",
                                                  marginLeft: "14px",
                                                  verticalAlign: " baseline",
                                                }}
                                                // icon={thumbsDownOutline}
                                              />
                                            </IonButton>
                                          ) : null}{" "}
                                          {found[0].liked == false ? (
                                            <IonButton
                                              className="saved buttonMobile  m-0"
                                              onClick={(e) => {
                                                const APIdata = {
                                                  projectId: atob(
                                                    this.state.projectID
                                                  ),
                                                  MOE_item:
                                                    this.state.productInfo
                                                      .MOE_item,
                                                  room: this.state.room,
                                                };
                                                this.props.LikeItem(APIdata);
                                              }}
                                            >
                                              Passed
                                              <IonIcon
                                                icon={checkmarkOutline}
                                                style={{
                                                  fontSize: "20px",
                                                  marginLeft: "10px",
                                                  verticalAlign: " baseline",
                                                }}
                                              />
                                            </IonButton>
                                          ) : null}
                                        </div>
                                        <div className="m-1  ">
                                          {found[0].liked == null ||
                                          found[0].liked == false ? (
                                            <IonButton
                                              className="charcoal buttonMobile m-0 "
                                              onClick={(e) => {
                                                const APIdata = {
                                                  projectId: atob(
                                                    this.state.projectID
                                                  ),
                                                  MOE_item:
                                                    this.state.productInfo
                                                      .MOE_item,
                                                  room: this.state.room,
                                                };
                                                this.props.LikeItem(APIdata);
                                              }}
                                            >
                                              Like{" "}
                                              <i
                                                className="far fa-thumbs-up"
                                                style={{
                                                  fontSize: "14px",
                                                  marginLeft: "14px",
                                                  verticalAlign: " baseline",
                                                }}
                                                // icon={thumbsDownOutline}
                                              />
                                            </IonButton>
                                          ) : null}{" "}
                                          {found[0].liked == true ? (
                                            <IonButton
                                              className="saved buttonMobile m-0 "
                                              onClick={(e) => {
                                                const APIdata = {
                                                  projectId: atob(
                                                    this.state.projectID
                                                  ),
                                                  MOE_item:
                                                    this.state.productInfo
                                                      .MOE_item,
                                                  room: this.state.room,
                                                };
                                                this.props.PassItem(APIdata);
                                              }}
                                            >
                                              Liked
                                              <IonIcon
                                                icon={checkmarkOutline}
                                                style={{
                                                  fontSize: "20px",
                                                  marginLeft: "10px",
                                                  verticalAlign: " baseline",
                                                }}
                                              />
                                            </IonButton>
                                          ) : null}
                                        </div>
                                      </>
                                    ) : null}
                                  </div>{" "}
                                  <div className="hiddenBuyNow m-1 p-0">
                                    {this.state.AddedTocart ? (
                                      <IonButton
                                        className="saved m-0 hiddenBuyNowButton m-0"
                                        onClick={(e) => {
                                          this.props.UpdateQuantity(
                                            this.state.productInfo.MOE_item,
                                            0
                                          );
                                        }}
                                        style={{ width: "100%" }}
                                      >
                                        Added to Cart{" "}
                                        <span>
                                          <IonIcon
                                            icon={checkmarkOutline}
                                            style={{
                                              fontSize: "20px",
                                              marginLeft: "10px",
                                              verticalAlign: " baseline",
                                            }}
                                          />
                                        </span>
                                      </IonButton>
                                    ) : (
                                      <IonButton
                                        className="cashmere hiddenBuyNowButton m-0"
                                        onClick={(e) =>
                                          this.AddCart(
                                            e,
                                            this.state.productInfo.pricing[0]
                                              .ECommerceCost,
                                            this.state.productInfo.MOE_item
                                          )
                                        }
                                        style={{ width: "100%" }}
                                      >
                                        Add to Cart
                                      </IonButton>
                                    )}
                                  </div>
                                </IonCol>
                              </>
                            )
                          ) : (
                            <IonCol>
                              <div
                                className="d-flex addBuyDiv justify-content-center px-1 "
                                // style={{ width: "100%" }}
                              >
                                {/* <IonCol
                                sizeMd="3"
                                sizeXs="6"
                                className="addBuyCol ion-text-end"
                              > */}
                                {/* <div className=""> */}
                                <div className=" m-0 p-0 m-1">
                                  {this.state.AddedTocart ? (
                                    <IonButton
                                      className="saved buttonMobile m-0"
                                      style={{ width: "100%" }}
                                      onClick={(e) => {
                                        this.props.UpdateQuantity(
                                          this.state.productInfo.MOE_item,
                                          0
                                        );
                                      }}
                                    >
                                      Added to Cart{" "}
                                      <span>
                                        <IonIcon
                                          icon={checkmarkOutline}
                                          style={{
                                            fontSize: "20px",
                                            marginLeft: "10px",
                                            verticalAlign: " baseline",
                                          }}
                                        />
                                      </span>
                                    </IonButton>
                                  ) : (
                                    <IonButton
                                      className="cashmere buttonMobile m-0"
                                      style={{ width: "100%" }}
                                      onClick={(e) =>
                                        this.AddCart(
                                          e,
                                          this.state.productInfo.pricing[0]
                                            .ECommerceCost,
                                          this.state.productInfo.MOE_item
                                        )
                                      }
                                    >
                                      Add to Cart
                                    </IonButton>
                                  )}
                                </div>
                                {/* </IonCol> */}
                                {/* <IonCol
                                sizeMd="3"
                                sizeXs="6"
                                className="addBuyCol"
                              > */}
                                <div className=" hiddenBuyNow1 p-0 m-1">
                                  <IonButton
                                    className="charcoal m-0"
                                    style={{ width: "100%" }}
                                    onClick={(e) => {
                                      if (this.state.AddedTocart) {
                                        this.setState({ newBuyNow: false });
                                        this.props.history.push("/Cart");
                                      } else {
                                        this.AddCart(
                                          e,
                                          this.state.productInfo.pricing[0]
                                            .ECommerceCost,
                                          this.state.productInfo.MOE_item
                                        );
                                        this.setState({ newBuyNow: true });
                                      }
                                      // this.setState({ showModalBuyNow: true });
                                      // this.handleCheckOut();
                                    }}
                                  >
                                    Buy Now
                                  </IonButton>
                                </div>
                                {/* </div> */}

                                {/* </IonCol> */}
                                {/* <IonCol
                                sizeMd="3"
                                sizeXs="12"
                                className="addBuyCol mt-1 mt-md-0"
                              > */}
                                <div className="m-1  ">
                                  <IonButton
                                    style={{ width: "100%" }}
                                    className="cashmere buttonMobile p-0  m-0"
                                    onClick={(e) =>
                                      this.setState({ showModal: true })
                                    }
                                  >
                                    {" "}
                                    Save to project
                                  </IonButton>
                                </div>

                                {/* <IonSelect
                                      className="selectSort cashmereSelect addBuyCol "
                                      value={this.state.selectProject}
                                      placeholder="Save to project"
                                      // interface={
                                      //   this.state.menuClose
                                      //     ? "action-sheet"
                                      //     : "popover"
                                      // }
                                      selectedText={[]}
                                      // interface="popover"
                                      multiple={true}
                                      onIonChange={(e) => {
                                        this.setState(
                                          {
                                            selectProject: e.detail.value,
                                          },
                                          () => {
                                            
                                          }
                                        );
                                      }}
                                      style={{
                                        maxWidth: " max-content",
                                        color: "#506372",
                                        paddingLeft: "10px",
                                      }}
                                    >
                                      {this.state.allProjects
                                        ? this.state.allProjects.map(
                                            (project) => (
                                            )
                                          )
                                        : null}
                                    </IonSelect> */}

                                {}
                              </div>
                              <div className="hiddenBuyNow m-1 p-0">
                                <IonButton
                                  className="charcoal hiddenBuyNowButton m-0"
                                  onClick={(e) => {
                                    this.setState({ showModalBuyNow: true });

                                    // this.handleCheckOut();
                                  }}
                                  style={{ width: "100%" }}
                                >
                                  Buy Now
                                </IonButton>
                              </div>
                              {/* <IonGrid>
                                <IonRow className="hiddenBuyNow">
                                  <IonCol size="6">
                                    {" "}
                                    {this.state.AddedTocart ? (
                                      <IonButton
                                        className="saved m-0"
                                        style={{ width: "100%" }}
                                        onClick={(e) => {
                                          this.props.UpdateQuantity(
                                            this.state.productInfo
                                              .MOE_item,
                                            0
                                          );
                                        }}
                                      >
                                        Added to Cart{" "}
                                        <span>
                                          <IonIcon
                                            icon={checkmarkOutline}
                                            style={{
                                              fontSize: "20px",
                                              marginLeft: "10px",
                                              verticalAlign: " baseline",
                                            }}
                                          />
                                        </span>
                                      </IonButton>
                                    ) : (
                                      <IonButton
                                        className="cashmere m-0"
                                        style={{ width: "100%" }}
                                        onClick={(e) =>
                                          this.AddCart(
                                            e,
                                            this.state.productInfo
                                              .pricing[0].ECommerceCost,
                                            this.state.productInfo
                                              .MOE_item
                                          )
                                        }
                                      >
                                        Add to Cart
                                      </IonButton>
                                    )}
                                  </IonCol>
                                  <IonCol size="6">
                                    {" "}
                                    <IonButton
                                      style={{ width: "100%" }}
                                      className="cashmere  p-0  m-0"
                                      onClick={(e) =>
                                        this.setState({ showModal: true })
                                      }
                                    >
                                      {" "}
                                      Save to project
                                    </IonButton>
                                  </IonCol>
                                  <IonCol size="12">
                                    {" "}
                                    <div className="hiddenBuyNow m-1 p-0">
                                      <IonButton
                                        className="charcoal  m-0"
                                        style={{ width: "100%" }}
                                      >
                                        Buy Now
                                      </IonButton>
                                    </div>
                                  </IonCol>
                                </IonRow>{" "}
                              </IonGrid>
                               */}
                              {/* </IonCol> */}
                              {/* <IonCol
                                sizeMd="6"
                                sizeXs="6"
                                className="addBuyCol"
                              >
                              <IonButton
                              className="cashmere  m-0"
                              onClick={(e) =>
                                this.AddCart(
                                  e,
                                  this.state.productInfo.pricing[0]
                                    .ECommerceCost,
                                  this.state.productInfo.MOE_item
                                )
                              }
                            >
                              SAVE TO PROJECT
                            </IonButton>
                            </IonCol> */}
                            </IonCol>
                          )
                          //  : null
                        }
                      </>
                    )}
                  </IonRow>
                </>
                {/* ))} */}
              </IonRow>
            ) : null}{" "}
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
  savedItem: state.project.savedItem,
  saveItemToProjectMessage: state.project.saveItemToProjectMessage,
  saveItemToProjectSuccess: state.project.saveItemToProjectSuccess,
  removedItem: state.project.removedItem,
  removeSavedItemsMessage: state.project.removeSavedItemsMessage,
  removeSavedItemsSuccess: state.project.removeSavedItemsSuccess,
  getSavedItemsMessage: state.project.getSavedItemsMessage,
  getSavedItemsSuccess: state.project.getSavedItemsSuccess,
  addtoCart: state.cart.addtoCart,
  getItemFromCart: state.cart.getItemFromCart,
  updateQuantity: state.cart.updateQuantity,
  likeItems: state.project.likeItems,
  passItems: state.project.passItems,
  getAllProjects: state.project.getAllProjects,
  paymentReducer: state.payment,
  getProjectswithSavedItem: state.project.getProjectswithSavedItem,
  affirm: state.affirm,
  getProduct: state.inventory.getProduct,
  tax: state.tax,
  getUser: state.user.getUser,
});
export default connect(mapStateToProps, {
  logout,
  SaveToProject,
  RemoveFromProject,
  AddToCart,
  GetCartItem,
  UpdateQuantity,
  GetSavedItems,
  LikeItem,
  PassItem,
  GetAllProjects,
  GetProjectswithSavedItem,
  BuyNow,
  GetProduct,
  AddToOrder,
  AffirmConfirmationBuyNow,
  GetUser,
  GetTaxes,
})(ViewSingleItem);
