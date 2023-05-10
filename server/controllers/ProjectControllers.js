const Project = require("../models/Project");
const SavedItems = require("../models/savedItems");
const User = require("../models/user");
const mongoose = require("mongoose");
var request = require("request");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
const moment = require("moment");
const EmailNotification = require("../models/emailNotification");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const addProject = async (req, res) => {
  let roomCount = 0;
  try {
    User.findOne({ email: req.body.client_email }).then(async (user) => {
      if (user) {
        const promises1 = req.body.projectRooms.map((room) => {
          const newProject = new Project({
            designerId: req.user.id,
            client_firstname: req.body.client_firstname,
            client_lastname: req.body.client_lastname,
            client_email: req.body.client_email,
            projectRooms: room,
            // desiredCompletionDate: req.body.desiredCompletionDate,
            zip: req.body.zip,
            state: req.body.state,
          });
          newProject
            .save()
            .then((project) => {
              roomCount += 1;
            })
            .catch((err) => {
              res.status(404).json({ message: err.message, success: false });
            });
        });
        const numFruits1 = await Promise.all(promises1);

        if (numFruits1.length == req.body.projectRooms.length) {
          res
            .status(200)
            .json({ message: "Project added successfully", success: true });
        } else {
          console.log("roomCount", roomCount);
        }
      } else {
        var options = {
          method: "PUT",
          url: "https://api.sendgrid.com/v3/marketing/contacts",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          },
          body: {
            list_ids: ["ee733e1a-6eae-4a37-9afe-39982e8f457f"],
            contacts: [
              {
                email: req.body.client_email,
                first_name:
                  req.body.client_firstname.charAt(0).toUpperCase() +
                  req.body.client_firstname.slice(1),
                last_name:
                  req.body.client_lastname.charAt(0).toUpperCase() +
                  req.body.client_lastname.slice(1),
                custom_fields: {
                  w4_T:
                    req.user.firstname.charAt(0).toUpperCase() +
                    req.user.firstname.slice(1),
                  w5_T:
                    req.user.lastname.charAt(0).toUpperCase() +
                    req.user.lastname.slice(1),
                  w6_T:
                    process.env.BASEURL +
                    "/clientsignup?email=" +
                    Buffer.from(req.body.client_email).toString("base64"),
                },
              },
            ],
          },
          json: true,
        };
        request(
          options,
          async function (error, response, body) {
            console.log("bdy-=-=", body, response);
            if (error) {
              res.status(404).json({
                message: error.message,
                success: false,
              });
            } else {
              const data = {
                to: req.body.client_email,
                from: process.env.SENDGRID_SENDER,
                subject: `Hello ${
                  req.body.client_firstname.charAt(0).toUpperCase() +
                  req.body.client_firstname.slice(1)
                }, invitation to Hemly`,
                // text:
                //   "Hello " +
                //   req.body.client_firstname.charAt(0).toUpperCase() +
                //   req.body.client_firstname.slice(1) +
                //   "," +
                //   ".\n\n" +
                //   req.user.firstname.charAt(0).toUpperCase() +
                //   req.user.firstname.slice(1) +
                //   " " +
                //   req.user.lastname.charAt(0).toUpperCase() +
                //   req.user.lastname.slice(1) +
                //   " has invited you to join a new home decor project on Hemly. This is a personal website where " +
                //   req.user.firstname.charAt(0).toUpperCase() +
                //   req.user.firstname.slice(1) +
                //   " will be able to work directly with you to help realize your home decor vision! You can click the link below to access your website." +
                //   ".\n\n" +
                //   process.env.BASEURL +
                //   "/clientsignup?email=" +
                //   Buffer.from(req.body.client_email).toString("base64") +
                //   ".\n\n" +
                //   "While we are sure " +
                //   req.user.firstname.charAt(0).toUpperCase() +
                //   req.user.firstname.slice(1) +
                //   " will take care of you, if you ever need anything related to the website, please do not hesitate to reach out to hello@hemlyco.com at any time and a real person will get back to you." +
                //   ".\n\n" +
                //   "Thank you " +
                //   req.body.client_firstname.charAt(0).toUpperCase() +
                //   req.body.client_firstname.slice(1) +
                //   "! And welcome to Hemly!" +
                //   ".\n\n",
                html:
                  `
<div style="width:600px; text-align: center; margin:auto"><div style="font-family: inherit; text-align: center"><span style="font-family: georgia, serif; color: #506372; font-size: 20px"><strong>Hello ${
                    req.body.client_firstname.charAt(0).toUpperCase() +
                    req.body.client_firstname.slice(1)
                  }!</strong></span></div><div style="font-family: inherit; text-align: center"><br></div><div style="font-family: inherit; text-align: center"><span style="font-family: verdana, geneva, sans-serif; color: #506372; font-size: 14px">${
                    req.user.firstname.charAt(0).toUpperCase() +
                    req.user.firstname.slice(1) +
                    " " +
                    req.user.lastname.charAt(0).toUpperCase() +
                    req.user.lastname.slice(1)
                  } has invited you to join a new home decor project on Hemly.</span></div><div style="font-family: inherit; text-align: center"><br></div>` +
                  `<div style="font-family: inherit; text-align: center"><span style="font-family: verdana, geneva, sans-serif; font-size: 14px;color: #506372 ">Please click <a href="${
                    process.env.BASEURL +
                    "/clientsignup?email=" +
                    Buffer.from(req.body.client_email).toString("base64")
                  }">here </a> to access your personal website and project with home décor recommendations directly from ${
                    req.user.firstname.charAt(0).toUpperCase() +
                    req.user.firstname.slice(1)
                  }!</span></div>
          <div style="font-family: inherit; text-align: center"><br></div>
          <div style="font-family: inherit; text-align: center"><span style="font-family: verdana, geneva, sans-serif; font-size: 14px"><a href="${
            process.env.BASEURL +
            "/clientsignup?email=" +
            Buffer.from(req.body.client_email).toString("base64")
          }">${
                    process.env.BASEURL +
                    "/clientsignup?email=" +
                    Buffer.from(req.body.client_email).toString("base64")
                  }</a></span></div>
          <div style="font-family: inherit; text-align: center"><br></div>
          <div style="font-family: inherit; text-align: center"><span style="color: #506372; font-family: verdana, geneva, sans-serif; font-size: 14px">While we are sure ${
            req.user.firstname.charAt(0).toUpperCase() +
            req.user.firstname.slice(1)
          } will take care of you, if you ever need anything related to the website, please do not hesitate to reach out to </span><span style="color: #506372; font-family: verdana, geneva, sans-serif; font-size: 14px">hello@hemlyco.com</span><span style="color: #506372; font-family: verdana, geneva, sans-serif; font-size: 14px"> at any time and a real person will get back to you.</span></div>
          <div style="font-family: inherit; text-align: center"><br></div>
          <div style="font-family: inherit; text-align: center"><span style="color: #506372; font-family: verdana, geneva, sans-serif; font-size: 14px">Welcome to Hemly!</span></div>` +
                  // `<a href='http://13.59.176.130' style="font-family: inherit; text-align: center"><img src='http://localhost:8000/emailImages/Hemly_secondary%20logo_default.png' height='50px' width='100px'/></a>`,

                  `<table style="margin:auto"><tbody><tr><td style="line-height:10px; padding:30px 0px 20px 0px; " valign="top" align="center">
                    <img class="imageTag" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; width: 40%; max-width: 300px !important;"   alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/aea1fc7eb3a3822a/09fcda5e-dee0-4624-bc55-ec9b888a4e91/1345x342.png">
                  </td></tr></tbody></table></div>`,
              };
              sgMail
                .send(data)
                .then(async (response) => {
                  console.log("Response-=-=", response);
                  const promises1 = req.body.projectRooms.map((room) => {
                    const newProject = new Project({
                      designerId: req.user.id,
                      client_firstname: req.body.client_firstname,
                      client_lastname: req.body.client_lastname,
                      client_email: req.body.client_email,
                      projectRooms: room,
                      // desiredCompletionDate: req.body.desiredCompletionDate,
                      zip: req.body.zip,
                      state: req.body.state,
                    });
                    newProject
                      .save()
                      .then((project) => {
                        roomCount += 1;
                      })
                      .catch((err) => {
                        res
                          .status(404)
                          .json({ message: err.message, success: false });
                      });
                  });
                  const numFruits1 = await Promise.all(promises1);

                  if (numFruits1.length == req.body.projectRooms.length) {
                    res.status(200).json({
                      message: "Project added successfully",
                      success: true,
                    });
                  } else {
                    console.log("roomCount", roomCount);
                  }
                })
                .catch((error) => {
                  console.log("error-=-=", error);
                  res.status(422).send({
                    success: false,
                    message: error.message,
                  });
                });
            }
          }
          // });
        );
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const getProject = async (req, res) => {
  try {
    Project.findOne(
      {
        designerId: req.user.id,
        _id: req.body.projectID,
        // "projectRooms.room": req.body.room,
      },

      (err, doc) => {
        if (err) {
          res.status(404).json({ message: err.message, success: false });
        } else {
          console.log("doc-=-=-=-=-=", doc);
          res.status(200).json({
            message: doc,
            success: true,
          });
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const getAllProjects = async (req, res) => {
  try {
    Project.find({
      designerId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .then((projects) => {
        res.status(200).json({ message: projects, success: true });
      });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const getProjects = async (req, res) => {
  try {
    Project.find({
      designerId: req.user.id,
      "projectRooms.completed": false,
    })
      .sort({ createdAt: -1 })
      .then((projects) => {
        res.status(200).json({ message: projects, success: true });
      });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const getCompletedProjects = async (req, res) => {
  try {
    Project.find({
      designerId: req.user.id,
      "projectRooms.completed": true,
    })
      .sort({ updatedAt: -1 })

      .then((projects) => {
        res.status(200).json({ message: projects, success: true });
      });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const saveToProject = async (req, res) => {
  try {
    const newSavedItems = new SavedItems({
      projectId: req.body.projectId,
      MOE_item: req.body.MOE_item,
      room: req.body.room,
      designerId: req.user.id,
    });
    SavedItems.find({
      projectId: req.body.projectId,
      MOE_item: req.body.MOE_item,
      room: req.body.room,
      designerId: req.user.id,
    }).then((docs) => {
      if (docs.length == 0) {
        newSavedItems
          .save()
          .then(async (project) => {
            res.status(200).json({
              message: "Item saved to the project successfully",
              success: true,
            });
            const projectObject = await Project.findOne({
              _id: req.body.projectId,
            });

            console.log("projectObject", projectObject);

            const data = {
              to: projectObject.client_email,
              from: process.env.SENDGRID_SENDER,
              subject: `New update to your Hemly portal: ${moment().format(
                "MMMM Do, YYYY"
              )}`,
              html:
                `<div style="width:600px; text-align: center; margin:auto"><table style="margin:auto"><tbody><tr>
                <td style="font-size:6px; line-height:10px; padding:30px 0px 25px 0px;" valign="top" align="center"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:50% !important; width:50%; height:auto !important;" src="http://cdn.mcauto-images-production.sendgrid.net/aea1fc7eb3a3822a/09fcda5e-dee0-4624-bc55-ec9b888a4e91/1345x342.png" alt="Ingrid & Anders" width="300" data-responsive="true" data-proportionally-constrained="false"></td></tr></tbody></table>` +
                `<div style="font-family: inherit; text-align: center"><span style="color: #506372; font-family: georgia, serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 700; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-size: 16px">Hi ${
                  projectObject.client_firstname.charAt(0).toUpperCase() +
                  projectObject.client_firstname.slice(1)
                }! ${
                  req.user.firstname.charAt(0).toUpperCase() +
                  req.user.firstname.slice(1) +
                  " " +
                  req.user.lastname.charAt(0).toUpperCase() +
                  req.user.lastname.slice(1)
                } has updated your Hemly portal with new items. Please click </span>` +
                `<span style="color: #506372; font-family: georgia, serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 700; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-size: 16px">` +
                `<a href=${process.env.BASEURL}>here</a>` +
                `<span style="color: #506372; font-family: georgia, serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 700; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-size: 16px"> to login or follow the link below to review your new items</span></div>` +
                `<div style="font-family: inherit; text-align: center"><br></div><div style="font-family: inherit; text-align: center">${process.env.BASEURL}</div>` +
                `<div style="font-family: inherit; text-align: center"><br></div>` +
                `<div style="font-family: inherit; text-align: center"><span style="color: #506372; font-size: 14px; font-family: verdana, geneva, sans-serif">Please let us know if you have any questions or concerns at hello@hemlyco.com</span></div></div>`,
            };

            const emailNotificationObject = await EmailNotification.findOne({
              senderId: req.user.id,
              receiverEmail: projectObject.client_email,
              action: "add new item",
            });

            if (!emailNotificationObject) {
              const newEmailNotification = new EmailNotification({
                senderId: req.user.id,
                receiverEmail: projectObject.client_email,
                action: "add new item",
              });
              newEmailNotification
                .save()
                .then(async (notification) => {
                  sgMail
                    .send(data)
                    .then(async (response) => {
                      // res.status(200).json({
                      //   message: "Item saved to the project successfully",
                      //   success: true,
                      // });
                    })
                    .catch((error) => {
                      console.log("error-=-=", error);
                      // res.status(422).send({
                      //   success: false,
                      //   message: error.message,
                      // });
                    });
                })
                .catch((err) => {
                  console.log("error-=-=", err);

                  // res
                  //   .status(400)
                  //   .json({ message: err.message, success: false });
                });
            } else {
              if (moment().isAfter(emailNotificationObject.sendTime, "day")) {
                sgMail
                  .send(data)
                  .then(async (response) => {
                    EmailNotification.findOneAndUpdate(
                      {
                        senderId: req.user.id,
                        receiverEmail: projectObject.client_email,
                        action: "add new item",
                      },
                      { $set: { sendTime: moment() } },

                      function (err, docs) {
                        if (err) {
                          console.log(err);

                          // res.status(400).json({
                          //   message: err.message,
                          //   success: false,
                          // });
                        } else {
                          //   res.status(200).json({
                          //     message: "Item saved to the project successfully",
                          //     success: true,
                          //   });
                        }
                        console.log(docs);
                      }
                    );
                  })
                  .catch((error) => {
                    console.log("error-=-=", error);
                    // res.status(422).send({
                    //   success: false,
                    //   message: error.message,
                    // });
                  });
              } else {
                res.status(200).json({
                  message: "Item saved to the project successfully",
                  success: true,
                });
              }
            }
          })
          .catch((err) => {
            res.status(400).json({ message: err.message, success: false });
          });
      } else {
        res.status(404).json({
          message: "Item already added to the project",
          success: true,
        });
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const getSavedItems = async (req, res) => {
  try {
    let projectId = req.body.projectId;

    SavedItems.aggregate(
      [
        {
          $match: {
            $and: [
              {
                projectId: mongoose.Types.ObjectId(projectId),
                // designerId: mongoose.Types.ObjectId(designerId),
                room: {
                  $regex: `.*${req.body.room}*.`,
                  $options: "i",
                },
              },
            ],
          },
        },

        {
          $lookup: {
            from: "coreproductinfos",
            localField: "MOE_item",
            foreignField: "MOE_item",
            as: "productinfo",
          },
        },
        { $unwind: "$productinfo" },

        {
          $lookup: {
            from: "inventorydetails",
            localField: "productinfo.UPC",
            foreignField: "UPC_Code",
            as: "InventoryDetails",
          },
        },
        {
          $lookup: {
            from: "productpricings",
            localField: "productinfo.UPC",
            foreignField: "UPC",
            as: "pricing",
          },
        },
        { $unwind: "$InventoryDetails" },
        { $sort: { createdAt: -1 } },
      ],
      (err, docs) => {
        if (err) {
          console.log("error in fetching-=-=-=", err);
          res.status(404).json({ message: err.message, success: false });
        } else {
          res.status(200).json({ message: docs, success: true });
        }
      }
    );
  } catch (error) {
    console.log("error-=-=-=", error);

    res.status(404).json({ message: error.message, success: false });
  }
};
const removeFromProject = async (req, res) => {
  try {
    let projectId = req.body.projectId,
      MOE_item = req.body.MOE_item,
      room = req.body.room,
      designerId = req.user.id;
    console.log("designerId-=-=-", designerId);
    SavedItems.findOneAndRemove(
      {
        projectId: projectId,
        MOE_item: MOE_item,
        room: room,
        designerId: designerId,
      },
      (err, deletedDocs) => {
        if (err) {
          res.status(404).json({ message: err.message, success: false });
        } else {
          res.status(200).json({
            message: "Item removed from the project successfully",
            success: true,
          });
        }
      }
    );
  } catch (error) {
    console.log("error-=-=-=", error);

    res.status(404).json({ message: error.message, success: false });
  }
};
const getclientProjects = async (req, res) => {
  try {
    Project.find({
      client_email: req.user.email,
      "projectRooms.completed": false,
    })
      .sort({ createdAt: -1 })
      .then((projects) => {
        res.status(200).json({ message: projects, success: true });
      });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const getCompletedclientProjects = async (req, res) => {
  try {
    Project.find({
      client_email: req.user.email,
      "projectRooms.completed": true,
    })

      .sort({ updatedAt: -1 })
      .then((projects) => {
        res.status(200).json({ message: projects, success: true });
      });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const getTotalCompletedProjects = async (req, res) => {
  try {
    Project.find({
      designerId: req.user.id,
      "projectRooms.completed": true,
    })
      .count()
      .then((count) => {
        res.status(200).json({ message: count, success: true });
      });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const likeItem = async (req, res) => {
  try {
    SavedItems.findOneAndUpdate(
      {
        projectId: req.body.projectId,
        MOE_item: req.body.MOE_item,
        room: req.body.room,
      },
      { $set: { liked: true } },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(404).json({ message: err.message, success: false });
        } else {
          res.status(200).json({
            message: "Item liked successfully",
            success: true,
          });
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const passItem = async (req, res) => {
  try {
    SavedItems.findOneAndUpdate(
      {
        projectId: req.body.projectId,
        MOE_item: req.body.MOE_item,
        room: req.body.room,
      },
      { $set: { liked: false } },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(404).json({ message: err.message, success: false });
        } else {
          res.status(200).json({
            message: "Item passed successfully",
            success: true,
          });
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const updateProjectStatus = async (req, res) => {
  try {
    Project.findOneAndUpdate(
      {
        designerId: req.user.id,
        _id: req.body.projectID,
        "projectRooms.room": req.body.room,
      },
      { $set: { "projectRooms.completed": req.body.status } },
      { new: true },

      (err, doc) => {
        if (err) {
          res.status(404).json({ message: err.message, success: false });
        } else {
          console.log("doc-=-=-=-=-=", doc);
          res.status(200).json({
            message: "Project updated successfully",
            success: true,
          });
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const getLikedItems = async (req, res) => {
  try {
    let projectId = req.body.projectId;

    SavedItems.aggregate(
      [
        {
          $match: {
            $and: [
              {
                projectId: mongoose.Types.ObjectId(projectId),
                // designerId: mongoose.Types.ObjectId(designerId),
                room: {
                  $regex: `.*${req.body.room}*.`,
                  $options: "i",
                },
                liked: true,
              },
            ],
          },
        },

        {
          $lookup: {
            from: "coreproductinfos",
            localField: "MOE_item",
            foreignField: "MOE_item",
            as: "productinfo",
          },
        },
        { $unwind: "$productinfo" },

        {
          $lookup: {
            from: "inventorydetails",
            localField: "productinfo.UPC",
            foreignField: "UPC_Code",
            as: "InventoryDetails",
          },
        },
        {
          $lookup: {
            from: "productpricings",
            localField: "productinfo.UPC",
            foreignField: "UPC",
            as: "pricing",
          },
        },
        { $unwind: "$InventoryDetails" },
        { $sort: { createdAt: -1 } },
      ],
      (err, docs) => {
        if (err) {
          console.log("error in fetching-=-=-=", err);
          res.status(404).json({ message: err.message, success: false });
        } else {
          res.status(200).json({ message: docs, success: true });
        }
      }
    );
  } catch (error) {
    console.log("error-=-=-=", error);

    res.status(404).json({ message: error.message, success: false });
  }
};
const getPassedItems = async (req, res) => {
  try {
    let projectId = req.body.projectId;

    SavedItems.aggregate(
      [
        {
          $match: {
            $and: [
              {
                projectId: mongoose.Types.ObjectId(projectId),
                // designerId: mongoose.Types.ObjectId(designerId),
                room: {
                  $regex: `.*${req.body.room}*.`,
                  $options: "i",
                },
                liked: false,
              },
            ],
          },
        },

        {
          $lookup: {
            from: "coreproductinfos",
            localField: "MOE_item",
            foreignField: "MOE_item",
            as: "productinfo",
          },
        },
        { $unwind: "$productinfo" },

        {
          $lookup: {
            from: "inventorydetails",
            localField: "productinfo.UPC",
            foreignField: "UPC_Code",
            as: "InventoryDetails",
          },
        },
        {
          $lookup: {
            from: "productpricings",
            localField: "productinfo.UPC",
            foreignField: "UPC",
            as: "pricing",
          },
        },
        { $unwind: "$InventoryDetails" },
        { $sort: { createdAt: -1 } },
      ],
      (err, docs) => {
        if (err) {
          console.log("error in fetching-=-=-=", err);
          res.status(404).json({ message: err.message, success: false });
        } else {
          res.status(200).json({ message: docs, success: true });
        }
      }
    );
  } catch (error) {
    console.log("error-=-=-=", error);

    res.status(404).json({ message: error.message, success: false });
  }
};

const getProjectswithSavedItem = async (req, res) => {
  try {
    SavedItems.find({
      designerId: req.user.id,
      MOE_item: req.body.MOE_item,
    })
      .sort({ createdAt: -1 })
      .then((projects) => {
        res.status(200).json({ message: projects, success: true });
      });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
module.exports = {
  addProject,
  getAllProjects,
  getProjects,
  saveToProject,
  getSavedItems,
  removeFromProject,
  getclientProjects,
  likeItem,
  passItem,
  updateProjectStatus,
  getCompletedProjects,
  getCompletedclientProjects,
  getTotalCompletedProjects,
  getLikedItems,
  getPassedItems,
  getProject,
  getProjectswithSavedItem,
};
