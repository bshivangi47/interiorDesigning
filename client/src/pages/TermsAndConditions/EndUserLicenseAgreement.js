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
class EndUserLicenseAgreement extends React.Component {
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
                End User License Agreement and Terms of Service
              </h1>
              {/* <p>General Terms</p> */}
              <p>
                This End User License Agreement and Terms of Service (the
                "EULA") is a binding contract between you, an individual user
                ("you") or the Subscribing Entity (defined below) on whose
                behalf you are acting, and Hemly, Inc. ("us" or "we") governing
                your use of Hemly services available through the Hemly website
                (the "Website"), where those services are the “Service”), as
                well as your access to and use of the Website. BY INSTALLING OR
                OTHERWISE ACCESSING OR USING THE SERVICE, YOU AGREE THAT YOU
                HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THE EULA. IF YOU
                DO NOT AGREE TO THE EULA, THEN YOU MAY NOT USE THE SERVICE.
              </p>
              <p>
                To have a copy of the EULA and the Hemly Privacy Policy (the
                "Privacy Policy") sent to you, contact Hemly at
                hello@hemlyco.com.
              </p>
              <div>
                <h3>1) Summary of Material Terms</h3>
                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    1.1) As provided in greater detail in the EULA (and without
                    limiting the express language of the EULA), you acknowledge
                    the following:
                    <ul style={{ listStyleType: "disc" }}>
                      <li>
                        a) you consent to the collection, use, and disclosure of
                        your personally identifiable information in accordance
                        with the Privacy Policy, including with respect to the
                        collection of location information;
                      </li>
                      <li>
                        b) the Website and Service is provided "as is" without
                        warranties of any kind and Hemly's liability to you is
                        limited; and
                      </li>
                      <li>
                        c) disputes arising hereunder will be resolved by
                        binding arbitration.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h3>2) General</h3>
                <p>
                  The Service is a platform that enables users including
                  interior designers (“Designers”) and their clients (“Clients”)
                  to collaborate on projects, source products, and transact
                  purchases.{" "}
                </p>
                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    2.1) <u>Acceptance of Privacy Policy.</u> Your use of the
                    Service is subject to the Privacy Policy, which is available
                    by email and is hereby incorporated by reference into the
                    EULA. By using the Service you agree that you have read,
                    understood, and agree to the data collection, use, and
                    disclosure provisions set forth in the Privacy Policy.
                  </li>
                  <li>
                    2.2) <u>Third Party Fees.</u> You may incur third party fees
                    through use of the Service, such as fees charged by Vendors
                    (defined below) for products or services. In addition, you
                    may be subject to third party terms, such as Vendors’
                    warranties and return policies. You acknowledge and agree
                    that you are solely responsible for all such fees incurred
                    by you for use of the Service, and you agree to pay all such
                    fees and abide by all such terms.
                  </li>
                  <li>
                    2.3) <u>Changes to the EULA</u> We may revise the EULA at
                    any time by posting an updated version. You should visit
                    this page periodically to review the most current EULA,
                    because you are bound by it. Your continued use of the
                    Service after a change to the EULA constitutes your binding
                    acceptance of the EULA.
                  </li>
                  <li>
                    2.4) <u>Eligibility.</u>If you are using or opening an
                    account on the Service on behalf of a company, entity, or
                    organization (each a "Subscribing Entity"), then you
                    represent and warrant that you: (i) are an authorized
                    representative of that Subscribing Entity with the authority
                    to bind such entity to the EULA and (ii) agree on behalf of
                    such Subscribing Entity to bind the Subscribing Entity to
                    the EULA.
                  </li>
                  <li>
                    2.5) <u>Children.</u> . No part of the Service is directed
                    to persons under the age of 13. IF YOU ARE UNDER 13 YEARS OF
                    AGE, PLEASE DO NOT USE OR ACCESS THE SERVICE AT ANY TIME OR
                    IN ANY MANNER. If you are under 18 years of age, you
                    represent and agree that you possess the legal consent of
                    your parent or guardian to access and use the Service.
                  </li>
                </ul>
              </div>

              <div>
                <h3>3) Scope of License to Users</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    3.1) <u>License Grant to You.</u> The Website is licensed,
                    not sold, to you for use only under the terms of the EULA.
                    Subject to your complete and ongoing compliance with the
                    terms and conditions of the EULA, Hemly hereby grants you a
                    personal, limited, revocable, non-transferable license to
                    access and use the Website solely for your own use or for
                    the use of the Subscribing Entity on whose behalf you are
                    authorized to act to access and receive the Service.
                  </li>
                  <li>
                    3.2) <u>License Limitations.</u>You may not modify, alter,
                    reproduce, or distribute the Website. You may not rent,
                    lease, lend, sell, redistribute or sublicense the Service,
                    Website. You may not copy, decompile, reverse engineer,
                    disassemble, attempt to derive the source code of, modify,
                    or create derivative works of any portion of the Website,
                    any updates, or any part thereof (except as and only to the
                    extent any foregoing restriction is prohibited by applicable
                    law), nor attempt to disable or circumvent any security or
                    other technological measure designed to protect the Service,
                    Website or any content available through the Service. If you
                    breach these license restrictions, or otherwise exceed the
                    scope of the licenses granted in the EULA, then you may be
                    subject to prosecution and damages, as well as liability for
                    infringement of intellectual property rights, and denial of
                    access to the Service.
                  </li>
                  <li>
                    3.3) <u>Applicability to Updates</u> The terms of the EULA
                    will govern any updates provided to you by Hemly that
                    replace and/or supplement the Website, unless such upgrade
                    is accompanied by a separate license or revised EULA, in
                    which case the terms of that license or revised EULA will
                    govern.
                  </li>
                </ul>
              </div>

              <div>
                <h3>4) Registration and Eligibility</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    4.1) <u>General</u>. To be eligible to use the Hemly site
                    and Services, you must be a resident of the United States.
                    By registering for the Services, you confirm that you are a
                    resident of the United States; if you are not a United
                    States resident, do not access Hemly’s site and do not
                    register for the Services. If you access the Hemly site or
                    Services from a location outside of the United States, you
                    are solely responsible for compliance with all local and
                    other applicable laws.
                  </li>
                  <li>
                    4.2) <u>Account Types and Registration. </u>
                    <ul style={{ listStyleType: "disc" }}>
                      <li>
                        4.2.1) <u>Client</u>. To view products or collaborate on
                        projects, the client must be invited to the platform by
                        an interior designer and register. To become a Hemly
                        Client, you must provide your zip code, phone number,
                        email address, name and password.
                      </li>
                      <li>
                        4.2.2) <u>Designer</u>.To become a Hemly Designer, you
                        must provide your registration details, pay any
                        applicable subscription fee, and agree to a designer
                        agreement.
                      </li>
                    </ul>
                  </li>
                  <li>
                    4.3) <u>) Account Security.</u> Your account is personal to
                    you, and you may not share your account information with, or
                    allow access to your account by, any third party. As you
                    will be responsible for all activity that occurs under your
                    access credentials, you agree to use reasonable efforts to
                    prevent unauthorized access to or use of the Service and to
                    preserve the confidentiality of your username and password,
                    and any device that you use to access the Service. You agree
                    to notify us immediately of any breach in secrecy of your
                    log-in information. If you have any reason to believe that
                    your account information has been compromised or that your
                    account has been accessed by a third party, you agree to
                    immediately notify Hemly by e-mail to hello@hemlyco.com. You
                    will be solely responsible for the losses incurred by Hemly
                    and others due to any unauthorized use of your account.
                  </li>
                </ul>
              </div>

              <div>
                <h3>5) Content You Submit; License Grants from You</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    5.1) <u>Your Content</u>. If you are a Client, you may be
                    able to create, post, or share content, such as messages,
                    comments, or pictures on or through the Service ("Your
                    Content") with Hemly. Your Content may be made public, so do
                    not upload any confidential content. Hemly claims no
                    ownership or control over Your Content. You or a third-party
                    licensor, as appropriate, retain all copyright, patent, and
                    trademark rights to any of Your Content that you post on or
                    through the Service. You are responsible for protecting
                    those rights.
                  </li>
                  <li>
                    5.2){" "}
                    <u>
                      You, and not Hemly, are responsible and liable for Your
                      Content.{" "}
                    </u>
                    Because we do not control the Your Content or the content
                    posted on or through the Service by other users
                    (collectively with Your Content, “UGC”), we cannot and do
                    not warrant or guarantee the truthfulness, integrity,
                    suitability, or quality of that UGC. You also agree and
                    understand that by accessing this Service, you may encounter
                    UGC that you may consider to be objectionable. We have no
                    responsibility for any UGC, including without limitation any
                    errors or omissions therein.{" "}
                  </li>
                  <li>
                    5.3) <u>We may disclose and/or remove UGC. </u> Hemly has
                    certain rights. We have the right (but do not assume the
                    obligation) to:
                    <ul style={{ listStyleType: "disc" }}>
                      <li> a)monitor all UGC;</li>
                      <li>
                        {" "}
                        b)remove or block any UGC at any time without notice at
                        our sole and absolute discretion;
                      </li>
                      <li>
                        {" "}
                        c)disclose any UGC and the identity of the user who
                        posted it in response to a subpoena or whenever we
                        believe that disclosure is appropriate to comply with
                        the law or a court order, to prevent or investigate a
                        possible crime or other violation of law, to protect the
                        rights of Hemly or others, or to enforce these terms;
                        and
                      </li>
                      <li>
                        {" "}
                        d)terminate your access to and use of this Service, or
                        to modify, edit or block your transmissions thereto, for
                        any reason and in our sole discretion.{" "}
                      </li>
                    </ul>
                  </li>

                  <li>
                    5.4) You agree that our exercise of such discretion shall
                    not render us the owners of UGC you post, and that you will
                    retain ownership thereof as described above.
                  </li>
                  <li>
                    5.5) Your Content cannot be unlawful, harmful, hateful,
                    threatening, abusive, harassing, libelous, defamatory,
                    obscene, vulgar, pornographic, profane, racially
                    disparaging, indecent, or invasive of another’s privacy.
                  </li>
                  <li>
                    5.6) <u>License Grants to HEMLY.</u> By creating, posting,
                    or sharing Your Content on or through the Service, or
                    allowing Hemly to take, obtain, or record After Images, you
                    grant Hemly a world-wide, non-exclusive, sub-licensable,
                    royalty-free, fully paid, transferable, perpetual,
                    irrevocable license to use, modify, remove, publish,
                    transmit, or display Your Content and After Images in any
                    and all media or form of communication now existing or
                    hereinafter developed in order to operate Hemly’s business,
                    and to provide Services, including, without limitation, (a)
                    facilitate a design or recommended product list for the
                    Client (b) advertise and promote the Service, and (c) with
                    regard to After Images only, for any lawful business
                    purpose.
                  </li>
                  <li>
                    5.7) <u>You Must Have Rights to the Content You Post.</u>{" "}
                    You represent and warrant that: (i) you own Your Content or
                    otherwise have the right to grant the license set forth in
                    the EULA, (ii) the posting and use of Your Content on or
                    through the Service, or of the After Images does not violate
                    the privacy rights, publicity rights, copyrights, contract
                    rights, intellectual property rights, or any other rights of
                    any person, and (iii) the posting of Your Content on the
                    Service does not result in a breach of contract between you
                    and a third party. You agree to pay for all royalties, fees,
                    and any other monies owing any person by reason of Your
                    Content that you post on or through the Service You also
                    acknowledge and agree that Your Content and After Images is
                    non-confidential and non-proprietary.
                  </li>
                  <li>
                    5.8)
                    <u>
                      Users may message each other through the Service.{" "}
                    </u>{" "}
                    You agree that your use of the Service will not include
                    sending unsolicited marketing messages or broadcasts (i.e.
                    spam). Hemly will utilize any means possible to block
                    spammers and abusers from using the Service If you believe
                    spam originated from the Service, please email us
                    immediately at hello@hemlyco.com.
                  </li>
                </ul>
              </div>

              <div>
                <h3>6) Fees; Payments</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    6.1) <u>Fees</u>. The estimated fee (the "Estimated Fee")
                    Items purchased through the Service will be set forth during
                    the ordering process on the Website. The Estimated Fee on
                    Items purchased through the Services is based on the price
                    known to Hemly at the time you checkout through the
                    Services. Because Hemly works with a number of Vendors, we
                    do not have control over the pricing of all Items offered
                    through our Services (see Section 7.1). After you place your
                    order, Hemly will notify you of any discrepancies in Item
                    prices, in which case you will have the option of accepting
                    the actual price or rejecting the Item for which the price
                    changed. Hemly will process the order (a) for all Items for
                    which the price did not change from the Estimated Fee, and
                    (b) for all Items for which you have approved a price change
                    from the Estimated Fee (where the final fee for the items in
                    (a) and (b) is the “Fee”).
                  </li>
                  <li>
                    6.2) <u>Payments. </u>
                    The Service currently uses third parties to process
                    payments. Our third- party payment processors accept
                    payments through various credit cards, as detailed on the
                    applicable payment screen. All monetary transactions on the
                    Service take place in U.S. Dollars. When you use the Service
                    to place an order for Items, you authorize the purchase and
                    delivery of the Items (subject to any confirmation of Item
                    prices, as stated in Section 6.1). You agree that Hemly will
                    obtain a temporary pre-authorization of your credit card to
                    cover the cost of the Items you have purchased, along with
                    any estimated taxes, fees, and shipping costs, and excluding
                    any unvalidated promotions. You acknowledge that taxes and
                    shipping costs are estimated at the time of checkout, and
                    you agree to any final tax and/or shipping costs as
                    calculated by Hemly, based on your shipping location and the
                    Fee. Your credit card statement will reflect the final total
                    amount charged to you upon order completion.
                  </li>
                  <li>
                    6.3) <u>Taxes. </u> The Fees are exclusive of tax. Clients
                    are responsible for all applicable government taxes, fees,
                    and service charges (“Taxes”) resulting from a transaction
                    occurring through the Service. Hemly will collect and remit
                    such Taxes from Clients where required by law, but a Client
                    may be responsible for additional Taxes not collected by
                    Hemly. All taxes are calculated using the Fee.
                  </li>

                  <li>
                    6.4) <u>Refunds and Returns</u>While all sales are
                    considered final, Hemly may offer any Client a full or
                    partial refund at Hemly's sole discretion. Product must be
                    inspected at the time of delivery for any damage. Receipt of
                    damaged product must be reported to Hemly within 7 days of
                    delivery. Reporting of damaged product may require pictures
                    and original packaging. Please email hello@hemlyco.com to
                    report any damaged product or delivery issues.
                  </li>
                </ul>
              </div>

              <div>
                <h3>7) Additional Services From HEMLY</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    7.1) <u>Third Party Purchases</u>. A Client may wish to
                    purchase certain items (“Items”) offered by third parties
                    (each, a “Vendor”) through the Service. Hemly will collect
                    the cost of these Items (as part of the Fee) from you in
                    advance of Hemly placing orders with the Vendor for the
                    purchase of the Item(s). All Vendor terms and conditions
                    apply to these purchases of Items, including return policies
                    and shipping costs. Note that while Hemly uses reasonable
                    efforts to display the current and accurate price for Items,
                    the price for Items is dynamic, and the price displayed on
                    the Service for any particular Item is subject to change.
                    Hemly will confirm Item pricing before charging Client’s
                    credit card.
                  </li>
                </ul>
              </div>

              <div>
                <h3>8) Third Party Materials; HEMLY Content</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    8.1) You understand that by using the Service, you may
                    encounter data, information, applications, materials and
                    other content from third parties, including other users
                    (collectively, "Third Party Materials"), and data,
                    information, applications, materials and other content from
                    Hemly (collectively, "Hemly Content" and, together with
                    Third Party Materials, but excluding Your Content, "Service
                    Content"), that may be offensive, indecent, or objectionable
                    Nevertheless, you agree to use the Service at your sole risk
                    and that Hemly shall not have any liability to you for any
                    Service Content that may be found to be offensive, indecent,
                    or that is inaccurate, incomplete, untimely, invalid,
                    illegal, indecent, of poor quality or otherwise
                    objectionable You use the Service, and rely upon any Service
                    Content accessible through the Service, at your sole risk.
                  </li>

                  <li>
                    8.2) In addition, third party services and Service Content
                    that may be accessed from, displayed on or linked to your
                    device are not available in all languages or in all
                    countries HEMLY makes no representation that the Service,
                    any third party services, and Service Content are
                    appropriate or available for use in any particular location
                    To the extent you choose to access such services or
                    materials, you do so at your own initiative and are
                    responsible for compliance with any and all applicable laws.
                  </li>
                </ul>
              </div>

              <div>
                <h3>9) Your Use of the Service and Service Content</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    9.1) Your right to use the Service is a privilege, not a
                    right, and is expressly conditioned on the following:
                  </li>

                  <li>
                    9.2) You may access the Service solely as intended through
                    the provided functionality of the Service and as permitted
                    under the EULA.
                  </li>
                  <li>
                    9.3) You shall not copy, reproduce, distribute, publish,
                    display, perform, transmit, stream or broadcast any part of
                    the Service, Website, or content you encounter on through
                    the Service without Hemly's prior written authorization,
                    including, by way of example and not limitation, by doing or
                    engaging in any of the following without Hemly's express
                    written consent:
                    <ul style={{ listStyleType: "disc" }}>
                      <li>
                        a) altering, defacing, mutilating or otherwise bypassing
                        any approved software through which the Service is made
                        available; and
                      </li>
                      <li>
                        b) using any trademarks, service marks, design marks,
                        logos, photographs or other content belonging to Hemly
                        or obtained from the Service.
                      </li>
                    </ul>
                  </li>
                  <li>
                    9.4) You shall not bypass, circumvent, damage or otherwise
                    interfere with any security or other features of the Website
                    designed to control the manner in which the Service is used,
                    harvest or mine Service Content from the Service, or
                    otherwise access or use the Service in a manner inconsistent
                    with individual human usage. You shall not copy or scrape
                    any Service Content.
                  </li>
                  <li>
                    9.5) You shall not undertake, cause, permit or authorize the
                    translation, reverse engineering, disassembling or hacking
                    of any aspect of the Website or Service, including any
                    Service Content available on or through the Service, or
                    attempt to do any of the foregoing, except and solely to the
                    extent permitted by the EULA, the authorized features of the
                    Service, or by law, or otherwise attempt to use or access
                    any portion of the Service other than as intended by Hemly.
                  </li>
                  <li>
                    9.6) You shall not use, display, mirror, frame or utilize
                    framing techniques to enclose the Service, including any
                    Service Content available on or through the Service, or any
                    portion thereof, through any other application or website,
                    unless and solely to the extent Hemly makes available the
                    means for embedding any part of the Service or Service
                    Content.
                  </li>
                  <li>
                    9.7) You shall not access, tamper with, or use non-public
                    areas of the Service, Hemly's (and its hosting company's)
                    computer systems and infrastructure, or the technical
                    delivery systems of Hemly's providers.
                  </li>
                  <li>
                    9.8) You shall not harass, abuse, harm or advocate or incite
                    harassment, abuse or harm of another person or group,
                    including Hemly's employees and other users.
                  </li>
                  <li>
                    9.9) You shall not provide any false personal information to
                    Hemly or any other user, or create a false identify or
                    impersonate another person or entity in any way.
                  </li>
                  <li>
                    9.10) You shall not create a new account with HEMLY, without
                    HEMLY's express written consent, if HEMLY has previously
                    disabled an account of yours.
                  </li>
                  <li>
                    9.11) You shall not solicit, or attempt to solicit, personal
                    information from other users.
                  </li>
                  <li>
                    9.12) You shall not restrict, discourage or inhibit any
                    person from using the Service, disclose personal information
                    about a third person on the Service or obtained from the
                    Service without the consent of such person, or collect
                    information about users.
                  </li>
                  <li>
                    9.13) You shall not use the Service, without HEMLY's express
                    written consent, to communicate or facilitate any commercial
                    advertisement or solicitation, except as expressly permitted
                    in the EULA.
                  </li>
                  <li>
                    9.14) You shall not gain or attempt to gain unauthorized
                    access to the Service, to other users' accounts, names or
                    personally identifiable information, or to other computers
                    or websites connected or linked to the Service
                  </li>
                  <li>
                    9.15) You shall not post, transmit or otherwise make
                    available any virus, worm, spyware or any other computer
                    code, file or program that may or is intended to disable,
                    overburden, impair, damage or hijack the operation of any
                    hardware, software or telecommunications equipment, or any
                    other aspect of the Service or communications equipment and
                    computers connected to the Service.
                  </li>
                  <li>
                    9.16) You shall not interfere with or disrupt the Service,
                    or networks or servers connected to the Service, or violate
                    the regulations, policies or procedures of such networks or
                    servers.
                  </li>
                  <li>
                    9.17) You shall not violate any applicable federal, state or
                    local laws or regulations or the EULA.
                  </li>
                  <li>
                    9.18)You shall not assist or permit any persons in engaging
                    in any of the activities describe above.
                  </li>
                </ul>
              </div>

              <div>
                <h3>10) Consent to Use of Data</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    10.1) You agree that HEMLY may collect and use technical
                    data and related information, including, but not limited to,
                    UDID, contacts, usage data, location and other technical
                    information about your device, system and application
                    software, and peripherals, that is gathered periodically to
                    facilitate the provision of software updates, product
                    support, and other services to you (if any) related to the
                    Service, and to anonymously track and report your activity
                    inside of the Service, including for analytics purposes
                    Please see the Privacy Policy.
                  </li>
                </ul>
              </div>
              <div>
                <h3>11) Ownership</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    11.1) The Service, Service Content, After Images, and the
                    media and materials contained therein, including all
                    intellectual property rights therein, are the sole and
                    exclusive property of HEMLY and its licensors. Except for
                    the limited licenses expressly granted to you under the
                    EULA, no other rights, licenses, or immunities are granted
                    or will be deemed to be granted to you under the EULA,
                    either expressly, or by implication, estoppel or otherwise.
                  </li>
                </ul>
              </div>

              <div>
                <h3>12) Feedback</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    12.1) We appreciate hearing from our users and welcome your
                    comments regarding the Service Please be advised, however,
                    that if you send us creative ideas, suggestions, inventions,
                    or materials ("Creative Ideas"), we will:
                    <ul style={{ listStyleType: "disc" }}>
                      <li>
                        a) own, exclusively, all now known or later discovered
                        rights to the Creative Ideas;
                      </li>
                      <li>
                        b) not be subject to any obligation of confidentiality
                        and will not be liable for any use or disclosure of any
                        Creative Ideas; and
                      </li>
                      <li>
                        c) be entitled to unrestricted use of the Creative Ideas
                        for any purpose whatsoever, commercial or otherwise,
                        without compensation to you or any other person.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h3>13) Consequences of Violating These Terms</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    13.1) We reserve the right to suspend or terminate your
                    account and prevent access to the Service for any reason, at
                    our discretion. We reserve the right to refuse to provide
                    the Service to you in the future. HEMLY may review and
                    remove any of Your Content at any time for any reason,
                    including activity which, in its sole judgment: violates the
                    EULA; violates applicable laws, rules, or regulations; is
                    abusive, disruptive, offensive or illegal; or violates the
                    rights of, or harms or threatens the safety of, Users of the
                    Service. You are responsible for any claims, fees, fines,
                    penalties, and other liability incurred by us or others
                    caused by or arising out of your breach of the EULA and your
                    use of the Service.
                  </li>
                </ul>
              </div>

              <div>
                <h3>14) HEMLY's Liability</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    14.1) <u>Changes to the Service.</u> We may change, suspend,
                    or discontinue any aspect of the Service at any time,
                    including hours of operation or availability of the Service
                    or any feature, without notice or liability.
                  </li>
                  <li>
                    14.2) <u>User Disputes.</u>. We are not responsible for any
                    disputes or disagreements between you and any third party
                    you interact with using the Service. This includes disputes
                    between Clients and designers. You assume all risk
                    associated with dealing with third parties and designers.
                    You agree to resolve disputes directly with the other party.
                    You release HEMLY of all claims, demands, and damages in
                    disputes among users of the Service. You shall not involve
                    us in such disputes. Use caution and common sense when using
                    the Service. If you participate in an Installation, you are
                    solely responsible for your interactions with other Users.
                    You understand that HEMLY does not currently conduct
                    background checks, including criminal background checks, on
                    its Users. HEMLY makes no representations or warranties as
                    to the conduct of Users. IN NO EVENT WILL THE RELEASED
                    PARTIES (AS DEFINED BELOW) BE LIABLE FOR ANY DAMAGES
                    WHATSOEVER, WHETHER DIRECT, INDIRECT, GENERAL, SPECIAL,
                    COMPENSATORY, CONSEQUENTIAL, AND/OR INCIDENTAL, ARISING OUT
                    OF OR RELATING TO THE CONDUCT OF YOU OR ANYONE ELSE IN
                    CONNECTION WITH YOUR USE OF THE SERVICE, INCLUDING WITHOUT
                    LIMITATION, BODILY INJURY, EMOTIONAL DISTRESS, AND/OR ANY
                    OTHER DAMAGES RESULTING FROM COMMUNICATIONS OR MEETINGS WITH
                    OTHER USERS OF THIS SERVICE OR PERSONS YOU MEET THROUGH THE
                    SERVICE. YOU AGREE TO TAKE REASONABLE PRECAUTIONS IN ALL
                    INTERACTIONS WITH OTHER USERS OF THE SERVICE, PARTICULARLY
                    IF YOU MEET OFFLINE OR IN PERSON. YOU ASSUME ALL RISK WHEN
                    ENGAGING THE SERVICES OF ANY OTHER USER AND IN CONNECTION
                    WITH USING THE SERVICE, INCLUDING BUT NOT LIMITED TO ANY
                    RISKS ASSOCIATED WITH OBTAINING SERVICES FROM ANY DESIGNER
                    OR PROVIDING ANY SERVICES TO ANY CLIENT, INCLUDING ALL RISKS
                    OF PHYSICAL OR EMOTIONAL INJURY OR HARM RESULTING ANY WAY OR
                    ARISING OUT OF INSTALLATION SERVICES OR CLIENTS OBTAINED
                    THROUGH THE SERVICE. ALL USERS, INCLUDING CLIENTS AND
                    DESIGNERS, HEREBY EXPRESSLY AGREE NOT TO HOLD THE RELEASED
                    PARTIES LIABLE FOR ANY INSTALLATION, INSTRUCTION, ADVICE OR
                    SERVICES DELIVERED WHICH ORIGINATED THROUGH THE SERVICE AND
                    THE RELEASED PARTIES EXPRESSLY DISCLAIM ANY LIABILITY
                    WHATSOEVER FOR ANY DAMAGE, SUITS, CLAIMS, AND/OR
                    CONTROVERSIES THAT ARISE OR RELATED IN ANY WAY TO THE
                    SERVICE, THE INFORMATION PROVIDED THROUGH THE SERVICE AND
                    THE SERVICES PROVIDED BY OR TO ANY USER OF THE SERVICE.
                  </li>
                  <li>
                    14.3) <u>Content Accuracy.</u>We make no representations
                    about accuracy, reliability, completeness, or timeliness of
                    any contents of the Service, including designs. Similarly,
                    we make no representations about accuracy, reliability,
                    completeness, or timeliness of any data from a third-party
                    service provider or the quality or nature of third-party
                    products or services obtained through the Service. Use the
                    Service at your own risk.
                  </li>
                  <li>
                    14.4) <u>Third-Party Websites .</u> The Service may include
                    links to third party websites and applications. You are
                    responsible for evaluating whether you want to access or use
                    them. We are not responsible for and do not endorse any
                    features, content, advertising, products, or other materials
                    on other websites or applications. You assume all risk and
                    we disclaim all liability arising from your use of them.
                  </li>
                </ul>
                <p>
                  We make no promises and disclaim all liability of specific
                  results from the use of the Service.
                </p>
              </div>

              <div>
                <h3>15) Termination</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    15.1) The EULA is effective until terminated by you or
                    HEMLY. Your rights under the EULA will terminate
                    automatically without notice from HEMLY if you fail to
                    comply with any term(s) of the EULA (including by violating
                    any license restriction provided herein). You may terminate
                    the EULA by ceasing use of the Service. Upon any termination
                    of the EULA, you must immediately cease all use of the
                    Service. If you are a designer that was selected by a user
                    to provide a design and you terminate your account before
                    you have completely delivered the Design Package, you may
                    not be allowed to use the Service in the future.
                  </li>
                </ul>
              </div>

              <div>
                <h3>16) Disclaimer</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    16.1) "Released Parties" include HEMLY and its affiliates,
                    officers, employees, agents, partners, and licensors YOU
                    EXPRESSLY UNDERSTAND AND AGREE THAT: (A) YOUR USE OF THE
                    SERVICE IS AT YOUR SOLE RISK, AND THE SERVICE IS PROVIDED ON
                    AN "AS IS" AND "AS AVAILABLE" BASIS AND THE RELEASED PARTIES
                    EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER
                    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
                    WARRANTIES AS TO PRODUCTS OR SERVICES OFFERED BY BUSINESSES
                    LISTED ON THE SERVICE, IMPLIED WARRANTIES OF
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                    NON-INFRINGEMENT; (B) THE RELEASED PARTIES MAKE NO WARRANTY
                    THAT (i) THE SERVICE WILL MEET YOUR REQUIREMENTS, (ii) THE
                    SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR
                    ERROR-FREE, (iii) THE RESULTS THAT MAY BE OBTAINED FROM THE
                    USE OF THE SERVICE, INCLUDING DATA, WILL BE ACCURATE OR
                    RELIABLE, (iv) THE QUALITY OF ANY GOODS, DATA OR SERVICE
                    AVAILABLE ON THE SERVICE WILL MEET YOUR EXPECTATIONS AND,
                    (iv) ANY ERRORS IN THE SERVICE WILL BE CORRECTED; AND (C)
                    ANY MATERIAL OBTAINED THROUGH THE USE OF THE SERVICE IS
                    ACCESSED AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE
                    SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR
                    MOBILE DEVICE OR LOSS OF DATA THAT RESULTS FROM THE USE OF
                    ANY SUCH MATERIAL.
                  </li>
                </ul>
              </div>

              <div>
                <h3>17) Limitation of Liability</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    17.1) YOU EXPRESSLY UNDERSTAND AND AGREE THAT THE RELEASED
                    PARTIES WILL NOT BE LIABLE TO YOU FOR ANY INDIRECT,
                    INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES,
                    INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS,
                    GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES (EVEN IF
                    HEMLY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES),
                    RESULTING FROM: (i) THE USE OR THE INABILITY TO USE THE
                    SERVICE; (ii) THE COST OF PROCUREMENT OF SUBSTITUTE GOODS
                    AND SERVICES RESULTING FROM ANY GOODS, DATA, INFORMATION OR
                    SERVICES OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS
                    ENTERED INTO THROUGH, FROM, OR AS A RESULT OF THE SITE;
                    (iii) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR
                    TRANSMISSIONS OR DATA; (iv) STATEMENTS OR CONDUCT OF ANY
                    USER OR THIRD PARTY ON THE SERVICE; (v) YOUR RELIANCE ON
                    CONTENT OR DATA MADE AVAILABLE BY US; OR (vi) ANY OTHER
                    MATTER RELATING TO THE SERVICE. SOME JURISDICTIONS DO NOT
                    ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION
                    OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL
                    DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS IN THIS
                    PARAGRAPH MAY NOT APPLY TO YOU.
                  </li>
                  <br />
                  <p>
                    TO THE FULLEST EXTENT POSSIBLE BY LAW, THE RELEASED PARTIES'
                    MAXIMUM LIABILITY ARISING OUT OF OR IN CONNECTION WITH THE
                    SERVICE OR YOUR USE OF COMPANY CONTENT, REGARDLESS OF THE
                    CAUSE OF ACTION (WHETHER IN CONTRACT, TORT, BREACH OF
                    WARRANTY, OR OTHERWISE), WILL NOT EXCEED THE GREATER OF (A),
                    IF YOU ARE A CLIENT, THE FEES YOU HAVE PAID TO HEMLY, (B) IF
                    YOU ARE A DESIGNER, THE FEES PAID BY HEMLY TO YOU, AND (C)
                    $100.
                  </p>
                </ul>
              </div>

              <div>
                <h3>18) Indemnity</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    18.1) You agree to defend, indemnify, and hold harmless the
                    Released Parties from and against any claims, actions, or
                    demands, including without limitation reasonable legal and
                    accounting fees, alleging or resulting from (i) your use of
                    or reliance on any Third-Party Content, (ii) your use of or
                    reliance on any Hemly Content or designs, or (iii) your
                    breach of the EULA. We will provide notice to you promptly
                    of any such claim, suit, or proceeding.
                  </li>
                </ul>
              </div>

              <div>
                <h3>19) Third Party Disputes</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    19.1) HEMLY IS NOT AFFILIATED WITH ANY SERVICE PROVIDER OR
                    THIRD PARTY SERVICE, AND ANY DISPUTE YOU HAVE WITH ANY
                    SERVICE PROVIDER, THIRD PARTY SERVICE OR OTHER THIRD PARTY,
                    INCLUDING, WITHOUT LIMITATION, ANY OTHER USER OF THE
                    SERVICE, IS DIRECTLY BETWEEN YOU AND SUCH THIRD PARTY, AND
                    YOU IRREVOCABLY RELEASE THE RELEASED PARTIES FROM ANY AND
                    ALL CLAIMS, DEMANDS AND DAMAGES (ACTUAL AND CONSEQUENTIAL)
                    OF EVERY KIND AND NATURE, KNOWN AND UNKNOWN, ARISING OUT OF
                    OR IN ANY WAY CONNECTED WITH SUCH DISPUTES.
                  </li>
                </ul>
              </div>
              <div>
                <h3>20) Copyright Policy</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    20.1) The Digital Millennium Copyright Act of 1998 (the
                    "DMCA") provides recourse for copyright owners who believe
                    that material appearing on the Internet infringes their
                    rights under U.S. copyright law. If you believe in good
                    faith that materials posted on the Service infringe your
                    copyright, you (or your agent) may send HEMLY a
                    "Notification of Claimed Infringement" requesting that the
                    material be removed, or access to it blocked The notice must
                    include the following information:
                    <ul style={{ listStyleType: "disc" }}>
                      <li>
                        a) A physical or electronic signature of a person
                        authorized to act on behalf of the owner of the works
                        that have been allegedly infringed;
                      </li>
                      <li>
                        b) Identification of the copyrighted work alleged to
                        have been infringed (or if multiple copyrighted works
                        located on the Service are covered by a single
                        notification, a representative list of such works);
                      </li>
                      <li>
                        c) Identification of the specific material alleged to be
                        infringing or the subject of infringing activity, and
                        information reasonably sufficient to allow HEMLY to
                        locate the material on the Service;{" "}
                      </li>
                      <li>
                        d) Your name, address, telephone number, and email
                        address (if available);{" "}
                      </li>
                      <li>
                        e) A statement that you have a good faith belief that
                        use of the material in the manner complained of is not
                        authorized by the copyright owner, its agent, or the
                        law; and{" "}
                      </li>

                      <li>
                        f) A statement that the information in the notification
                        is accurate, and under penalty of perjury, that the
                        complaining party is authorized to act on behalf of the
                        owner of an exclusive right that is allegedly infringed.
                      </li>
                    </ul>
                  </li>

                  <li>
                    20.2) If you believe in good faith that a notice of
                    copyright infringement has been wrongly filed against you,
                    the DMCA permits you to send HEMLY a counter-notice.
                  </li>

                  <li>
                    20.3) Notices and counter-notices must meet the then-current
                    statutory requirements imposed by the DMCA; see
                    http://www.loc.gov/copyright/ for details. If you believe
                    your copyrighted content has been displayed inappropriately
                    on the Service, please contact our Designated Agent as noted
                    below. Consult your legal advisor and see 17 U.S.C. ¤512
                    before filing a notice or counter-notice as there are
                    penalties for false claims under the DMCA: <br />
                    <p>Designated Copyright Agent </p>
                    <p>1434 Newton Street </p>
                    <p>Denver, CO 80204 </p>
                    <p>(hello@hemlyco.com) </p>
                    <p>888.978.3152</p>
                  </li>
                </ul>
              </div>

              <div>
                <h3>21) Dispute Resolution</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    21.1) The EULA and the relationship between you and HEMLY
                    will be governed by the laws of the State of Colorado
                    without regard to its conflict of law provisions. You and
                    HEMLY agree to submit to the personal and exclusive
                    arbitration of any disputes relating to your use of the
                    Service under the rules of the American Arbitration
                    Association. Any such arbitration, to the extent necessary,
                    shall be conducted in Denver County in the State of
                    Colorado. You covenant not to sue HEMLY in any other forum.
                  </li>
                  <li>
                    21.2) You also acknowledge and understand that, with respect
                    to any dispute with the Released Parties arising out of or
                    relating to your use of the Service or the EULA:
                    <ul style={{ listStyleType: "disc" }}>
                      <li>
                        a) YOU ARE GIVING UP YOUR RIGHT TO HAVE A TRIAL BY JURY;
                      </li>
                      <li>
                        b) ) YOU ARE GIVING UP YOUR RIGHT TO SERVE AS A
                        REPRESENTATIVE, AS A PRIVATE ATTORNEY GENERAL, OR IN ANY
                        OTHER REPRESENTATIVE CAPACITY, OR TO PARTICIPATE AS A
                        MEMBER OF A CLASS OF CLAIMANTS, IN ANY LAWSUIT INVOLVING
                        ANY SUCH DISPUTE; AND
                      </li>
                      <li>
                        c) YOU MUST FILE ANY CLAIM WITHIN ONE (1) YEAR AFTER
                        SUCH CLAIM AROSE OR IT IS FOREVER BARRED.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h3>22) Miscellaneous</h3>

                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    22.1) <u>Assignment.</u> You may not assign this EULA or any
                    of the rights or licenses granted hereunder, directly or
                    indirectly, including by sale, merger, change of control,
                    operation of law or otherwise, without the prior written
                    consent of HEMLY. HEMLY may assign the EULA, including all
                    its rights hereunder, without restriction.
                  </li>
                  <li>
                    22.2) <u>Survival.</u> The provisions of the EULA that are
                    intended to survive the termination of the EULA by their
                    nature will survive the termination of the EULA, including,
                    but not limited to, Sections 2 (General), 5 (Content You
                    Submit; License Grants from You), 8 (Third Party Software),
                    9 (Your Use of the Service and Service Content), 10 (Consent
                    to Use of Data), 11 (Ownership), 12 (Feedback), 14 (HEMLY's
                    Liability), 15 (Termination), 16 (Disclaimer), 17
                    (Limitation of Liability), 18 (Indemnity), 19 (Third Party
                    Disputes), 20 (Copyright Policy), 21 (Dispute Resolution),
                    and 22 (Miscellaneous).
                  </li>
                  <li>
                    22.3) <u>Consent to Electronic Communications.</u> By using
                    the Service, you consent to receiving certain electronic
                    communications from us as further described in our Privacy
                    Policy. Please read our Privacy Policy to learn more about
                    your choices regarding our electronic communications
                    practices. You agree that any notices, agreements,
                    disclosures, or other communications that we send to you
                    electronically will satisfy any legal communication
                    requirements, including that such communications be in
                    writing.
                  </li>
                  <li>
                    22.4) The EULA, together with the Privacy Policy and any
                    other agreements expressly incorporated by reference herein,
                    constitute the entire and exclusive understanding and
                    agreement between you and HEMLY regarding your use of and
                    access to the Service, and, except as expressly permitted
                    above, may be amended only by a written agreement signed by
                    authorized representatives of all parties to the EULA. The
                    failure to require performance of any provision will not
                    affect our right to require performance at any time
                    thereafter, nor will a waiver of any breach or default of
                    the EULA or any provision of the EULA constitute a waiver of
                    any subsequent breach or default or a waiver of the
                    provision itself. Use of section headers in the EULA is for
                    convenience only and will not have any impact on the
                    interpretation of particular provisions. In the event that
                    any part of the EULA is held to be invalid or unenforceable,
                    the unenforceable part shall be given effect to the greatest
                    extent possible and the remaining parts will remain in full
                    force and effect. You agree that no joint venture,
                    partnership, employment, or agency relationship exists
                    between you and HEMLY as a result of the EULA or use of the
                    Service.
                  </li>
                  <li>
                    22.5) <u>Contacting HEMLY.</u> You can contact Hemly, Inc.
                    by e-mail at hello@hemlyco.com, or by U.S. Post at Hemly,
                    Inc., 1434 Newton Street, Denver, CO 80204.
                  </li>
                </ul>
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
export default connect(mapStateToProps, { logout })(EndUserLicenseAgreement);
