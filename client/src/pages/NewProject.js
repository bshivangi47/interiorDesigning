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
import "./Page.css";
import { withRouter } from "react-router";
import Toolbar from "../components/Toolbar";
import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";
import ToolbarProjects from "../components/ToolbarProjects";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddProject as addNewProject } from "../actions/projectActions";
import { logout } from "../actions/userActions";

class NewProject extends React.Component {
  constructor(props) {
    var today = new Date();

    super(props);
    this.state = {
      backdrop: false,
      menuClose: false,
      registerInfo: {
        email: "",
        fname: "",
        lname: "",
        zip: "",
        State: "",
        rooms: [],
      },
      other: "",
      otherBudget: "",
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
        // { room: "Other", budget: "", checked: false },
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
      Other: false,
      otherCheck: false,
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
    addNewProject: PropTypes.func,
    logout: PropTypes.func,
    error: PropTypes.object.isRequired,
    addProjectsMessage: PropTypes.string,
    addProjectsSuccess: PropTypes.string,
  };

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
  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      console.log("ERROEMSG___", this.props.error.id);

      if (this.props.error.id == "ADD_PROJECTS_ERROR") {
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
    }
    if (
      this.props.addProjectsMessage !== prevProps.addProjectsMessage &&
      this.props.addProjectsSuccess == true
    ) {
      console.log("addProjectsMessage-=-=-=-=", this.props.addProjectsMessage);

      this.setState({
        alertMsg: this.props.addProjectsMessage,
        showAlert: true,
        backdrop: false,
        projectAdded: true,
      });

      // this.props.history.push("/");
    }
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
  AddProject = (e) => {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    today = new Date(year, month, day);
    let date;
    var selectedDate = new Date(this.state.SelectedDate);
    let valid = false;
    // if (this.state.dateNA == false) {
    //   console.log("this.state.selectedDate-=-=-=", this.state.SelectedDate);
    //   if (this.state.SelectedDate == "") {
    //     valid = true;
    //     date = "any";
    //     this.setState({
    //       SelectedDateError: "",
    //     });
    //     this.setState({ dateNA: true });
    //   } else {
    //     if (selectedDate < today) {
    //       date = "any";

    //       valid = false;
    //       this.setState({
    //         SelectedDateError: "Please select valid date of completion",
    //       });
    //     } else {
    //       date = selectedDate;

    //       this.setState({
    //         SelectedDateError: "",
    //       });
    //       valid = true;
    //     }
    //   }
    // } else {
    //   date = "any";

    //   this.setState({
    //     SelectedDateError: "",
    //   });
    //   valid = true;
    // }
    let roomCount = 0,
      roomCountTrue = 0;
    this.state.roomsList.map((rooms, i) => {
      if (rooms.checked == true) {
        roomCount = roomCount + 1;
      }
    });
    if (roomCount == 0 && this.state.otherCheck == false) {
      this.setState({
        showAlert: true,
        alertMsg: "Please select atleast one of the project rooms",
      });
    } else {
      if (this.state.otherCheck == true) {
        if (this.state.other != "") {
          if (this.state.otherBudget == "") {
            this.setState({
              showAlert: true,
              alertMsg: `Please select budget for ${this.state.other}`,
            });
          }
        } else {
          this.setState({
            showAlert: true,
            alertMsg: `Please enter name of Other room`,
          });
        }
      }
      this.state.roomsList.map((rooms, i) => {
        if (rooms.checked == true && rooms.budget == "") {
          this.setState({
            showAlert: true,
            alertMsg: `Please select budget for ${rooms.room.toLowerCase()}`,
          });
        } else {
          roomCountTrue = roomCountTrue + 1;
        }
      });
    }
    console.log(
      "roomCount-=-=-=-=",
      roomCount,
      "roomCountTrue-=-==-",
      roomCountTrue
    );
    let validEmail = false;
    if (this.state.registerInfo.email === "") {
      this.setState({
        errorEmail: "Email cannot be empty",
      });
      var email = document.getElementById("email");
      email.style.borderColor = "red";
    } else {
      var email = document.getElementById("email");
      email.style.borderColor = "#ddd";
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(this.state.registerInfo.email)) {
        validEmail = false;
        this.setState({
          errorEmail: "Please enter valid email address.",
        });
      } else {
        validEmail = true;
        this.setState({
          errorEmail: "",
        });
      }
    }
    if (this.state.registerInfo.fname === "") {
      this.setState({
        errorfname: "First name cannot be empty",
      });
      var email = document.getElementById("fname");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorfname: "" });
      var email = document.getElementById("fname");
      email.style.borderColor = "#ddd";
    }
    if (this.state.registerInfo.lname === "") {
      this.setState({
        errorlname: "Last name cannot be empty",
      });
      var email = document.getElementById("lname");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorlname: "" });
      var email = document.getElementById("lname");
      email.style.borderColor = "#ddd";
    }
    if (this.state.registerInfo.zip === "") {
      this.setState({
        errorCity: "Zip code cannot be empty",
      });
      var email = document.getElementById("City");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorCity: "" });
      var email = document.getElementById("City");
      email.style.borderColor = "#ddd";
    }
    if (this.state.registerInfo.State === "") {
      this.setState({
        errorState: "State cannot be empty",
      });
      var email = document.getElementById("State");
      email.style.borderColor = "red";
    } else {
      this.setState({ errorState: "" });
      var email = document.getElementById("State");
      email.style.borderColor = "#ddd";
    }

    if (
      this.state.registerInfo.email !== "" &&
      this.state.registerInfo.fname !== "" &&
      this.state.registerInfo.lname !== "" &&
      this.state.registerInfo.zip !== "" &&
      this.state.registerInfo.State !== "" &&
      // this.state.registerInfo.phone != "" &&
      // roomCount > 0 &&
      validEmail === true &&
      roomCountTrue == this.state.roomsList.length
      //  &&
      // valid === true
    ) {
      if (this.state.otherCheck == false) {
        let room = [];
        this.state.roomsList.map((rooms) => {
          if (rooms.checked == true) {
            room.push({ room: rooms.room, budget: rooms.budget });
          }
        });
        const data = {
          client_firstname: this.state.registerInfo.fname,
          client_lastname: this.state.registerInfo.lname,
          client_email: this.state.registerInfo.email,
          // desiredCompletionDate: date,
          zip: this.state.registerInfo.zip,
          state: this.state.registerInfo.State,
          projectRooms: room,
        };
        console.log("data=--=-=", data);
        this.props.addNewProject(data);
        this.setState({ backdrop: true });
      }
      if (
        this.state.other != "" &&
        this.state.otherBudget != "" &&
        this.state.otherCheck == true
      ) {
        let room = [];
        this.state.roomsList.map((rooms) => {
          if (rooms.checked == true) {
            room.push({ room: rooms.room, budget: rooms.budget });
          }
        });
        room.push({ room: this.state.other, budget: this.state.otherBudget });
        const data = {
          client_firstname: this.state.registerInfo.fname,
          client_lastname: this.state.registerInfo.lname,
          client_email: this.state.registerInfo.email,
          // desiredCompletionDate: date,
          zip: this.state.registerInfo.zip,
          state: this.state.registerInfo.State,
          projectRooms: room,
        };
        console.log("data=--=-=", data);
        this.props.addNewProject(data);
        this.setState({ backdrop: true });
      }
    }
  };

  render() {
    let roomListTrueCount = this.state.roomsList.filter(
      (room) => room.checked == true
    ).length;
    console.log("this.state.otherCheck-==-=--=", this.state.otherCheck);

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
        <ToolbarProjects />
        <BottomMenu />
        {this.state.backdrop ? (
          // <IonBackdrop visible={true} />
          <IonLoading
            cssClass="my-custom-class"
            isOpen={this.state.backdrop}
            // onDidDismiss={() => this.setState({ backdrop: false })}
            message={"Your project is being added..."}
            // duration={5000}
          />
        ) : null}
        <IonContent fullscreen>
          <IonAlert
            isOpen={this.state.showAlert}
            onDidDismiss={() => {
              if (this.state.projectAdded) {
                this.props.history.go(0);
              } else {
                this.setState({ showAlert: false });
              }
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
          <IonGrid className="px-3  mobilemarginwithPRojectNAv">
            <IonCard
              className="ion-justify-content-center  ion-align-items-center  nproject  "
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              <IonCardHeader>
                <IonCardTitle
                  className="  projectCardTitle"
                  style={{ textTransform: "capitalize" }}
                >
                  New project
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <form id="nprojectForm">
                  <IonRow className="">
                    <IonCol className=" " size="12">
                      <IonItem
                        className="forDarkMode newProjectItem"
                        lines="none"
                      >
                        <IonLabel
                          className="ion-margin-end proom"
                          position="stacked"
                        >
                          Invite Client
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end  "
                          onIonChange={(e) => {
                            this.handleChange(e);
                            if (this.state.registerInfo.email == "") {
                              this.setState({
                                errorEmail: "Email cannot be empty",
                              });
                              var email = document.getElementById("email");
                              email.style.borderColor = "red";
                            } else {
                              var pattern = new RegExp(
                                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                              );

                              if (
                                !pattern.test(this.state.registerInfo.email)
                              ) {
                                this.setState({ validEmail: true });
                                this.setState({
                                  errorEmail:
                                    "Please enter valid email address.",
                                });
                              } else {
                                this.setState({ validEmail: false });
                                this.setState({
                                  errorEmail: "",
                                });
                              }
                              // var email = document.getElementById("email");
                              // email.style.borderColor = "#ddd";
                            }
                          }}
                          value={this.state.registerInfo.email}
                          type="email"
                          name="email"
                          placeholder="Enter Client's Email Address"
                          required
                          autofocus
                          id="email"
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
                  </IonRow>{" "}
                  <IonRow className=" ">
                    <IonCol
                      sizeXl="6"
                      sizeLg="6"
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
                          First name
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.handleChange(e);
                            if (this.state.registerInfo.fname == "") {
                              this.setState({
                                errorfname: "First name cannot be empty",
                              });
                              var email = document.getElementById("fname");
                              email.style.borderColor = "red";
                            } else {
                              this.setState({ errorfname: "" });
                              var email = document.getElementById("fname");
                              email.style.borderColor = "#ddd";
                            }
                          }}
                          value={this.state.registerInfo.fname}
                          style={{ textTransform: "capitalize" }}
                          type="text"
                          name="fname"
                          placeholder="Enter client's first name"
                          required
                          id="fname"
                        />{" "}
                      </IonItem>
                      {this.state.errorfname != "" ? (
                        <p style={{ color: "red", marginLeft: "16px" }}>
                          {this.state.errorfname}
                        </p>
                      ) : null}
                    </IonCol>{" "}
                    <IonCol
                      sizeXl="6"
                      sizeLg="6"
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
                          Last name
                        </IonLabel>
                        <IonInput
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.handleChange(e);
                            if (this.state.registerInfo.lname == "") {
                              this.setState({
                                errorlname: "Last name cannot be empty",
                              });
                              var email = document.getElementById("lname");
                              email.style.borderColor = "red";
                            } else {
                              this.setState({ errorlname: "" });
                              var email = document.getElementById("lname");
                              email.style.borderColor = "#ddd";
                            }
                          }}
                          value={this.state.registerInfo.lname}
                          type="text"
                          name="lname"
                          placeholder="Enter client's last name"
                          required
                          id="lname"
                          style={{ textTransform: "capitalize" }}
                        />
                      </IonItem>{" "}
                      {this.state.errorlname != "" ? (
                        <p style={{ color: "red", marginLeft: "16px" }}>
                          {this.state.errorlname}
                        </p>
                      ) : null}
                    </IonCol>{" "}
                  </IonRow>
                  <IonRow className=" ">
                    <IonCol size="12">
                      <IonItem lines="none">
                        <IonLabel class="ProjectRooms">Project rooms:</IonLabel>
                      </IonItem>
                    </IonCol>
                    {this.state.roomsList.map((room, i) => (
                      <IonCol
                        key={i}
                        sizeXl="4"
                        sizeLg="4"
                        sizeMd="6"
                        sizeSm="6"
                        sizeXs="6"
                        style={{ padding: 0 }}
                      >
                        {" "}
                        <IonItem
                          lines="none"
                          onClick={this.handleCheckBox}
                          className="newprojectRadio"
                        >
                          <IonCheckbox
                            slot="start"
                            // value={val}
                            checked={room.checked}
                            name={room.room}
                          />
                          <IonLabel>{room.room}</IonLabel>{" "}
                        </IonItem>
                      </IonCol>
                    ))}
                    {/* {checkboxList.map(({ val, name, isChecked, label }, i) => (
                      <IonCol
                        key={i}
                        sizeXl="4"
                        sizeLg="4"
                        sizeMd="6"
                        sizeSm="6"
                        sizeXs="6"
                        style={{ padding: 0 }}
                      >
                        {" "}
                        <IonItem
                          lines="none"
                          onClick={this.handleCheckBox}
                          className="newprojectRadio"
                        >
                          <IonCheckbox
                            slot="start"
                            value={val}
                            checked={isChecked}
                            name={name}
                          />
                          <IonLabel>{label}</IonLabel>{" "}
                        </IonItem>
                      </IonCol>
                    ))} */}
                    <IonCol
                      sizeXl="4"
                      sizeLg="4"
                      sizeMd="6"
                      sizeSm="6"
                      sizeXs="12"
                      style={{ padding: 0 }}
                    >
                      <IonItem className="forDarkMode " lines="none">
                        {/* <IonLabel
                          className="ion-margin-end proom "
                          // position="stacked"
                        >
                          Other
                        </IonLabel> */}
                        <IonCheckbox
                          className="checkBoxOther"
                          slot="start"
                          onClick={() => {
                            this.setState({
                              otherCheck: !this.state.otherCheck,
                            });
                          }}
                          // value={val}
                          checked={this.state.otherCheck}
                          name={"other"}
                        />
                        {/* <IonLabel> */}
                        <IonInput
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.setState({ other: e.target.value });
                            if (
                              e.target.value == "" ||
                              e.target.value == null
                            ) {
                              this.setState({ otherBudget: "" });
                            }
                          }}
                          value={this.state.other}
                          type="text"
                          name="lname"
                          placeholder="Other"
                          required
                          id="lname"
                          style={{
                            textTransform: "capitalize",
                            borderBottom: "1px solid #ddd",
                          }}
                        />
                        {/* </IonLabel> */}
                      </IonItem>{" "}
                    </IonCol>
                  </IonRow>{" "}
                  <IonRow className="">
                    {roomListTrueCount > 0 || this.state.other != "" ? (
                      <IonCol size="12" className="ion-no-margin p-0">
                        <IonItem lines="none">
                          <IonLabel class="ProjectRooms">Budget:</IonLabel>
                        </IonItem>
                      </IonCol>
                    ) : null}
                    {this.state.roomsList.map((rooms, index) => {
                      if (rooms.checked == true) {
                        return (
                          <IonCol
                            sizeXl="4"
                            sizeLg="6"
                            sizeMd="6"
                            sizeSm="12"
                            sizeXs="12"
                            key={index}
                          >
                            <IonItem lines="none" className="newProjectItem">
                              <IonLabel
                                className="ion-margin-end proom"
                                position="stacked"
                              >
                                {rooms.room}
                              </IonLabel>
                              <IonSelect
                                value={rooms.budget}
                                placeholder="Select budget"
                                interface="popover"
                                onIonChange={(e) => {
                                  this.setState((prevState) => ({
                                    roomsList: prevState.roomsList.map((obj) =>
                                      obj.room === rooms.room
                                        ? Object.assign(obj, {
                                            budget: e.target.value,
                                          })
                                        : obj
                                    ),
                                  }));
                                }}
                              >
                                {budget.map((budget) => (
                                  <IonSelectOption
                                    key={budget.first}
                                    value={budget.first}
                                  >
                                    {budget.first}
                                  </IonSelectOption>
                                ))}
                              </IonSelect>
                            </IonItem>
                          </IonCol>
                        );
                      }
                    })}
                    {this.state.otherCheck ? (
                      <IonCol
                        sizeXl="4"
                        sizeLg="6"
                        sizeMd="6"
                        sizeSm="12"
                        sizeXs="12"
                      >
                        <IonItem lines="none" className="newProjectItem">
                          <IonLabel
                            className="ion-margin-end proom"
                            position="stacked"
                            style={{ textTransform: "capitalize" }}
                          >
                            {this.state.other != ""
                              ? this.state.other
                              : "Other"}
                          </IonLabel>
                          <IonSelect
                            value={this.state.otherBudget}
                            placeholder="Select budget"
                            interface="popover"
                            onIonChange={(e) => {
                              this.setState({
                                otherBudget: e.target.value,
                              });
                            }}
                          >
                            {budget.map((budget) => (
                              <IonSelectOption
                                key={budget.first}
                                value={budget.first}
                              >
                                {budget.first}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                    ) : null}
                  </IonRow>
                  {/* <IonRow className="">
                    <IonCol
                      sizeXl="12"
                      sizeLg="12"
                      sizeMd="12"
                      sizeSm="12"
                      sizeXs="12"
                    >
                      <IonItem lines="none">
                        <IonLabel className="completionDate">
                          Desired completion date
                        </IonLabel>
                      </IonItem>
                    </IonCol>
                    <IonCol
                      sizeXl="4"
                      sizeLg="4"
                      sizeMd="6"
                      sizeSm="6"
                      sizeXs="12"
                    >
                      <IonItem lines="none">
                        <div className="">
                          <input
                            class="form-control"
                            type="date"
                            value={this.state.SelectedDate}
                            id="example-date-input"
                            disabled={this.state.dateNA ? true : false}
                            onChange={(e) => {
                              this.setState({ SelectedDate: e.target.value });
                              var today = new Date();
                              var day = today.getDate();
                              var month = today.getMonth();
                              var year = today.getFullYear();
                              today = new Date(year, month, day);
                              var selectedDate = new Date(e.target.value);

                              if (selectedDate < today) {
                                this.setState({
                                  SelectedDateError:
                                    "Please select valid date of completion",
                                });
                              } else {
                                this.setState({
                                  SelectedDateError: "",
                                });
                              }
                            }}
                          />
                        </div>
                      </IonItem>
                      {this.state.SelectedDateError != "" ? (
                        <p
                          className="mt-1 mb-2"
                          style={{ color: "red", marginLeft: "16px" }}
                        >
                          {this.state.SelectedDateError}
                        </p>
                      ) : null}
                    </IonCol>
                    <IonCol
                      sizeXl="3"
                      sizeLg="3"
                      sizeMd="6"
                      sizeSm="6"
                      sizeXs="12"
                    >
                      <IonItem
                        lines="none"
                        onClick={() => {
                          this.setState({
                            dateNA: !this.state.dateNA,
                            SelectedDateError: "",
                            SelectedDate: "",
                          });
                        }}
                      >
                        <IonCheckbox
                          slot="start"
                          value={this.state.dateNA}
                          checked={this.state.dateNA ? true : false}
                          name="dateNA"
                        />
                        <IonText>N/A</IonText>
                      </IonItem>
                    </IonCol>{" "}
                  </IonRow>*/}
                  <IonRow />
                  <IonRow className="mt-3">
                    <IonCol
                      sizeXl="6"
                      sizeLg="6"
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
                            if (this.state.registerInfo.zip == "") {
                              this.setState({
                                errorCity: "Zip code cannot be empty",
                              });
                              var email = document.getElementById("City");
                              email.style.borderColor = "red";
                            } else {
                              this.setState({ errorCity: "" });
                              var email = document.getElementById("City");
                              email.style.borderColor = "#ddd";
                            }
                          }}
                          value={this.state.registerInfo.zip}
                          // type="number"
                          name="zip"
                          placeholder="Enter client's zip code"
                          required
                          id="City"
                        />{" "}
                      </IonItem>
                      {this.state.errorCity != "" ? (
                        <p style={{ color: "red", marginLeft: "16px" }}>
                          {this.state.errorCity}
                        </p>
                      ) : null}
                    </IonCol>{" "}
                    <IonCol
                      sizeXl="6"
                      sizeLg="6"
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
                          className="ion-margin-end "
                          onIonChange={(e) => {
                            this.handleChange(e);
                            if (this.state.registerInfo.State == "") {
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
                          value={this.state.registerInfo.State}
                          type="text"
                          name="State"
                          placeholder="Enter client's state"
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
                        {/* <IonInput
                        className="ion-margin-end "
                        onIonChange={(e) => {
                          this.handleChange(e);
                          if (this.state.registerInfo.State == "") {
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
                        value={this.state.registerInfo.State}
                        type="text"
                        name="State"
                        placeholder="Enter client's State"
                        required
                        id="State"
                      /> */}
                      </IonItem>{" "}
                      {this.state.errorState != "" ? (
                        <p style={{ color: "red", marginLeft: "16px" }}>
                          {this.state.errorState}
                        </p>
                      ) : null}
                    </IonCol>{" "}
                  </IonRow>{" "}
                  <IonRow className="mt-2 ion-margin-vertical">
                    <IonCol>
                      <center>
                        <IonButton
                          className=" ion-justify-content-end charcoal registerDesigner ion-margin-vertical"
                          onClick={this.AddProject}
                        >
                          Add project
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

  addProjectsMessage: state.project.addProjectsMessage,
  addProjectsSuccess: state.project.addProjectsSuccess,
});
export default connect(mapStateToProps, { addNewProject, logout })(NewProject);
