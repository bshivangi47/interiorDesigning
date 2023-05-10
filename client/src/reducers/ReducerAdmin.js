import {
  UPLOAD_PRODUCT_CSV_SUCCESS,
  UPLOAD_PRODUCT_CSV_ERROR,
  UPLOAD_INVENTORY_CSV_SUCCESS,
  UPLOAD_INVENTORY_CSV_ERROR,
  GET_DESIGNER_SUCCESS,
  GET_DESIGNER_ERROR,
  ADD_COMMISSION_SUCCESS,
  ADD_COMMISSION_ERROR,
  GET_TOTAL_DESIGNER_SUCCESS,
  GET_TOTAL_DESIGNER_ERROR,
  AVERAGE_NEW_PROJECTS_PER_DESIGNER_SUCCESS,
  AVERAGE_NEW_PROJECTS_PER_DESIGNER_ERROR,
  SAVED_ITEMS_PER_PROJECT_SUCCESS,
  SAVED_ITEMS_PER_PROJECT_ERROR,
  PER_DESIGNER_PURCHASE_SUCCESS,
  PER_DESIGNER_PURCHASE_ERROR,
  PER_PROJECT_PURCHASE_SUCCESS,
  PER_PROJECT_PURCHASE_ERROR,
  SPEND_PER_DESIGNER_SUCCESS,
  SPEND_PER_DESIGNER_ERROR,
  TOTAL_DESIGNERS_BY_TIMERANGE_SUCCESS,
  TOTAL_DESIGNERS_BY_TIMERANGE_ERROR,
  TOTAL_PROJECTS_BY_TIMERANGE_SUCCESS,
  TOTAL_PROJECTS_BY_TIMERANGE_ERROR,
} from "../actions/type";

const initialState = {
  Productmessage: "",
  Productsuccess: false,
  Inventorymessage: "",
  Inventorysuccess: false,
  getDesignermessage: "",
  getDesignersuccess: false,
  addCommission: {
    message: "",
    success: false,
  },
  totalDesigner: {
    message: "",
    success: false,
  },
  newProjectsperDesigner: {
    message: "",
    success: false,
  },
  savedItemsPerProject: {
    message: "",
    success: false,
  },
  perDesignerPurchase: {
    message: "",
    success: false,
  },
  perProjectPurchase: {
    message: "",
    success: false,
  },
  spendPerDesigner: {
    message: "",
    success: false,
  },
  totalDesignersByTimeRange: {
    message: "",
    success: false,
  },
  totalProjectsByTimeRange: {
    message: "",
    success: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPLOAD_PRODUCT_CSV_SUCCESS:
    case UPLOAD_PRODUCT_CSV_ERROR:
      return {
        ...state,
        Productmessage: action.payload.message,
        Productsuccess: action.payload.success,
      };
    case UPLOAD_INVENTORY_CSV_SUCCESS:
    case UPLOAD_INVENTORY_CSV_ERROR:
      return {
        ...state,
        Inventorymessage: action.payload.message,
        Inventorysuccess: action.payload.success,
      };
    case GET_DESIGNER_SUCCESS:
    case GET_DESIGNER_ERROR:
      return {
        ...state,
        getDesignermessage: action.payload.message,
        getDesignersuccess: action.payload.success,
      };
    case ADD_COMMISSION_SUCCESS:
    case ADD_COMMISSION_ERROR:
      return {
        ...state,
        addCommission: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case GET_TOTAL_DESIGNER_SUCCESS:
    case GET_TOTAL_DESIGNER_ERROR:
      return {
        ...state,
        totalDesigner: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case AVERAGE_NEW_PROJECTS_PER_DESIGNER_SUCCESS:
    case AVERAGE_NEW_PROJECTS_PER_DESIGNER_ERROR:
      return {
        ...state,
        newProjectsperDesigner: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case SAVED_ITEMS_PER_PROJECT_SUCCESS:
    case SAVED_ITEMS_PER_PROJECT_ERROR:
      return {
        ...state,
        savedItemsPerProject: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case PER_DESIGNER_PURCHASE_SUCCESS:
    case PER_DESIGNER_PURCHASE_ERROR:
      return {
        ...state,
        perDesignerPurchase: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case PER_PROJECT_PURCHASE_SUCCESS:
    case PER_PROJECT_PURCHASE_ERROR:
      return {
        ...state,
        perProjectPurchase: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case SPEND_PER_DESIGNER_SUCCESS:
    case SPEND_PER_DESIGNER_ERROR:
      return {
        ...state,
        spendPerDesigner: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case TOTAL_DESIGNERS_BY_TIMERANGE_SUCCESS:
    case TOTAL_DESIGNERS_BY_TIMERANGE_ERROR:
      return {
        ...state,
        totalDesignersByTimeRange: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case TOTAL_PROJECTS_BY_TIMERANGE_SUCCESS:
    case TOTAL_PROJECTS_BY_TIMERANGE_ERROR:
      return {
        ...state,
        totalProjectsByTimeRange: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    default:
      return state;
  }
}
