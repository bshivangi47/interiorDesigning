const CoreProductInfo = require("../models/coreProductInformation");
const CartonInfo = require("../models/cartonInformation");
const ProductPricing = require("../models/productPricing");
const ExtraProductInfo = require("../models/extraProductInfo");
const InventoryDetails = require("../models/inventoryDetails");
const Users = require("../models/user");
const Project = require("../models/Project");
const SavedItems = require("../models/savedItems");
const XLSX = require("xlsx");
const path = require("path");
const mongoose = require("mongoose");
const moment = require("moment");
const Order = require("../models/Orders");

const uploadProductCSV = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: "Please upload a file", success: false });
    } else {
      const coreproduct = await CoreProductInfo.remove();
      const carton = await CartonInfo.remove();
      const product_Pricing = await ProductPricing.remove();
      const ExtraProduct = await ExtraProductInfo.remove();
      console.log("coreproduct-=-=-=", coreproduct.length);
      console.log("carton-=-=-=", carton.length);
      console.log("product_Pricing-=-=-=", product_Pricing.length);
      console.log("ExtraProduct-=-=-=", ExtraProduct.length);

      var filePath = path.join(
        __dirname,
        "..",
        "/uploads",
        `/${file.filename}`
      );
      var workbook = XLSX.readFile(filePath);
      var sheet_name_list = workbook.SheetNames;
      var xlDataSheet1 = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]],
        {
          raw: true, // Use raw values (true) or formatted strings (false)
          header: 1, // Generate an array of arrays ("2D Array")
        }
      );
      var xlDataSheet2 = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[1]],
        {
          raw: true, // Use raw values (true) or formatted strings (false)
          header: 1, // Generate an array of arrays ("2D Array")
        }
      );
      var xlDataSheet3 = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[2]],
        {
          raw: true, // Use raw values (true) or formatted strings (false)
          header: 1, // Generate an array of arrays ("2D Array")
        }
      );
      var xlDataSheet4 = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[3]],
        {
          raw: true, // Use raw values (true) or formatted strings (false)
          header: 1, // Generate an array of arrays ("2D Array")
        }
      );
      // for (const [i, row] of xlDataSheet1.entries())
      const promises1 = xlDataSheet1.map(async (row, i) => {
        if (i > 5) {
          let productImagesLinks = [];
          let Materials = [];
          let featuresBenefits = [];
          await row.map((cellValue, index) => {
            if (index > 2 && index < 7) {
              Materials.push(cellValue);
            }
            if (index >= 21 && index < 25) {
              featuresBenefits.push(cellValue);
            }
            if (index > 26 && index < row.length) {
              productImagesLinks.push(cellValue);
            }
          });
          const newCoreProductInfo = new CoreProductInfo({
            MOE_item: row[0],
            MOE_productName: row[1],
            UPC: row[2],
            Materials: [...Materials],
            dimension: {
              width: row[7],
              depth: row[8],
              height: row[9],
              weight: row[10],
              fourthDimension: row[11],
            },
            grouping: {
              color: row[12],
              category: row[13],
              style: row[14],
            },
            warrantyCompliance: {
              proposition65Compliance: row[15],
              proposition65Chemical: row[16],
              warranty: row[17],
              moeHospitalityApproved: row[18],
              countryOfManufacture: row[19],
            },
            SEO: {
              shortDescription: row[20],
              featuresBenefits: [...featuresBenefits],
              longWebDescription: row[25],
              searchKeywords: row[26],
            },
            productImagesLinks: [...productImagesLinks],
          });
          //   console.log("i-=-=-=-=-=", i);
          //   console.log("row-=-=-=-=-=", row.length);
          await newCoreProductInfo
            .save()
            .then((docs) => {
              sheet1Completed = true;
            })
            .catch((er) => {
              sheet1Completed = false;
            });
        }
      });
      const promises2 = xlDataSheet2.map(async (row, i) => {
        if (i > 2) {
          const newCartonInfo = new CartonInfo({
            MOE_item: row[0],
            MOE_productName: row[1],
            UPC: row[2],
            QtyOfCarton_Item: row[3],
            Carton1: {
              width: row[4],
              depth: row[5],
              height: row[6],
              weight: row[7],
            },
            Carton2: {
              width: row[8],
              depth: row[9],
              height: row[10],
              weight: row[11],
            },
            Carton3: {
              width: row[12],
              depth: row[13],
              height: row[14],
              weight: row[15],
            },
            Carton4: {
              width: row[16],
              depth: row[17],
              height: row[18],
              weight: row[19],
            },
            Carton5: {
              width: row[20],
              depth: row[21],
              height: row[22],
              weight: row[23],
            },
            Carton6: {
              width: row[24],
              depth: row[25],
              height: row[26],
              weight: row[27],
            },
            shippingMethod: row[28],
            OverSizeSmallParcel: row[29],
            LeadTime: row[30],
            FreightClass: row[31],
            CBM_ITEM: row[32],
            CBF_ITEM: row[33],
          });
          //   console.log("i-=-=-=-=-=", i);
          //   console.log("row-=-=-=-=-=", row.length);
          await newCartonInfo
            .save()
            .then((docs) => {
              sheet2Completed = true;
            })
            .catch((er) => {
              sheet2Completed = false;
            });
        }
      });
      const promises3 = xlDataSheet3.map(async (row, i) => {
        if (i > 2) {
          const newExtraProductInfo = new ExtraProductInfo({
            MOE_item: row[0],
            MOE_productName: row[1],
            UPC: row[2],
            PRODUCT_TYPE: row[3],
            MAIN_MATERIAL: row[4],
            UPHOLSTERY_MATERIAL: row[5],
            FRAME_MATERIAL: row[6],
            FRAME_MATERIAL_VARIETY: row[7],
            COMPOSITE_WOOD_PRODUCT: row[8],
            RECYCLED_CONTENT: row[9],
            RECLAIMED_WOOD: row[10],
            DISTRESSED_FINISH: row[11],
            UPHOLSTERY_COLOR: row[12],
            CLEANING_CODE: row[13],
            RUB_COUNT: row[14],
            TUFTED_UPHOLSTERY: row[15],
            SEAT_MATERIAL: row[16],
            SEAT_MATERIAL_VARIETY: row[17],
            REMOVABLE_CUSHIONS: row[18],
            REVERSIBLE_CUSHIONS: row[19],
            SEAT_CUSHION_FILL_MATERIAL: row[20],
            BACK_CUSHION_FILL: row[21],
            SEAT_WIDTH: row[22],
            SEAT_DEPTH: row[23],
            SEAT_HEIGHT: row[24],
            SWIVEL: row[25],
            ARMS: row[26],
            ARM_MATERIAL: row[27],
            ARM_DEPTH: row[28],
            ARM_HEIGHT: row[29],
            ARM_WIDTH: row[30],
            PRODUCT_HAS_A_BACK: row[31],
            BACK_HEIGHT: row[32],
            SEATING_CAPACITY: row[33],
            WEIGHT_CAPACITY_LBS: row[34],
            LEG_GLIDES: row[35],
            FEET_MATERIAL: row[36],
            ASSEMBLY_REQUIRED: row[37],
            SUGGESTED_OF_PEOPLE: row[38],
            ESTIMATED_TIME_TO_ASSEMBLE: row[39],
            ADDITIONAL_TOOLS_REQUIRED: row[40],
            TOOLS_NEEDED: row[41],
            MAIN_MATERIAL_VARIETY: row[42],
            WOOD_FINISH: row[43],
            GLOSS_LEVEL: row[44],
            UPHOLSTERED: row[45],
            ARM_DEPTH_FRONT_TO_BACK: row[46],
            ARM_HEIGHT_SEAT_TO_ARM: row[47],
            ARM_WIDTH_SIDE_TO_SIDE: row[48],
            BACK_HEIGHT_TOP_TO_BOTTOM: row[49],
            SEAT_WIDTH_SIDE_TO_SIDE: row[50],
            SEAT_DEPTH_FRONT_TO_BACK: row[51],
            STACKABLE: row[52],
            ADJUSTABLE_HEIGHT: row[53],
            PNEUMATIC_HYDRAULIC_LIFT: row[54],
            FOOTREST: row[55],
            FOOTREST_DISTANCE_TO_FLOOR: row[56],
            FOOTREST_DISTANCE_TO_SEAT: row[57],
            OUTDOOR_USE: row[58],
            UPHOLSTERY_FILL_MATERIAL: row[59],
            FOOTBOARD: row[60],
            FOOTBOARD_WIDTH: row[61],
            FOOTBOARD_DEPTH: row[62],
            FOOTBOARD_HEIGHT: row[63],
            HEADBOARD: row[64],
            HEADBOARD_WIDTH: row[65],
            HEADBOARD_DEPTH: row[66],
            HEADBOARD_HEIGHT: row[67],
            CENTER_SUPPORT_LEGS: row[68],
            LEGS: row[69],
            LEG_HEIGHT: row[70],
            UNDER_BED_STORAGE: row[71],
            BED_TYPE_OF_STORAGE: row[72],
            FINISHED_BACK: row[73],
            SLATS_REQUIRED: row[74],
            SLATS_INCLUDED: row[75],
            HEIGHT_UNDER_BED: row[76],
            HEIGHT_FLOOR_TO_TOP_OF_SIDE_RAIL: row[77],
            TOP_OF_HEADBOARD_TO_BEDFRAME: row[78],
            STORAGE_COMPARTMENT: row[79],
            STORAGE_COMPARTMENT_DEPTH: row[80],
            STORAGE_COMPARTMENT_WIDTH: row[81],
            STORAGE_COMPARTMENT_HEIGHT: row[82],
            DISTANCE_BETWEEN_LEGS_SHORT_SIDE: row[83],
            DISTANCE_BETWEEN_LEGS_LONG_SIDE: row[84],
            LEG_TO_EDGE: row[85],
            CASTERS_INCLUDED: row[86],
            TOP_THICKNESS: row[87],
            DRAWER_COUNT: row[88],
            FILE_FOLDER_DRAWER: row[89],
            FILE_FOLDER_DRAWER_WIDTH: row[90],
            FILE_FOLDER_DRAWER_DEPTH: row[91],
            FILE_FOLDER_DRAWER_HEIGHT: row[92],
            DRAWER_WIDTH: row[93],
            DRAWER_DEPTH: row[94],
            DRAWER_HEIGHT: row[95],
            DRAWER_WEIGHT_CAPACITY_LBS: row[96],
            FELT_LINED_DRAWERS: row[97],
            DRAWER_GLIDE_MECHANISM: row[98],
            DRAWER_SAFETY_STOP: row[99],
            SOFT_CLOSE_DRAWER_GLIDES: row[100],
            HARDWARE_FINISH: row[101],
            HARDWARE_MATERIAL: row[102],
            BUILT_IN_OUTLETS: row[103],
            CABLE_MANAGEMENT: row[104],
            HEIGHT_ADJUSTMENT: row[105],
            KEYBOARD_TRAY: row[106],
            KNEE_SPACE_DEPTH: row[107],
            KNEE_SPACE_HEIGHT: row[108],
            KNEE_SPACE_WIDTH: row[109],
            INTERIOR_SHELVES: row[110],
            NUMBER_OF_INTERIOR_SHELVES: row[111],
            ADJUSTABLE_INTERIOR_SHELVING: row[112],
            INTERIOR_SHELF_WIDTH: row[113],
            INTERIOR_SHELF_DEPTH: row[114],
            INTERIOR_SHELF_HEIGHT: row[115],
            SHELF_WEIGHT_LIMIT: row[116],
            INTERIOR_SHELF_MATERIAL: row[117],
            OPEN_SHELVING: row[118],
            NUMBER_OF_OPEN_SHELVES: row[119],
            DOORS_INCLUDED: row[120],
            NUMBER_OF_DOORS: row[121],
            LOCKING_DOORS: row[122],
            MAGNETIC_DOOR_CATCHES: row[123],
            SLIDING_DOORS: row[124],
            DRAWER_INTERIOR_WIDTH: row[125],
            DRAWER_INTERIOR_DEPTH: row[126],
            DRAWER_INTERIOR_HEIGHT: row[127],
            DRAWER_GLIDE_MATERIAL: row[128],
            SOFT_CLOSE_OR_SELF_CLOSE_DRAWERS: row[129],
            HANDLE_FINISH: row[130],
            TIPOVER_RESTRAINT_DEVICE_INCLUDED: row[131],
            EXTENSION_TABLE: row[132],
            EXTENSION_TABLE_MECHANISM: row[133],
            NUMBER_OF_LEAVES: row[134],
            CLEARANCE: row[135],
            TOP_MATERIAL: row[136],
            TOP_MATERIAL_DETAILS: row[137],
            HAND_PAINTED: row[138],
            FOLDING: row[139],
            NUMBER_OF_BULBS_REQUIRED: row[140],
            BULBS_INCLUDED: row[141],
            BULB_BASE_TYPE: row[142],
            BULB_SHAPE: row[143],
            LED: row[144],
            WATTAGE: row[145],
            DIMMABLE: row[146],
            SWITCH_TYPE: row[147],
            SHADE_INCLUDED: row[148],
            SHADE_MATERIAL: row[149],
            SHADE_COLOR: row[150],
            SHADE_SHAPE: row[151],
            SHADE_HEIGHT: row[152],
            SHADE_WIDTH: row[153],
            SHADE_DEPTH: row[154],
            BASE_HEIGHT: row[155],
            BASE_WIDTH: row[156],
            BASE_DEPTH: row[157],
            CANOPY_INCLUDED: row[158],
            CANOPY_HEIGHT: row[159],
            CANOPY_WIDTH: row[160],
            CANOPY_DEPTH: row[161],
            MINIMUM_HANGING_LENGTH: row[162],
            MAXIMUM_HANGING_LENGTH: row[163],
            CHAIN_LENGTH: row[164],
            CORD_LENGTH: row[165],
            DAMP_OR_WET_LOCATION: row[166],
            NUMBER_OF_TABLES_INCLUDED: row[167],
            LARGE_HEIGHT: row[168],
            LARGE_DEPTH_FRONT_TO_BACK: row[169],
            LARGE_WIDTH_SIDE_TO_SIDE: row[170],
            MEDIUM_HEIGHT: row[171],
            MEDIUM_DEPTH_FRONT_TO_BACK: row[172],
            MEDIUM_WIDTH_SIDE_TO_SIDE: row[173],
            SMALL_HEIGHT: row[174],
            SMALL_DEPTH: row[175],
            SMALL_WIDTH: row[176],
            MIRROR_SHAPE: row[177],
            BEVELED_GLASS: row[178],
            HANGING_HARDWARE_REQUIRED: row[179],
            HANGING_HARDWARE_INCLUDED: row[180],
            HANGING_DIRECTION: row[181],
            BASE_MATERIAL: row[182],
            CASTERS: row[183],
            LOCKING_CASTERS: row[184],
            CASTER_MATERIAL: row[185],
            TILT_LOCK: row[186],
            ADJUSTABLE_SEAT_HEIGHT: row[187],
            ADJUSTABLE_SEAT_TYPE: row[188],
            MINIMUM_SEAT_HEIGHT: row[189],
            MAXIMUM_SEAT_HEIGHT: row[190],
            ARM_TYPE: row[191],
            ARM_COLOR: row[192],
            ARMREST_ADJUSTMENT_TYPE: row[193],
            ARMRESTS_MAX_HEIGHT: row[194],
            ARMRESTS_MIN_HEIGHT: row[195],
            BACK_CONSTRUCTION_DETAIL: row[196],
            BACK_ANGLE_ADJUSTMENT: row[197],
            BACK_WIDTH_SIDE_TO_SIDE: row[198],
            LUMBAR_SUPPORT: row[199],
            HEADREST_INCLUDED: row[200],
            FRAME_COLOR: row[201],
            PAINT_TYPE: row[202],
            REVERSE_SIDE_MATERIAL: row[203],
            REVERSE_SIDE_PATTERN: row[204],
            REVERSE_SIDE_COLOR: row[205],
            FILL_MATERIAL: row[206],
            CLOSURE_TYPE: row[207],
            PILLOW_SHAPE: row[208],
            BACKING_MATERIAL: row[209],
            RUG_CONSTRUCTION: row[210],
            FLOOR_HEATING_SAFE: row[211],
            PILE_HEIGHT: row[212],
            RUG_PAD_RECOMMENDED: row[213],
            STAIN_RESISTANT: row[214],
            FADE_RESISTANT: row[215],
            NUMBER_OF_PANELS: row[216],
            CHAISE_INCLUDED: row[217],
            CHAISE_TOTAL_DEPTH: row[218],
            CHAISE_SEAT_DEPTH: row[219],
            CHAISE_TOTAL_HEIGHT: row[220],
            CHAISE_WIDTH: row[221],
            SLEEPER_SECTIONAL: row[222],
            SLEEPER_MATTRESS_LENGTH: row[223],
            SLEEPER_MATTRESS_WIDTH: row[224],
            SLEEPER_MATTRESS_THICKNESS: row[225],
            OTTOMAN_INCLUDED: row[226],
            OTTOMAN_DEPTH: row[227],
            OTTOMAN_WIDTH: row[228],
            SECTIONAL_SOFA_COUNT: row[229],
            SECTIONAL_SOFA_WIDTH: row[230],
            SECTIONAL_SOFA_DEPTH: row[231],
            CORNER_CHAIR: row[232],
            CORNER_CHAIR_WIDTH: row[233],
            CORNER_CHAIR_DEPTH: row[234],
            STEMWARE_RACK: row[235],
            REMOVABLE_WINE_RACK: row[236],
            WINE_RACK_BOTTLE_CAPACITY: row[237],
            HANDMADE: row[238],
            FOOD_SAFE: row[239],
            MINIMUM_DIAMETER: row[240],
            WATERTIGHT: row[241],
            PLANT_SAFE: row[242],
            DRAINAGE_HOLES: row[243],
            LIFT_TYPE: row[244],
            BED_TYPE: row[245],
            STORAGE_INCLUDED: row[246],
            STORAGE_COMPARTMENT_SIZE: row[247],
            BOXSPRING_REQUIRED: row[248],
            TOP_SHAPE: row[249],
            DINING_CHAIR_BACK_TYPE: row[250],
            STORAGE_TYPE: row[251],
            STEMWARE_CAPACITY: row[252],
            WINE_RACK: row[253],
            OPENING_DIAMETER: row[254],
          });
          await newExtraProductInfo
            .save()
            .then((docs) => {
              sheet3Completed = true;
            })
            .catch((er) => {
              sheet3Completed = false;
            });
        }
      });
      // console.log(xlDataSheet4);
      const promises4 = xlDataSheet4.map(async (row, i) => {
        if (i > 2) {
          const newProductPricing = new ProductPricing({
            MOE_item: row[0],
            MOE_productName: row[1],
            UPC: row[2],
            QtyinSet: row[3],
            ECommerceCost: row[4],
            Map: row[5],
            PriceUnit: row[6],
          });
          await newProductPricing
            .save()
            .then((docs) => {
              sheet4Completed = true;
            })
            .catch((er) => {
              sheet4Completed = false;
            });
        }
      });
      // if (
      //   sheet1Completed == true &&
      //   sheet2Completed == true &&
      //   sheet3Completed == true &&
      //   sheet4Completed == true
      // ) {
      const numFruits1 = await Promise.all(promises1);
      const numFruits2 = await Promise.all(promises2);
      const numFruits3 = await Promise.all(promises3);
      const numFruits4 = await Promise.all(promises4);
      if (
        numFruits1.length == xlDataSheet1.length &&
        numFruits2.length == xlDataSheet2.length &&
        numFruits3.length == xlDataSheet3.length &&
        numFruits4.length == xlDataSheet4.length
      ) {
        res
          .status(200)
          .json({ message: "File uploaded successfully", success: true });
      } else {
        res.status(400).json({
          message:
            "Something went wrong with uploading file. Please try again!",
          success: false,
        });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const uploadInventoryCSV = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: "Please upload a file", success: false });
    } else {
      const inventoryDetails = await InventoryDetails.remove();
      var filePath = path.join(
        __dirname,
        "..",
        "/uploads",
        `/${file.filename}`
      );
      var workbook = XLSX.readFile(filePath);
      var sheet_name_list = workbook.SheetNames;
      var xlDataSheet1 = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]],
        {
          raw: false, // Use raw values (true) or formatted strings (false)
          // header: 1, // Generate an array of arrays ("2D Array")
        }
      );
      console.log(xlDataSheet1);
      const promises1 = xlDataSheet1.map(async (row, i) => {
        const newInventoryDetails = new InventoryDetails(row);
        //   console.log("i-=-=-=-=-=", i);
        //   console.log("row-=-=-=-=-=", row.length);
        await newInventoryDetails.save();
      });
      const numFruits1 = await Promise.all(promises1);
      if (numFruits1.length == xlDataSheet1.length) {
        res
          .status(200)
          .json({ message: "File uploaded successfully", success: true });
      } else {
        res.status(400).json({
          message:
            "Something went wrong with uploading file. Please try again!",
          success: false,
        });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const getDesigners = async (req, res) => {
  try {
    Users.find({ role: "designer" })
      .then((docs) => {
        res.status(200).json({ message: docs, success: true });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message, success: false });
      });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const getClients = async (req, res) => {
  try {
    Users.find({ role: "client" })
      .then((docs) => {
        res.status(200).json({ message: docs, success: true });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message, success: false });
      });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const addCommissions = async (req, res) => {
  try {
    let findDesigner = await Users.findOne({ email: req.body.email });
    if (findDesigner) {
      console.log("findDesigner", findDesigner);
      if (findDesigner.role != "designer") {
        res.status(404).json({
          message:
            findDesigner.role == "client"
              ? "The provided email address belongs to a " + findDesigner.role
              : "The provided email address belongs to an " + findDesigner.role,
          success: false,
        });
      } else {
        Users.findOneAndUpdate(
          { email: req.body.email },
          {
            totalCommission: req.body.totalCommission,
          }
        )
          .then((doc) => {
            res.status(200).json({
              message: "Commission added successfully",
              success: true,
            });
          })
          .catch((err) => {
            res.status(400).json({ message: err.message, success: false });
          });
      }
    } else {
      res.status(404).json({
        message: "No designer found with provided email",
        success: false,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const getTotalDesigner = async (req, res) => {
  try {
    Users.find({ role: "designer" }).then(async (docs) => {
      docs.map((doc) => {
        console.log(
          "date-=-=-=",
          mongoose.Types.ObjectId(doc._id).getTimestamp()
        );
      });
      res.status(200).json({ message: docs.length, success: true });
    });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const getTotalDesignerByTimeRange = async (req, res) => {
  try {
    let designers = [];
    Users.find({ role: "designer" }).then(async (docs) => {
      const promise = docs.map(async (doc) => {
        if (doc.createdAt) {
          if (
            moment(doc.createdAt).isAfter(req.body.startDate) &&
            moment(doc.createdAt).isBefore(req.body.endDate)
          ) {
            designers.push(doc);
          }
        } else {
          if (
            moment(mongoose.Types.ObjectId(doc._id).getTimestamp()).isAfter(
              req.body.startDate
            ) &&
            moment(mongoose.Types.ObjectId(doc._id).getTimestamp()).isBefore(
              req.body.endDate
            )
          ) {
            designers.push(doc);
          }
        }
      });

      const promiseLength = await Promise.all(promise);
      if (promiseLength.length == docs.length) {
        res.status(200).json({
          message: { total: designers.length, designers },
          success: true,
        });
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const getTotalProjectsTimeRange = async (req, res) => {
  try {
    let Projects = [];
    Project.find({
      $and: [
        { createdAt: { $lte: req.body.endDate } },
        { createdAt: { $gte: req.body.startDate } },
      ],
    }).then(async (docs) => {
      // const promise = docs.map(async (doc) => {
      //   if (doc.createdAt) {
      //     if (
      //       moment(doc.createdAt).isAfter(req.body.startDate) &&
      //       moment(doc.createdAt).isBefore(req.body.endDate)
      //     ) {
      //       Projects.push(doc);
      //     }
      //   } else {
      //     if (
      //       moment(mongoose.Types.ObjectId(doc._id).getTimestamp()).isAfter(
      //         req.body.startDate
      //       ) &&
      //       moment(mongoose.Types.ObjectId(doc._id).getTimestamp()).isBefore(
      //         req.body.endDate
      //       )
      //     ) {
      //       Projects.push(doc);
      //     }
      //   }
      // });

      // const promiseLength = await Promise.all(promise);
      // if (promiseLength.length == docs.length) {
      res.status(200).json({
        message: { total: docs.length, docs },
        success: true,
      });
      // }
    });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const newProjectsperDesigner = async (req, res) => {
  try {
    let totalProjects = await Project.find({
      "projectRooms.completed": false,
    });
    let Designers = await Users.find({ role: "designer" });
    res.status(200).json({
      message: (totalProjects.length / Designers.length).toFixed(2),
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const savedItemsperProject = async (req, res) => {
  try {
    let totalProjects = await Project.count();
    let savedItems = await SavedItems.count();
    res.status(200).json({
      message: (savedItems / totalProjects).toFixed(2),
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const perdesignerPurchase = async (req, res) => {
  try {
    let TotalOrders = await Order.find();

    Order.aggregate(
      [
        {
          $lookup: {
            from: "users",
            localField: "buyerId",
            foreignField: "_id",
            as: "buyerDetails",
          },
        },
        { $unwind: "$buyerDetails" },
        {
          $match: {
            "buyerDetails.role": "designer",
          },
        },
      ],
      (err, docs) => {
        if (err) {
          res.status(404).json({ message: err.message, success: false });
        } else {
          res.status(200).json({
            message: (docs.length / TotalOrders.length).toFixed(4),
            success: true,
          });
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
const perclientPurchase = async (req, res) => {
  try {
    let TotalOrders = await Order.find();

    Order.aggregate(
      [
        {
          $lookup: {
            from: "users",
            localField: "buyerId",
            foreignField: "_id",
            as: "buyerDetails",
          },
        },
        { $unwind: "$buyerDetails" },
        {
          $match: {
            "buyerDetails.role": "client",
          },
        },
      ],
      (err, docs) => {
        if (err) {
          res.status(404).json({ message: err.message, success: false });
        } else {
          console.log("docs", docs.length);
          res.status(200).json({
            message: (docs.length / TotalOrders.length).toFixed(4),
            success: true,
          });
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const perProjectPurchase = async (req, res) => {
  try {
    let TotalProject = await Project.find();

    let orders = await Order.distinct("projectId", {});
    console.log("orders", orders.length);

    res.status(200).json({
      message: (orders.length / TotalProject.length).toFixed(4),
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const spendperDesigner = async (req, res) => {
  try {
    let TotalDesigners = await Users.find({ role: "designer" });
    console.log("totalDesigners-=-=-", TotalDesigners.length);

    Order.aggregate(
      [
        {
          $lookup: {
            from: "productpricings",
            localField: "MOE_ITEM",
            foreignField: "MOE_item",
            as: "pricing",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "buyerId",
            foreignField: "_id",
            as: "buyerDetails",
          },
        },
        { $unwind: "$buyerDetails" },
        { $unwind: "$pricing" },
      ],
      async (err, docs) => {
        if (err) {
          res.status(404).json({ message: err.message, success: false });
        } else {
          let totalSpend = 0;
          const promise = docs.map(async (doc) => {
            if (doc.buyerDetails.role == "client") {
              totalSpend = totalSpend + parseFloat(doc.pricing.Map);
            } else {
              totalSpend = totalSpend + parseFloat(doc.pricing.ECommerceCost);
            }
          });
          const promiseLength = await Promise.all(promise);
          if (promiseLength.length == docs.length) {
            console.log("totalSpend-=-=-=", totalSpend);
            res.status(200).json({
              message: totalSpend / TotalDesigners.length,
              success: true,
            });
          } else {
            res.status(400).json({
              message: "Something went wrong. Please try again",
              success: false,
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const deleteOrders = async (req, res) => {
  try {
    let docsResult = [];

    // SavedItems.aggregate(
    //   [
    //     {
    //       $lookup: {
    //         from: "projects",
    //         localField: "projectId",
    //         foreignField: "_id",
    //         as: "project",
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "users",
    //         localField: "designerId",
    //         foreignField: "_id",
    //         as: "savedBy",
    //       },
    //     },
    //     // { $unwind: "$savedBy" },
    //     // { $unwind: "$project" },
    //   ],
    //   async (err, docs) => {
    //     if (err) {
    //       res.status(404).json({ message: err.message, success: false });
    //     } else {
    //       const promise = docs.map(async (doc) => {
    //         if (doc.project.length == 0 || doc.savedBy.length == 0) {
    //           docsResult.push(doc);
    //         }
    //       });
    //       const promiseLength = await Promise.all(promise);
    //       if (promiseLength.length == docs.length) {
    //         console.log("docs", docsResult.length);

    //         res.status(200).json({
    //           message: docsResult,
    //           success: true,
    //         });
    //       }
    //     }
    //   }
    // );

    Project.aggregate(
      [
        {
          $lookup: {
            from: "users",
            localField: "designerId",
            foreignField: "_id",
            as: "users",
          },
        },
        // {
        //   $lookup: {
        //     from: "users",
        //     localField: "designerId",
        //     foreignField: "_id",
        //     as: "savedBy",
        //   },
        // },
        // { $unwind: "$savedBy" },
        // { $unwind: "$project" },
      ],
      async (err, docs) => {
        if (err) {
          res.status(404).json({ message: err.message, success: false });
        } else {
          const promise = docs.map(async (doc) => {
            if (doc.users.length == 0) {
              docsResult.push(doc);
            }
          });
          const promiseLength = await Promise.all(promise);
          if (promiseLength.length == docs.length) {
            console.log("docs", docsResult.length);

            res.status(200).json({
              message: docsResult,
              success: true,
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

module.exports = {
  uploadProductCSV,
  uploadInventoryCSV,
  getDesigners,
  getClients,
  addCommissions,
  getTotalDesigner,
  getTotalDesignerByTimeRange,
  getTotalProjectsTimeRange,
  newProjectsperDesigner,
  savedItemsperProject,
  perdesignerPurchase,
  perclientPurchase,
  perProjectPurchase,
  deleteOrders,
  spendperDesigner,
};
