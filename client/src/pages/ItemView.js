import {
  IonContent,
  IonGrid,
  IonCard,
  IonCardHeader,
  IonBadge,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonImg,
  IonTitle,
  IonSlides,
  IonSlide,
  IonIcon,
  IonItem,
  IonButton,
} from "@ionic/react";
import { Link } from "react-router-dom";
import {
  chevronBackCircleOutline,
  chevronForwardCircleOutline,
} from "ionicons/icons";
import React from "react";
import "./Page.css";
import ImageGallery from "react-image-gallery";
import Toolbar from "../components/Toolbar";

import couch from "../images/couch.jpg";
import chair from "../images/download.jpg";
import chairs from "../images/image.jpg";
import "react-image-gallery/styles/css/image-gallery.css";

import cafe from "../images/backgroundimage.jpg";
import BottomMenu from "../components/BottomMenu";
import ToolbarMobile from "../components/ToolbarMobile";
import api_URL, { validate_token } from "../apiURL/apiURL";
import Axios from "axios";
class ItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // menuClose: true,
      hideNav: window.innerWidth <= 760,
      swiper: [],
      nextbtn: true,
      prevbtn: false,
      productImagesLinks: [],
      images: [
        {
          id: 1,
          original: couch,
          thumbnail: couch,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 2,
          original: chair,
          thumbnail: chair,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 3,
          original: chairs,
          thumbnail: chairs,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 4,
          original: couch,
          thumbnail: couch,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 5,
          original: chair,
          thumbnail: chair,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 6,
          original: couch,
          thumbnail: couch,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 7,
          original: chairs,
          thumbnail: chairs,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 8,
          original: couch,
          thumbnail: couch,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 9,
          original: chairs,
          thumbnail: chairs,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 10,
          original: couch,
          thumbnail: couch,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 11,
          original: cafe,
          thumbnail: cafe,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 12,
          original: chair,
          thumbnail: chair,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
        {
          id: 13,
          original: cafe,
          thumbnail: cafe,
          originalClass: "original",
          thumbnailClass: "thumbnail",
          // description: "this is couch",
        },
      ],
    };
  }
  componentDidMount() {
    let images = [];
    console.log("this.props-=-=-=-=-=", this.props);
    if (
      this.props.location.state &&
      this.props.location.state.productImagesLinks
    ) {
      this.setState({
        client: this.props.location.state.client,
        room: this.props.location.state.room,
        projectId: this.props.location.state.projectId,
      });

      this.props.location.state.productImagesLinks.map((image, i) => {
        if (
          image != "" &&
          i != this.props.location.state.productImagesLinks.length - 1
        ) {
          let imageObj = {
            id: i,
            original: image,
            thumbnail: image,
            originalClass: "original",
            thumbnailClass: "thumbnail",
          };
          images.push(imageObj);
        }
      });
      this.setState({
        productImagesLinks: images,
      });
    }
  }
  prev = () => {
    var mySwiper = document.querySelector(".swiper-container").swiper;
    var myswiper = document.querySelector(".swiper-container");
    mySwiper.slidePrev();
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
    myswiper.getActiveIndex().then((result) => {
      console.log("active..", result);
    });
  };
  next = () => {
    var mySwiper = document.querySelector(".swiper-container").swiper;
    var myswiper = document.querySelector(".swiper-container");
    mySwiper.slideNext();
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
    myswiper.getActiveIndex().then((result) => {
      console.log("active..", result);
    });
  };
  render() {
    let images = [];
    if (
      this.props.location.state &&
      this.props.location.state.productImagesLinks
    ) {
      this.props.location.state.productImagesLinks.map((image, i) => {
        if (
          image != "" &&
          i != this.props.location.state.productImagesLinks.length - 1
        ) {
          let imageObj = {
            id: i,
            original: image,
            thumbnail: image,
            originalClass: "original",
            thumbnailClass: "thumbnail",
          };
          images.push(imageObj);
        }
      });
    }
    return (
      <>
        <ToolbarMobile />
        <BottomMenu />
        <IonContent>
          <IonGrid className="mobilemargin">
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
                    see new items from designer
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
            <IonRow className="">
              <IonCol size="12" className="">
                <ImageGallery
                  items={images}
                  showBullets={true}
                  slideInterval={2000}
                  slideOnThumbnailOver={true}
                  showPlayButton={false}
                  // lazyLoad={true}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </>
    );
  }
}
export default ItemView;
