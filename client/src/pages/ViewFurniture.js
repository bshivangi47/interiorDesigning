import {
  IonContent,
  IonGrid,
  IonCard,
  IonButtons,
  IonModal,
  IonCardContent,
  IonRow,
  IonCol,
  IonImg,
  IonLabel,
  IonCardSubtitle,
  IonText,
  IonButton,
  IonInput,
  IonItem,
  IonIcon,
  IonChip,
  IonSearchbar,
  IonTabButton,
  IonTabBar,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonToggle,
  IonCardTitle,
  IonSpinner,
  IonAlert,
  IonCardHeader,
} from "@ionic/react";

import React from "react";
import "./Page.css";
import { closeOutline, checkmarkOutline } from "ionicons/icons";
import image from "../images/backgroundimage.jpg";
import sofa from "../images/sofa.jpg";
import lRoom from "../images/3d-contemporary-living-room-interior-modern-furniture.jpg";
import { Link } from "react-router-dom";
import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";
import sort from "../images/sort.svg";
import filter from "../images/filter.svg";
import ToolbarExplore from "../components/ToolbarExplore";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/userActions";
import { GetProducts, SearchProducts } from "../actions/inventoryActions";
import {
  SaveToProject,
  GetSavedItems,
  RemoveFromProject,
} from "../actions/projectActions";
import ToolbarProjects from "../components/ToolbarProjects";
import Pagination from "react-js-pagination";

class ViewFurniture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      loading: true,
      menuClose: false,
      showModal: false,
      page: 1,
      SavedItems: [],
      selectSort: "priceLtoH",
      inventoryItems: [],
      totalItems: 0,
      searchDecor: false,
      showAlert: false,
      alertMsg: "",
      savedItems: false,
      likedItems: false,
      passedItems: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let projectID;
    let category;
    let client;
    let room;
    console.log("-=-=-=-=-=-=-=-=props-=-=-=-=", this.props);
    if (this.props.location.state && this.props.location.state.category) {
      category = this.props.location.state.category;

      console.log("-=-=-=-=-=-=-=-=category-=-=-=-=", category);
      this.setState({
        category: category,
      });
      if (window.location.pathname == "/viewDecor") {
        projectID = params.get("project");
        client = params.get("client");
        room = params.get("room");
        this.setState({
          projectID: projectID,
          searchDecor: true,
          client: client,
          room: room,
        });
        const data = {
          projectId: atob(params.get("project")),
          room: room,
        };
        this.props.GetSavedItems(data);
        this.props.GetProducts(category, 0);
      }
      if (window.location.pathname == "/viewFurniture") {
        this.props.GetProducts(category, 0);
      }

      console.log("category-=-=-=-=", category);
    }

    if (window.location.pathname == "/viewsavedItems") {
      projectID = params.get("project");
      client = params.get("client");
      room = params.get("room");
      this.setState({
        projectID: projectID,
        savedItems: true,

        client: client,
        room: room,
      });
      const data = {
        projectId: atob(projectID),

        room: room,
      };
      this.props.GetSavedItems(data);
    }
    if (window.location.pathname == "/viewlikedItems") {
      projectID = params.get("project");
      client = params.get("client");
      room = params.get("room");
      this.setState({
        projectID: projectID,
        likedItems: true,

        client: client,
        room: room,
      });
      const data = {
        projectId: atob(projectID),
        // category: category,
        room: room,
      };
      this.props.GetSavedItems(data);
    }
    if (window.location.pathname == "/viewpassedItems") {
      projectID = params.get("project");
      client = params.get("client");
      room = params.get("room");
      this.setState({
        projectID: projectID,
        passedItems: true,

        client: client,
        room: room,
      });
      const data = {
        projectId: atob(projectID),

        room: room,
      };
      this.props.GetSavedItems(data);
    }

    this.resize();
  }
  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      console.log("ERROEMSG___", this.props.error.id);

      // if (
      //   this.props.error.id == "GET_PRODUCTS_ERROR" ||
      //   this.props.error.id == "SAVE_ITEM_TO_PROJECT_ERROR"
      // ) {
      console.log("ERROEMSG___", this.props.error);

      if (this.props.error.message.message == "Unauthenticated") {
        this.props.logout();
      } else {
        this.setState({
          alertMsg: this.props.error.message.message,
          showAlert: true,
        });
      }
      // }
    }
    if (this.props.allProducts != prevProps.allProducts) {
      if (this.props.allProducts.success == true) {
        this.setState({
          inventoryItems: this.props.allProducts.message,
          totalItems: this.props.allProducts.totalDocs,
          loading: false,
        });
      }
    }
    if (this.props.getSavedItemsMessage != prevProps.getSavedItemsMessage) {
      if (
        this.props.getSavedItemsSuccess == true &&
        (this.state.savedItems ||
          this.state.likedItems ||
          this.state.passedItems)
      ) {
        this.setState({
          // inventoryItems: this.props.getSavedItemsMessage,
          SavedItems: this.props.getSavedItemsMessage,

          loading: false,
        });
      } else {
        this.setState({
          SavedItems: this.props.getSavedItemsMessage,
          // loading: false,
        });
      }
    }
    if (this.props.savedItem != prevProps.savedItem) {
      if (this.props.saveItemToProjectSuccess == true) {
        console.log(
          "saveItemToProjectMessage-=-=-=",
          this.props.saveItemToProjectMessage
        );
      }
      const data = {
        projectId: atob(this.state.projectID),

        room: this.state.room,
      };
      this.props.GetSavedItems(data);
    }
    if (this.props.removedItem != prevProps.removedItem) {
      if (this.props.removeSavedItemsSuccess == true) {
        console.log(
          "saveItemToProjectMessage-=-=-=",
          this.props.removeSavedItemsSuccess
        );
      }
      const data = {
        projectId: atob(this.state.projectID),
        category: this.state.category,
        room: this.state.room,
      };
      this.props.GetSavedItems(data);
    }
    if (this.props.searchProducts != prevProps.searchProducts) {
      console.log("this.props.searchProducts", this.props.searchProducts);
      // if (this.props.searchProducts.success) {
      if (this.props.searchProducts.success == true) {
        this.setState({
          inventoryItems: this.props.searchProducts.message,
          totalItems: this.props.searchProducts.totalDocs,
          loading: false,
        });
      }
      // }
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
  addToProject = (item) => {
    const data = {
      projectId: atob(this.state.projectID),
      room: this.state.room,
      MOE_item: item,
    };
    this.props.SaveToProject(data);
    console.log(
      "add item with itemID = " + item + "to projectid =",
      this.state.projectID
    );
  };
  RemovefromProject = (item) => {
    const data = {
      projectId: atob(this.state.projectID),
      room: this.state.room,
      MOE_item: item,
    };
    this.props.RemoveFromProject(data);
    console.log(
      "add item with itemID = " + item + "to projectid =",
      this.state.projectID
    );
    console.log(
      "remove item with itemID = " + item + "to projectid =",
      this.state.projectID
    );
  };
  likeItem = (item) => {
    console.log(
      "pass item with itemID = " + item + "to projectid =",
      this.state.projectID
    );
  };
  passItem = (item) => {
    console.log(
      "like item with itemID = " + item + "to projectid =",
      this.state.projectID
    );
  };

  compare = (a, b) => {
    // Use toUpperCase() to ignore character casing

    const bandA =
      parseFloat(a.pricing[0].Map) - parseFloat(a.pricing[0].ECommerceCost);
    const bandB =
      parseFloat(b.pricing[0].Map) - parseFloat(b.pricing[0].ECommerceCost);

    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
  };

  handlePageChange(pageNumberpaginate) {
    console.log(
      "pageNumberpaginate",
      pageNumberpaginate,
      "this.state.category",
      this.state.category
    );
    this.setState({ page: pageNumberpaginate, loading: true });
    this.props.GetProducts(this.state.category, pageNumberpaginate - 1);
  }
  SearchFunction = () => {
    if (this.state.searchTerm != "") {
      if (this.props.location.state && this.props.location.state.category) {
        if (
          this.state.searchDecor == true ||
          window.location.pathname == "/viewFurniture"
        ) {
          this.props.SearchProducts(
            this.state.category,
            0,
            this.state.searchTerm
          );
        }
      }
    } else {
      if (this.props.location.state && this.props.location.state.category) {
        if (
          this.state.searchDecor == true ||
          window.location.pathname == "/viewFurniture"
        ) {
          this.props.GetProducts(this.state.category, 0);
        }
      }
    }
  };
  render() {
    let userType,
      inventoryProducts = [];
    if (this.state.savedItems) {
      inventoryProducts = this.state.SavedItems;
    } else if (this.state.likedItems) {
      inventoryProducts = this.state.SavedItems.filter(
        (items) => items.liked == true
      );
    } else if (this.state.passedItems) {
      inventoryProducts = this.state.SavedItems.filter(
        (items) => items.liked == false
      );
    } else {
      inventoryProducts = this.state.inventoryItems;
      // inventoryProducts = this.state.inventoryItems.sort(this.compare);
    }
    if (localStorage.getItem("user")) {
      var token = JSON.parse(localStorage.getItem("user"));
      userType = token.role;
    }

    return (
      <>
        <ToolbarMobile />
        {this.state.searchDecor ||
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
                  <IonLabel style={{ textAlign: "center", fontSize: "12.9px" }}>
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
                  <IonLabel style={{ textAlign: "center", fontSize: "12.9px" }}>
                    {this.state.client}'s project
                  </IonLabel>
                </IonChip>
              </Link>
            </IonButtons>
          </IonToolbar>
        ) : (
          <ToolbarExplore />
        )}

        <BottomMenu />

        <IonAlert
          isOpen={this.state.showAlert}
          onDidDismiss={() => {
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
                <IonTitle>Add Filters</IonTitle>

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
              <div class="filterModal">
                <ul class="nav nav-tabs">
                  <li class="nav-item  ">
                    <a data-toggle="tab" href="#price" class="nav-link active">
                      Price
                    </a>
                  </li>
                  <li class="nav-item">
                    <a data-toggle="tab" href="#color" class="nav-link ">
                      Color
                    </a>
                  </li>
                  <li class="nav-item">
                    <a data-toggle="tab" href="#Brand" class="nav-link ">
                      Brand
                    </a>
                  </li>
                  <li class="nav-item">
                    <a data-toggle="tab" href="#Size" class="nav-link ">
                      Size
                    </a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div id="price" class="tab-pane   active">
                    <h3>Price</h3>{" "}
                    <IonItem lines="none">
                      <IonLabel>$0-500</IonLabel>
                      <IonToggle
                        color="medium"
                        checked={this.state.checked500}
                        onIonChange={(e) =>
                          this.setState({ checked500: e.detail.checked })
                        }
                      />
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>$500-1000</IonLabel>
                      <IonToggle
                        color="medium"
                        checked={this.state.checked1000}
                        onIonChange={(e) =>
                          this.setState({ checked1000: e.detail.checked })
                        }
                      />
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>$1000-1500</IonLabel>
                      <IonToggle
                        color="medium"
                        checked={this.state.checked1500}
                        onIonChange={(e) =>
                          this.setState({ checked1500: e.detail.checked })
                        }
                      />
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>$1500-2000</IonLabel>
                      <IonToggle
                        color="medium"
                        checked={this.state.checked2000}
                        onIonChange={(e) =>
                          this.setState({ checked2000: e.detail.checked })
                        }
                      />
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>$2000-3000</IonLabel>
                      <IonToggle
                        color="medium"
                        checked={this.state.checked3000}
                        onIonChange={(e) =>
                          this.setState({ checked3000: e.detail.checked })
                        }
                      />
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>$3000-4000</IonLabel>
                      <IonToggle
                        color="medium"
                        checked={this.state.checked4000}
                        onIonChange={(e) =>
                          this.setState({ checked4000: e.detail.checked })
                        }
                      />
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>$4000-5000</IonLabel>
                      <IonToggle
                        color="medium"
                        checked={this.state.checked5000}
                        onIonChange={(e) =>
                          this.setState({ checked5000: e.detail.checked })
                        }
                      />
                    </IonItem>{" "}
                    <IonItem lines="none">
                      <IonLabel>$5000+</IonLabel>
                      <IonToggle
                        color="medium"
                        checked={this.state.checked5000plus}
                        onIonChange={(e) =>
                          this.setState({ checked5000plus: e.detail.checked })
                        }
                      />
                    </IonItem>
                  </div>
                  <div id="color" class="tab-pane fade">
                    <h3>Color</h3>
                    <p>Some content in menu 1.</p>
                  </div>
                  <div id="Brand" class="tab-pane fade">
                    <h3>Brand</h3>
                    <p>Some content in menu 2.</p>
                  </div>
                  <div id="Size" class="tab-pane fade">
                    <h3>Size</h3>
                    <p>Some content in size .</p>
                  </div>
                </div>
              </div>
            </IonContent>
            <IonFooter>
              <ion-row class="ion-justify-content-end filterEndRow ">
                <IonButton
                  className="charcoal mr-3"
                  onClick={() => this.setState({ showModal: false })}
                >
                  Clear Filters
                </IonButton>
                <IonButton
                  className="cashmere"
                  onClick={() => this.setState({ showModal: false })}
                >
                  Apply Filters
                </IonButton>
              </ion-row>
            </IonFooter>
          </IonModal>

          <IonGrid
            className={
              this.state.searchDecor ||
              this.state.savedItems ||
              this.state.likedItems ||
              this.state.passedItems
                ? "grid mobilemargin"
                : "grid mobilemarginwithPRojectNAv"
            }
          >
            <IonRow>
              <IonCol size="12">
                {this.state.searchDecor ||
                this.state.savedItems ||
                this.state.likedItems ||
                this.state.passedItems ? (
                  <>
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
                    <IonGrid>
                      <IonRow>
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
                      </IonRow>{" "}
                    </IonGrid>
                  </>
                ) : null}
              </IonCol>
            </IonRow>
            {this.state.savedItems ||
            this.state.likedItems ||
            this.state.passedItems ? null : (
              <IonRow class="ion-justify-content-between">
                <IonCol
                  sizeXl="6"
                  sizeLg="6"
                  sizeMd="12"
                  sizeSm="12"
                  sizeXs="12"
                  className=""
                >
                  <IonRow class="ion-justify-content-between">
                    <IonCol
                      sizeXl="9"
                      sizeLg="8"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonSearchbar
                        className="Searchbar"
                        onIonChange={(e) => {
                          this.setState({ searchTerm: e.target.value });
                        }}
                        value={this.state.searchTerm}
                        placeholder="Search"
                      />
                    </IonCol>
                    <IonCol
                      sizeXl="3"
                      sizeLg="4"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                      className="d-flex align-items-center"
                    >
                      <IonButton
                        className="SearchBtn"
                        onClick={(e) => this.SearchFunction()}
                      >
                        Search
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCol>
                <IonCol
                  sizeXl="6"
                  sizeLg="6"
                  sizeMd="12"
                  sizeSm="12"
                  sizeXs="12"
                  className="filterCol d-flex"
                >
                  {/* <IonChip
                  outline
                  className=" mt-3 mr-lg-3"
                  onClick={() => {
                    this.setState({ showModal: true });
                  }}
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                >
                  <IonItem>
                    <IonImg src={filter} className=" filterIcon mr-1" />
                    <IonLabel
                      style={{ flex: "none", color: "#506372" }}
                      className="filterLAbel"
                    >
                      Filter
                    </IonLabel>
                  </IonItem>
                </IonChip>
                */}
                  {/* <IonChip
                  className="sortSelectChip mt-3"
                  outline
                  onClick={(e) =>
                    this.setState({ showSortSheet: true, event: e.nativeEvent })
                  }
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                >
                  <IonItem>
                    <IonImg src={sort} className="sortIcon mr-1" />
                    <IonLabel
                      style={{ flex: "none", color: "#506372" }}
                      className="sortLAbel  "
                    >
                      Sort:
                    </IonLabel>
                    <ion-select
                      className="selectSort sortLAbel"
                      value={this.state.selectSort}
                      interface={
                        this.state.menuClose ? "action-sheet" : "popover"
                      }
                      onIonChange={(e) => {
                        this.setState({
                          selectSort: e.detail.value,
                        });
                      }}
                      style={{
                        maxWidth: " max-content",
                        color: "#506372",
                        paddingLeft: "10px",
                      }}
                    >
                      <ion-select-option value="priceLtoH">
                        Price Low to High
                      </ion-select-option>
                      <ion-select-option value="priceHtoL">
                        Price High to Low
                      </ion-select-option>
                      <ion-select-option value="new">New</ion-select-option>
                      <ion-select-option value="highestRated">
                        Highest Rated
                      </ion-select-option>
                      <ion-select-option value="a-z">A-Z</ion-select-option>
                      <ion-select-option value="z-a" lines="false">
                        Z-A
                      </ion-select-option>
                    </ion-select>
                  </IonItem>
                </IonChip>
              */}
                </IonCol>
              </IonRow>
            )}{" "}
            {this.state.loading ? (
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
            ) : inventoryProducts.length != 0 ? (
              <IonRow className="">
                {inventoryProducts.map((items, i) => {
                  var category =
                    this.state.savedItems ||
                    this.state.likedItems ||
                    this.state.passedItems
                      ? items.productinfo.grouping.category
                          .toLowerCase()
                          .split(">")
                      : items.grouping.category.toLowerCase().split(">");
                  let found = this.state.SavedItems.some(
                    (el) => el.MOE_item === items.MOE_item
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
                              to={
                                this.state.searchDecor
                                  ? {
                                      pathname: "/viewDecorItem",
                                      search: `?item=${items.MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                      state: { product: items },
                                    }
                                  : this.state.savedItems
                                  ? {
                                      pathname: "/viewsavedItem",
                                      search: `?item=${items.MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                      state: { product: items },
                                    }
                                  : this.state.likedItems
                                  ? {
                                      pathname: "/viewlikedItem",
                                      search: `?item=${items.MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                      state: { product: items },
                                    }
                                  : this.state.passedItems
                                  ? {
                                      pathname: "/viewpassedItem",
                                      search: `?item=${items.MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                      state: { product: items },
                                    }
                                  : {
                                      pathname: "/viewItem",
                                      search: `?item=${items.MOE_item}`,
                                      state: { product: items },
                                    }
                              }
                              className="furnitureLink"
                            >
                              <IonImg
                                src={
                                  this.state.savedItems ||
                                  this.state.likedItems ||
                                  this.state.passedItems
                                    ? items.productinfo.productImagesLinks[0]
                                    : items.productImagesLinks[0]
                                }
                                onError={(e) => {
                                  console.log("onError-=--=-=", e);
                                  e.target.onerror = null;
                                  e.target.src =
                                    items.productImagesLinks[1] ||
                                    items.productinfo.productImagesLinks[0];
                                }}
                                alt={
                                  this.state.savedItems ||
                                  this.state.likedItems ||
                                  this.state.passedItems
                                    ? items.productinfo.grouping.color +
                                      " " +
                                      items.productinfo.grouping.style +
                                      " " +
                                      category[category.length - 1].slice(
                                        category[category.length - 1].length - 2
                                      )
                                    : items.grouping.color +
                                      " " +
                                      items.grouping.style +
                                      " " +
                                      category[category.length - 1].slice(
                                        category[category.length - 1].length - 2
                                      )
                                }
                                className="furniture"
                              />
                              <div className="priceDiv d-flex ion-justify-content-between">
                                <IonCardSubtitle
                                  className="ion-text-nowrap mt-1 DetailsSingleItem"
                                  style={{ fontWeight: "500" }}
                                >
                                  {this.state.savedItems ||
                                  this.state.likedItems ||
                                  this.state.passedItems
                                    ? items.productinfo.grouping.color +
                                      " " +
                                      items.productinfo.grouping.style.toLowerCase() +
                                      " " +
                                      category[category.length - 1].slice(0, -1)
                                    : items.grouping.color +
                                      " " +
                                      items.grouping.style.toLowerCase() +
                                      " " +
                                      category[category.length - 1].slice(
                                        0,
                                        -1
                                      )}
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
                              {/* <div className="priceDiv d-flex ion-justify-content-between"> */}
                              <IonCardSubtitle
                                style={{ fontWeight: "300" }}
                                className=" DetailsSingleItem"
                              >
                                Retail Price:
                                {userType !== "designer"
                                  ? ` $${items.pricing[0].Map}`
                                  : ` $${items.pricing[0].Map}`}
                              </IonCardSubtitle>
                              {userType !== "designer" ? null : (
                                <IonCardSubtitle
                                  style={{ fontWeight: "300" }}
                                  className="d-flex ion-align-items-end DetailsSingleItem"
                                >
                                  Your Price:{" "}
                                  {` $${items.pricing[0].ECommerceCost}`}
                                </IonCardSubtitle>
                              )}
                              {/* </div> */}
                              {userType !== "designer" ? null : (
                                <IonCardSubtitle
                                  style={{ fontWeight: "400", color: "green" }}
                                  className="DetailsSingleItem"
                                >
                                  Your commission:
                                  {` $${
                                    parseFloat(items.pricing[0].Map) -
                                    parseFloat(items.pricing[0].ECommerceCost)
                                  }+
                                `}
                                </IonCardSubtitle>
                              )}
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
                                {items.productinfo
                                  ? items.productinfo.SEO.featuresBenefits[0] +
                                    ". " +
                                    items.productinfo.SEO.featuresBenefits[1] +
                                    ". " +
                                    items.productinfo.SEO.featuresBenefits[2] +
                                    ". " +
                                    items.productinfo.SEO.featuresBenefits[3] +
                                    ". "
                                  : items.SEO.featuresBenefits[0] +
                                    ". " +
                                    items.SEO.featuresBenefits[1] +
                                    ". " +
                                    items.SEO.featuresBenefits[2] +
                                    ". " +
                                    items.SEO.featuresBenefits[3] +
                                    ". "}
                              </IonText>{" "}
                            </Link>
                            {
                              this.state.searchDecor ? (
                                !found ? (
                                  <div>
                                    <IonButton
                                      className="cashmere savetoprojectButtom"
                                      style={{ margin: 0 }}
                                      onClick={(e) =>
                                        this.addToProject(items.MOE_item)
                                      }
                                    >
                                      Save to Project
                                    </IonButton>
                                  </div>
                                ) : (
                                  <IonButton
                                    className="saved savetoprojectButtom "
                                    style={{ margin: 0 }}
                                    onClick={(e) =>
                                      this.RemovefromProject(items.MOE_item)
                                    }
                                  >
                                    Saved{" "}
                                    <span>
                                      <IonIcon
                                        icon={checkmarkOutline}
                                        className="savetoprojectButtom"
                                        style={{
                                          // fontSize: "20px",
                                          marginLeft: "5px",
                                          verticalAlign: " baseline",
                                        }}
                                      />
                                    </span>
                                  </IonButton>
                                )
                              ) : this.state.savedItems ? (
                                <div>
                                  <IonButton
                                    className="saved savetoprojectButtom"
                                    style={{ margin: 0 }}
                                    onClick={(e) =>
                                      this.RemovefromProject(items.MOE_item)
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
                                </div>
                              ) : this.state.likedItems ? null : this.state // </div> //   </IonButton> //     Pass //   > //     onClick={(e) => this.likeItem(items.MOE_item)} //     style={{ margin: 0 }} //     className="cashmere savetoprojectButtom" //   <IonButton // <div>
                                  .passedItems ? null : null // </div> //   </IonButton> //     Like //   > //     onClick={(e) => this.passItem(items.MOE_item)} //     style={{ margin: 0 }} //     className="cashmere savetoprojectButtom" //   <IonButton // <div>
                            }
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                    );
                  }
                })}
                {inventoryProducts.map((items, i) => {
                  let found = this.state.SavedItems.some(
                    (el) => el.MOE_item === items.MOE_item
                  );

                  var category =
                    this.state.savedItems ||
                    this.state.likedItems ||
                    this.state.passedItems
                      ? items.productinfo.grouping.category
                          .toLowerCase()
                          .split(">")
                      : items.grouping.category.toLowerCase().split(">");
                  if (
                    items.InventoryDetails.Stock_WA == 0 &&
                    items.InventoryDetails.Stock_NJ == 0
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
                              to={
                                this.state.searchDecor
                                  ? {
                                      pathname: "/viewDecorItem",
                                      search: `?item=${items.MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                    }
                                  : this.state.savedItems
                                  ? {
                                      pathname: "/viewsavedItem",
                                      search: `?item=${items.MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                    }
                                  : this.state.likedItems
                                  ? {
                                      pathname: "/viewlikedItem",
                                      search: `?item=${items.MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                    }
                                  : this.state.passedItems
                                  ? {
                                      pathname: "/viewpassedItem",
                                      search: `?item=${items.MOE_item}&client=${this.state.client}&room=${this.state.room}&project=${this.state.projectID}`,
                                    }
                                  : {
                                      pathname: "/viewItem",
                                      search: `?item=${items.MOE_item}`,
                                      state: { product: items },
                                    }
                              }
                              className="furnitureLink"
                            >
                              <IonImg
                                src={
                                  this.state.savedItems ||
                                  this.state.likedItems ||
                                  this.state.passedItems
                                    ? items.productinfo.productImagesLinks[0]
                                    : items.productImagesLinks[0]
                                }
                                onError={(e) => {
                                  console.log("onError-=--=-=", e);
                                  e.target.onerror = null;
                                  e.target.src = items.productImagesLinks[1];
                                }}
                                alt={
                                  this.state.savedItems ||
                                  this.state.likedItems ||
                                  this.state.passedItems
                                    ? items.productinfo.MOE_productName
                                    : items.MOE_productName
                                }
                                className="furniture"
                              />
                              <IonCardSubtitle
                                className="ion-text-nowrap mt-1 DetailsSingleItem"
                                style={{ fontWeight: "500" }}
                              >
                                {this.state.savedItems ||
                                this.state.likedItems ||
                                this.state.passedItems
                                  ? items.productinfo.grouping.color +
                                    " " +
                                    items.productinfo.grouping.style.toLowerCase() +
                                    " " +
                                    category[category.length - 1].slice(0, -1)
                                  : items.grouping.color +
                                    " " +
                                    items.grouping.style.toLowerCase() +
                                    " " +
                                    category[category.length - 1].slice(0, -1)}
                              </IonCardSubtitle>
                              {/* <div className="priceDiv d-flex ion-justify-content-between"> */}
                              <IonCardSubtitle
                                style={{ fontWeight: "300" }}
                                className=" DetailsSingleItem"
                              >
                                Retail Price:
                                {userType !== "designer"
                                  ? ` $${items.pricing[0].Map}`
                                  : ` $${items.pricing[0].Map}`}
                              </IonCardSubtitle>
                              {userType !== "designer" ? null : (
                                <IonCardSubtitle
                                  style={{ fontWeight: "300" }}
                                  className="DetailsSingleItem"
                                >
                                  Your Price:
                                  {` $${items.pricing[0].ECommerceCost}`}
                                </IonCardSubtitle>
                              )}
                              {/* </div> */}
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
                                {this.state.savedItems ||
                                this.state.likedItems ||
                                this.state.passedItems
                                  ? items.productinfo.SEO.featuresBenefits[0] +
                                    ". " +
                                    items.productInfo.SEO.featuresBenefits[1] +
                                    ". " +
                                    items.productInfo.SEO.featuresBenefits[2] +
                                    ". " +
                                    items.productInfo.SEO.featuresBenefits[3] +
                                    ". "
                                  : items.SEO.featuresBenefits[0] +
                                    ". " +
                                    items.SEO.featuresBenefits[1] +
                                    ". " +
                                    items.SEO.featuresBenefits[2] +
                                    ". " +
                                    items.SEO.featuresBenefits[3] +
                                    ". "}
                              </IonText>{" "}
                            </Link>
                            {this.state.searchDecor ? (
                              !found ? (
                                <div>
                                  <IonButton
                                    className="cashmere savetoprojectButtom"
                                    style={{ margin: 0 }}
                                    onClick={(e) =>
                                      this.addToProject(items.MOE_item)
                                    }
                                  >
                                    Save to Project
                                  </IonButton>
                                </div>
                              ) : (
                                <IonButton
                                  className="saved "
                                  style={{ margin: 0 }}
                                  onClick={(e) =>
                                    this.RemovefromProject(items.MOE_item)
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
                              )
                            ) : this.state.savedItems ? (
                              <div>
                                <IonButton
                                  className="saved savetoprojectButtom"
                                  style={{ margin: 0 }}
                                  onClick={(e) =>
                                    this.RemovefromProject(items.MOE_item)
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
                              </div>
                            ) : this.state.likedItems ? (
                              <div>
                                <IonButton
                                  className="cashmere savetoprojectButtom"
                                  style={{ margin: 0 }}
                                  onClick={(e) => this.likeItem(items.id)}
                                >
                                  Pass
                                </IonButton>
                              </div>
                            ) : this.state.passedItems ? (
                              <div>
                                <IonButton
                                  className="cashmere savetoprojectButtom"
                                  style={{ margin: 0 }}
                                  onClick={(e) => this.passItem(items.id)}
                                >
                                  Like
                                </IonButton>
                              </div>
                            ) : null}
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                    );
                  }
                })}
              </IonRow>
            ) : (
              <IonRow className="">
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
                    className="projectCards my-2"
                    style={{
                      textAlign: "center",

                      margin: "auto",
                    }}
                  >
                    <IonCardHeader>
                      <IonCardTitle class="projectCardTitle">
                        {this.state.savedItems
                          ? "No saved items found"
                          : this.state.likedItems
                          ? `No liked items by ${this.state.client} found`
                          : this.state.passedItems
                          ? `No passed items by ${this.state.client} found`
                          : "No products found"}{" "}
                      </IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
            )}
            {this.state.savedItems ||
            this.state.likedItems ||
            this.state.passedItems ? null : (
              <div style={{ textAlign: "center" }}>
                <Pagination
                  activePage={this.state.page}
                  itemsCountPerPage={12}
                  totalItemsCount={this.state.totalItems}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                />
              </div>
            )}
          </IonGrid>
        </IonContent>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  error: state.error,

  user: state.user,
  saveItemToProjectMessage: state.project.saveItemToProjectMessage,
  saveItemToProjectSuccess: state.project.saveItemToProjectSuccess,
  savedItem: state.project.savedItem,
  getSavedItemsMessage: state.project.getSavedItemsMessage,
  getSavedItemsSuccess: state.project.getSavedItemsSuccess,
  removedItem: state.project.removedItem,
  removeSavedItemsMessage: state.project.removeSavedItemsMessage,
  removeSavedItemsSuccess: state.project.removeSavedItemsSuccess,
  searchProducts: state.inventory.searchProducts,
  allProducts: state.inventory.allProducts,
});
export default connect(mapStateToProps, {
  GetProducts,
  logout,
  SaveToProject,
  GetSavedItems,
  RemoveFromProject,
  SearchProducts,
})(ViewFurniture);
