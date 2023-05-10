var request = require("request");
const dotenv = require("dotenv");
const User = require("../models/user");
const sgMail = require("@sendgrid/mail");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendBusinessEmail = async (req, res) => {
  const data = {
    // to: process.env.SENDGRID_SENDER,
    to: [
      "David.mcnamara@hemlyco.com",
      "jon.tenorio@hemlyco.com",
      "hello@hemlyco.com",
    ],
    from: process.env.SENDGRID_SENDER,
    subject: "Requesting " + req.body.action,
    text:
      "Below mentioned are the details for this request: " +
      ".\n\n" +
      "User ID: " +
      req.user.id +
      ".\n" +
      "User email: " +
      req.user.email +
      ".\n" +
      "User name: " +
      req.user.firstname +
      " " +
      req.user.lastname +
      ".\n" +
      "Commision Earned (TBD): " +
      req.body.commission +
      ".\n" +
      "Requesting: " +
      req.body.action +
      ".\n",
  };
  let text = "";
  if (req.body.action == "W-9 Form") {
    text =
      "Thank you for reaching out to submit your W-9 Form. A member of our team will email you shortly for next steps. For additional questions or concerns, please email hello@hemlyco.com.";
  } else if (req.body.action == "1099 form") {
    text =
      "Your Form 1099 for each calendar year will be provided by January 31st of the following year. By January 31st, you will receive an invitation to access your 1099 form for the previous calendar year online through Intuit. For additional questions, or if you did not receive an invitation to view a prior year's 1099 form, please email hello@hemlyco.com.";
  } else {
    const userObject = await User.findOne({ email: req.user.email });

    if (userObject.totalCommission == 0) {
      text =
        "Thank you for your request. It looks like you do not have any commissions to withdraw right now. If you recently completed a project, please allow 30 days from the final sale to withdraw the commission earned. Please note that to withdraw commissions, you will need to submit a W-9 Form. Please see the Submit W-9 Form button to begin the process of submitting your W-9. For additional questions or concerns, please email hello@hemlyco.com.";
    } else {
      text =
        "Your request to withdraw commission has been submitted successfully.";
    }
  }
  sgMail
    .send(data)
    .then((response) => {
      console.log("Response-=-=", response);
      res.status(200).send({
        success: true,
        message: text,
      });
    })
    .catch((error) => {
      console.log("error-=-=", error);

      res.status(422).send({
        success: false,
        message: error.message,
      });
    });
};
module.exports = { sendBusinessEmail };
