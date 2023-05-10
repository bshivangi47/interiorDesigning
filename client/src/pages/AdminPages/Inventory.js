import {
  IonAlert,
  IonGrid,
  IonButton,
  IonInput,
  IonItem,
  IonText,
  IonCheckbox,
  IonSelect,
  IonRow,
  IonCol,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonLabel,
  IonContent,
  IonCardHeader,
  IonBackdrop,
  IonLoading,
} from "@ionic/react";
// import { menuSharp, today } from "ionicons/icons";
import React from "react";
import "../Page.css";
import { withRouter } from "react-router";
import Toolbar from "../../components/Toolbar";
import BottomMenu from "../../components/BottomMenu";
import ToolbarMobile from "../../components/ToolbarMobile";
import ToolbarProjects from "../../components/ToolbarProjects";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  UploadProductCSV,
  UploadInventoryCSV,
} from "../../actions/adminActions";
import { logout } from "../../actions/userActions";

class NewProject extends React.Component {
  constructor(props) {
    var today = new Date();

    super(props);
    this.state = {
      backdrop: false,
      menuClose: false,
      productCSV: "",
      InventoryCSV: "",
      errorEmail: "",
      errorPass: "",
      errorfname: "",
      errorlname: "",
      roomsList: [
        { room: "Living room", budget: "", checked: false },
        { room: "Living room 2", budget: "", checked: false },
        { room: "Bedroom 1", budget: "", checked: false },
        { room: "Bedroom 2", budget: "", checked: false },
        { room: "Dining room", budget: "", checked: false },
        { room: "Kitchen", budget: "", checked: false },
        { room: "Outside space", budget: "", checked: false },
        { room: "Office", budget: "", checked: false },
      ],

      livingRoom: false,
      livingRoom2: false,
      Kitchen: false,
      DiningRoom: false,
      DiningRoom2: false,
      OutsideSpace: false,
      Bathroom1: false,
      Bathroom2: false,
      MasterBedroom: false,
      Bedroom1: false,
      Bedroom2: false,
      Bedroom3: false,
      Office: false,
      SelectedDate: "",
      SelectedDateError: "",
      showAlert: false,
      alertMsg: "",
      valid: false,
      dateNA: true,
    };
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  static propTypes = {
    UploadProductCSV: PropTypes.func,
    UploadInventoryCSV: PropTypes.func,
    logout: PropTypes.func,
    error: PropTypes.object.isRequired,
    Productmessage: PropTypes.string,
    Productsuccess: PropTypes.bool,
    Inventorymessage: PropTypes.string,
    Inventorysuccess: PropTypes.bool,
  };
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
    if (this.props.Productsuccess !== prevProps.Productsuccess) {
      // if (this.props.Inventorysuccess !== prevProps.Inventorysuccess) {
      if (
        this.props.Productsuccess == true &&
        this.props.Inventorysuccess == true
      ) {
        this.setState({
          alertMsg: `File uploaded successfully`,
          showAlert: true,
          backdrop: false,
          // projectAdded: true,
        });
      }
      if (
        this.props.Productsuccess == false &&
        this.props.Inventorysuccess == true
      ) {
        this.setState({
          alertMsg: `${this.props.Inventorymessage}. Please try again! `,
          showAlert: true,
          backdrop: false,
          // projectAdded: true,
        });
      }
      if (
        this.props.Productsuccess == true &&
        this.props.Inventorysuccess == false
      ) {
        this.setState({
          alertMsg: `${this.props.Productmessage}.${this.props.Inventorymessage}. Please try again! `,
          showAlert: true,
          backdrop: false,
          // projectAdded: true,
        });
      }
      if (
        this.props.Productsuccess == false &&
        this.props.Inventorysuccess == false
      ) {
        this.setState({
          alertMsg: `${this.props.Productmessage}.  Please try again! `,
          showAlert: true,
          backdrop: false,
          // projectAdded: true,
        });
      }
      // }

      // this.props.history.push("/");
    }
  }
  handleChange = (e) => {
    this.setState({
      registerInfo: {
        ...this.state.registerInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleCallBack = (childData) => {
    this.setState({ menuClose: childData });
  };
  handleMenutoggle = () => {
    document.querySelector(".main_menu").toggle();
  };
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let currentHideNav = window.innerWidth <= 760;

    if (currentHideNav === true) {
      this.setState({ menuClose: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  handleCheckBox = (e) => {
    // var toggle = !this.state[e.target.name];
    // this.setState({ [e.target.name]: toggle });
    // if (toggle === true) {
    //   this.state.registerInfo.rooms.push(e.target.name);
    // } else {
    //   const index = this.state.registerInfo.rooms.indexOf(e.target.name);
    //   this.state.registerInfo.rooms.splice(index, 1);
    // }
    let roomname = e.target.name;
    console.log("handleCheckBox...", roomname);
    this.setState((prevState) => ({
      roomsList: prevState.roomsList.map((obj) =>
        obj.room === roomname
          ? Object.assign(obj, { checked: !obj.checked })
          : obj
      ),
    }));
    // this.state.roomsList.map(room=>{
    //   if(room.room==e.target.name){

    //   }
    // })
  };
  productCSVChange = (event) => {
    console.log("event.target.files-=-=-=-=", event);
    // let reader = new FileReader();
    // if (event.target.files) {
    // reader.onload = (e) => {
    this.setState({
      productCSV: event.target.files[0],
    });
    // };
    //   reader.readAsDataURL(event.target.files[0]);
    // }
  };
  InventoryCSVChange = (event) => {
    // let reader = new FileReader();
    // if (event.target.files) {
    //   reader.onload = (e) => {
    this.setState({
      InventoryCSV: event.target.files[0],
    });
    //   };
    //   reader.readAsDataURL(event.target.files[0]);
    // }
  };
  AddProject = (e) => {
    if (this.state.productCSV == "") {
      this.setState({ errorEmail: "Please select product CSV file" });
    } else {
      this.setState({ errorEmail: "" });
    }
    if (this.state.InventoryCSV == "") {
      this.setState({ errorInventory: "Please select Inventory CSV file" });
    } else {
      this.setState({ errorInventory: "" });
    }
    if (this.state.productCSV != "" && this.state.InventoryCSV != "") {
      this.props.UploadProductCSV(this.state.productCSV);
      this.props.UploadInventoryCSV(this.state.InventoryCSV);
      this.setState({ backdrop: true });
    }
  };

  render() {
    const checkboxList = [
      {
        val: "Living Room",
        label: "Living room",
        isChecked: this.state.livingRoom,
        name: "livingRoom",
      },
      {
        val: "Living Room 2",
        label: "Living room  2",
        isChecked: this.state.livingRoom2,
        name: "livingRoom2",
      },
      {
        val: "Bedroom 1",
        label: "Bedroom 1",
        isChecked: this.state.Bedroom1,
        name: "Bedroom1",
      },
      {
        val: "Bedroom 2",
        label: "Bedroom 2",
        isChecked: this.state.Bedroom2,
        name: "Bedroom2",
      },
      {
        val: "Dining Room",
        label: "Dining room",
        isChecked: this.state.DiningRoom,
        name: "DiningRoom",
      },
      {
        val: "Kitchen",
        label: "Kitchen",
        isChecked: this.state.Kitchen,
        name: "Kitchen",
      },
      {
        val: "Outside Space",
        label: "Outside space",
        isChecked: this.state.OutsideSpace,
        name: "OutsideSpace",
      },
      {
        val: "Office",
        label: "Office",
        isChecked: this.state.Office,
        name: "Office",
      },
    ];
    const budget = [
      {
        first: "$0-500",
      },
      {
        first: "$500-1000",
      },
      {
        first: "$1000-1500",
      },
      {
        first: " $1500-2000",
      },
      {
        first: "$2000-3000",
      },
      {
        first: "$3000-5000",
      },
      {
        first: "$5000+",
      },
    ];
    let i = 0;
    return (
      <>
        <ToolbarMobile />

        <BottomMenu />
        {console.log(
          "this.state.alertMsg, this.state.showAlert, this.state.backdrop",
          this.state.alertMsg,
          this.state.showAlert,
          this.state.backdrop
        )}
        {this.state.backdrop ? (
          // <IonBackdrop visible={true} />
          <IonLoading
            cssClass="my-custom-class"
            isOpen={this.state.backdrop}
            // onDidDismiss={() => this.setState({ backdrop: false })}
            message={"Please wait! Products are being added..."}
            // duration={5000}
          />
        ) : null}
        <IonContent fullscreen>
          <IonAlert
            isOpen={this.state.showAlert}
            onDidDismiss={() => {
              //   if (this.state.projectAdded) {
              //     window.location.reload();
              //   } else {
              this.setState({ showAlert: false });
              //   }
            }}
            cssClass="myALert"
            message={this.state.alertMsg}
            buttons={[
              {
                text: "Okay",
                role: "cancel",
                cssClass: "cashmereAlertBtn",
              },
            ]}
          />
          <IonGrid className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mobilemarginwithPRojectNAv mt-3 container">
            <IonCard className="ion-justify-content-center  ion-align-items-center  nproject  ">
              <IonCardHeader>
                <IonCardTitle
                  className="  projectCardTitle"
                  style={{ textTransform: "capitalize" }}
                >
                  Inventory
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <form id="nprojectForm">
                  <IonRow className="">
                    <IonCol className=" " size="6">
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Upload Product File
                        </IonLabel>
                        <input
                          className="ion-margin-end my-2 "
                          type="file"
                          onChange={(e) => {
                            this.productCSVChange(e);
                          }}
                          //   value={this.state.productCSV}
                          //   name="email"
                          //   placeholder="Enter Client's Email Address"
                          //   required
                          //   autofocus
                          //   id="email"
                        />
                      </IonItem>
                      {/* {this.state.errorEmail != "" ? ( */}
                      <p
                        className="mt-1 mb-2"
                        style={{ color: "red", marginLeft: "16px" }}
                      >
                        {this.state.errorEmail}
                      </p>
                    </IonCol>
                    <IonCol className=" " size="6">
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Upload Inventory File
                        </IonLabel>
                        <input
                          className="ion-margin-end my-2 "
                          type="file"
                          onChange={(e) => {
                            this.InventoryCSVChange(e);
                          }}
                          //   value={this.state.InventoryCSV}
                          //   name="email"
                          //   placeholder="Enter Client's Email Address"
                          //   required
                          //   autofocus
                          //   id="email"
                        />
                      </IonItem>
                      {/* {this.state.errorEmail != "" ? ( */}
                      <p
                        className="mt-1 mb-2"
                        style={{ color: "red", marginLeft: "16px" }}
                      >
                        {this.state.errorInventory}
                      </p>
                    </IonCol>
                  </IonRow>{" "}
                  <IonRow className="">
                    <IonCol>
                      <center>
                        <IonButton
                          className=" ion-justify-content-end charcoal registerDesigner ion-margin-vertical"
                          onClick={this.AddProject}
                        >
                          Submit
                        </IonButton>
                      </center>
                    </IonCol>
                  </IonRow>{" "}
                </form>{" "}
              </IonCardContent>
            </IonCard>{" "}
          </IonGrid>
        </IonContent>
        {/* </IonPage> */}
        {/* </IonSplitPane> */}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  error: state.error,

  Productmessage: state.admin.Productmessage,
  Productsuccess: state.admin.Productsuccess,
  Inventorymessage: state.admin.Inventorymessage,
  Inventorysuccess: state.admin.Inventorysuccess,
});
export default connect(mapStateToProps, {
  UploadProductCSV,
  UploadInventoryCSV,
  logout,
})(NewProject);
