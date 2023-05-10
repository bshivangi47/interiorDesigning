import React from "react";
import { logout } from "../../actions/userActions";
import { IonContent, IonPage } from "@ionic/react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { menuController } from "@ionic/core";
import Toolbar from "../../components/Toolbar";

// const HeadingRow = tw.div`flex`;
// const Heading = tw(SectionHeading)`text-gray-900 mt-6 mb-0 px-6`;
// const Text = styled.div`
//   ${tw`text-lg  text-gray-800 px-6 mb-16`}
//   p {
//     ${tw`leading-loose`}
//   }
//   h1 {
//     ${tw`text-3xl font-bold mt-10`}
//   }
//   h2 {
//     ${tw`text-2xl font-bold mt-8`}
//   }
//   h3 {
//     ${tw`text-xl font-bold mt-6`}
//   }
//   ul {
//     ${tw`list-disc ml-3 mt-4 `}
//     li {
//       ${tw`ml-2 leading-loose`}
//       p {
//         ${tw`mt-0 inline leading-loose`}
//       }
//     }
//   }
// `;
class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: undefined,
    };
    menuController.enable(false);
  }
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.setState({ open: false, anchorEl: undefined });
  };
  componentWillUnmount() {
    if (localStorage.getItem("user")) {
      menuController.enable(true, "main_menu");
    } else {
      menuController.enable(false);
    }
  }
  render() {
    return (
      <IonPage className="">
        <Toolbar />
        <IonContent className="contentScroll">
          <div className="terms_body " style={{ paddingBottom: "1px" }}>
            <div className="container">
              <h1
                className="mb-4"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </h1>
              {/* <p>General Terms</p> */}
              <p>The Privacy Policy explains how Hemly Inc. may:</p>
              <ul style={{ listStyleType: "circle" }}>
                <li>collect,</li>
                <li>use, and</li>
                <li>disclose</li>
              </ul>
              <p>
                information we obtain through Hemly Inc.’s service (the
                “Service”).
              </p>
              <div>
                <div>
                  <h2>How Hemly Inc. collects your information</h2>

                  <p>We collect information when you:</p>
                  <ul style={{ listStyleType: "circle" }}>
                    <li>register to use the Service;</li>
                    <li>log in with social networking credentials;</li>
                    <li>use the Service;</li>
                    <li>
                      otherwise communicate with or submit information or
                      content to us. This includes information Designers and
                      Clients may share in their communications with each other.
                    </li>
                  </ul>
                  <p>
                    We also collect information, such as anonymous usage
                    statistics, by using cookies, server logs, and other similar
                    technology as you use the Service, and we own all rights to
                    such information. We may also collect information about you
                    from other outlets and mediums (like social media, in person
                    events, etc.) and we may add that information to information
                    you give us through the Service.
                  </p>
                </div>
                <div>
                  <h3>Information Collection</h3>
                  <p>
                    To become a registered user (a “User”), you must provide us
                    with certain information to register. To register as a
                    client (a “Client”) or as a designer (a “Designer”), you
                    must provide information, including your name, email
                    address, zip code, phone number, and also must create a
                    username and password.
                  </p>
                </div>

                <div>
                  <h3>Social Sign-On</h3>
                  <p>
                    If you are a Client, you may register using a social
                    network, such as Facebook or Pinterest. We collect
                    information from the social network when you use your social
                    media credentials to log into the Service. For example, when
                    you log in with your Facebook credentials, we may collect
                    the information you have made publicly available in
                    Facebook, such as your name and profile picture. We may also
                    obtain any other information you have authorized Facebook to
                    share with third party applications. For example, if you
                    authorize us to access your Pinterest or Houzz accounts, we
                    (and your designer(s)) may access and collect the photos,
                    images, or other content that you have pinned there.
                  </p>
                </div>

                <div>
                  <h3>Referrals</h3>
                  <p>
                    If you provide us with contact information (including
                    emails) of any friends we may contact those friends and say
                    you have referred us to them. We may also receive
                    information about you from your friends, if they provide us
                    information about you. You should not give us any contact
                    information for anyone unless you have their permission to
                    do so. You may only provide us contact information for
                    actual people you know who live in the United States.
                  </p>
                </div>

                <div>
                  <h3>Using the Service</h3>
                  <p>
                    We collect information you post through the Service. For
                    example, we collect any information you post when you
                    interact with other Users during a design project (a
                    “Project”), including any information you post.
                  </p>
                </div>

                <div>
                  <h3>Making Payments</h3>
                  <p>
                    If you are a Client, when you make payments through the
                    Service, you may need to provide information to our
                    third-party service providers, such as your credit card
                    number and billing address and they may store that
                    information.
                  </p>
                </div>
                <div>
                  <h3>Receiving Payments</h3>
                  <p>
                    If you are a Designer, we will pay you via a third-party
                    service provider, which may need to collect your bank
                    account and routing numbers, address, name and phone number.
                  </p>
                </div>
                <div>
                  <h3>Customer Support</h3>
                  <p>
                    We may collect information through your communications with
                    our customer-support team.
                  </p>
                </div>
                <div>
                  <h3>
                    Cookies, Automatic Data Collection, and Related Technologies
                  </h3>
                  <p>
                    The Service collects and stores information that is
                    generated automatically as you use it, including your
                    preferences and anonymous usage statistics. When you visit
                    the Service, we and our third-party service providers
                    receive and record information on our server logs from your
                    browser, including your IP address, and from cookies and
                    similar technology. Cookies are small text files placed in
                    visitors' computer browsers to store their preferences. Most
                    browsers allow you to block and delete cookies. However, if
                    you do that, the Service may not work properly. By using the
                    Service, you are authorizing us to gather, parse, and retain
                    data related to the provision of the Service. The Service is
                    not presently configured to respond to DNT or "do not track"
                    signals from web browsers or mobile devices. We use Google
                    Analytics and other third party analytics services on our
                    site. Google Analytics is a web analytics service provided
                    by Google. Google Analytics and similar companies use
                    cookies to collect anonymous traffic data to help use
                    analyze how users use the website. The information generated
                    by a cookie about your use of the website (including your IP
                    address) will be transmitted to and stored by Google on
                    servers in the United States and maybe stored by other third
                    parties elsewhere. Google will use this information for the
                    purpose of evaluating your use of the site, compiling
                    reports on site activity for us and providing other services
                    relating to site activity and internet usage. Google may
                    also transfer this information to third parties where
                    required to do so by law, or where such third parties
                    process the information on Google’s behalf. By using the
                    website, you consent to the processing of data about you by
                    Google in the manner and for the purposes described in this
                    policy. Other third party analytics companies may use and
                    share the information differently. If you have concerns
                    relating to the usage of Google Analytics, it is possible to
                    block Google Analytics by installing a plug-in to your
                    browser. A plug-in for the most common browsers can be found
                    here:{" "}
                    <a href="http://tools.google.com/dlpage/gaoptout">
                      http://tools.google.com/dlpage/gaoptout
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <h2>How Hemly Inc. uses your information</h2>

                  <p>We use information to:</p>
                  <ul style={{ listStyleType: "circle" }}>
                    <li>
                      provide you with the Service (including shipping your any
                      products you’ve purchased through the Service);
                    </li>
                    <li>
                      facilitate and improve our services (including research
                      and marketing purposes) and develop new services; and
                    </li>
                    <li>
                      communicate with you (including administrative messages
                      and promotional communications).
                    </li>
                  </ul>
                </div>
                <div>
                  <h3>Internal and Service-Related Usage</h3>
                  <p>
                    We use information for internal and service-related purposes
                    only and may provide it to third parties to allow us to
                    facilitate the Service, these third parties may include
                    marketing partners, furniture and goods suppliers, credit
                    card processors, hosting providers and other third party
                    vendors, partners or suppliers. We may use and retain any
                    data we collect to provide and improve our services.
                  </p>
                </div>

                <div>
                  <h3>Communications</h3>
                  <p>
                    We may send email to the email address you provide to us to
                    verify your account and for informational and operational
                    purposes, such as account management, customer service, or
                    system maintenance.
                  </p>
                </div>

                <div>
                  <h3>Marketing</h3>
                  <p>
                    We may use information (including your email) to provide
                    online advertising on the Service and to facilitate
                    transmittal of information that may be useful, relevant,
                    valuable or otherwise of interest to you. This may be
                    information about our products and services or third-party
                    products and services
                  </p>
                </div>

                <div>
                  <h3>Aggregate Data</h3>
                  <p>
                    We may anonymize and aggregate data collected through the
                    Service and use or share it for any purpose, including for
                    marketing purposes.
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <h2>Hemly may disclose your information</h2>

                  <p>We may share your information:</p>
                  <ul style={{ listStyleType: "circle" }}>
                    <li>
                      with our third-party service providers (like credit card
                      processors, vendors, or other suppliers);
                    </li>
                    <li>between Clients and Designers;</li>
                    <li>to comply with legal obligations;</li>
                    <li>with our current or future affiliates;</li>
                    <li>with our partners;</li>
                    <li>to protect and defend our rights and property; and</li>
                    <li>with your permission.</li>
                  </ul>
                  <p>
                    We do not rent, sell, or share personally identifiable
                    information about you with unaffiliated third parties for
                    their direct marketing purposes, unless you have opted into
                    such sharing. We may allow access to other data collected by
                    the Service to enable the delivery of online advertising on
                    this website, or otherwise facilitate transmittal of
                    information that may be useful, relevant, valuable or
                    otherwise of interest to you.
                  </p>
                </div>
                <div>
                  <h3>We Use Vendors and Service Providers</h3>
                  <p>
                    We may share any information we receive with vendors and
                    service providers retained in connection with the provision
                    of the Service. For example, if you purchase something
                    through our Service, we will share your information with the
                    supplier and their shipping and fulfillment partners. We
                    will also share your information with our credit card
                    processors.
                  </p>
                </div>

                <div>
                  <h3>We have Partners</h3>
                  <p>
                    We may share any information we receive with any entities
                    with whom we have partnered with to provide you the Service.
                  </p>
                </div>

                <div>
                  <h3>Displaying to and Sharing with Other Users</h3>
                  <p>
                    The content you post to the Service may be displayed on the
                    Service and may be seen by the Clients or Designers (as
                    applicable) with whom you work, as well as others.
                  </p>
                </div>

                <div>
                  <h3>Social Networking and Other Websites</h3>
                  <p>
                    The Service may allow you to share information with social
                    networking websites, such as Facebook. We do not share your
                    personally identifiable information with them unless you
                    direct the Service to share it. Their use of the information
                    will be governed by their privacy policies, and you may be
                    able to modify your privacy settings on their websites.
                  </p>
                </div>

                <div>
                  <h3>Marketing</h3>
                  <p>
                    We do not rent, sell, or share personally identifiable about
                    you with unaffiliated third parties for their direct
                    marketing purposes, unless you have opted into such sharing.
                    We may allow access to other data collected by the Service
                    to enable the delivery of online advertising on this
                    website, or otherwise facilitate transmittal of information
                    that may be useful, relevant, valuable or otherwise of
                    interest to you
                  </p>
                </div>

                <div>
                  <h3>As Required By Law and Similar Disclosures</h3>
                  <p>
                    We may access, preserve, and disclose your information if we
                    believe doing so is required or appropriate to: comply with
                    law enforcement requests and legal process, such as a court
                    order or subpoena; respond to your requests; or protect
                    yours', ours' or others' rights, property, or safety.
                  </p>
                </div>

                <div>
                  <h3>Merger, Sale, or Other Asset Transfers</h3>
                  <p>
                    . If we are involved in a merger, acquisition, financing due
                    diligence, reorganization, bankruptcy, receivership, sale of
                    company assets, or transition of service to another
                    provider, your information may be sold or transferred as
                    part of such a transaction as permitted by law and/or
                    contract. If another company acquires our company or our
                    assets, that company will possess the information collected
                    by it and us and will assume the rights and obligations
                    regarding your information collected by us as described in
                    this policy.
                  </p>
                </div>
                <p>
                  We may also otherwise disclose your information with your
                  permission.
                </p>
              </div>

              <div>
                <div>
                  <h2>Security of your information</h2>

                  <p>
                    We take steps to ensure that your information is treated
                    securely and in accordance with this Privacy Policy.
                    Unfortunately, the Internet cannot be guaranteed to be 100%
                    secure, and we cannot ensure or warrant the security of any
                    information you provide to us. We do not accept liability
                    for unintentional disclosure.
                  </p>
                  <p>
                    By using the Service or providing information to us, you
                    agree that we may communicate with you electronically
                    regarding security, privacy, and administrative issues
                    relating to your use of the Service. If we learn of a
                    security system's breach, we may attempt to notify you
                    electronically by posting a notice on the Service or sending
                    an email to you. You may have a legal right to receive this
                    notice in writing. To receive free written notice of a
                    security breach (or to withdraw your consent from receiving
                    electronic notice), please notify us at{" "}
                    <a>hello@hemlyco.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
});
export default connect(mapStateToProps, { logout })(PrivacyPolicy);
