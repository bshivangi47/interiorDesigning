import axios from "axios";
import apiURLs, {
  uploadProductCSV,
  uploadInventoryCSV,
  getDesigners,
  addCommissions,
  getTotalDesigner,
  newProjectsperDesigner,
  savedItemsperProject,
  perdesignerPurchase,
  perclientPurchase,
  perProjectPurchase,
  spendperDesigner,
  getTotalDesignerByTimeRange,
  getTotalProjectsTimeRange,
} from "../apiURL/apiURL";
import { returnErrors } from "./errorActions";
import {
  UPLOAD_PRODUCT_CSV_SUCCESS,
  UPLOAD_PRODUCT_CSV_ERROR,
  UPLOAD_INVENTORY_CSV_SUCCESS,
  UPLOAD_INVENTORY_CSV_ERROR,
  ADD_COMMISSION_SUCCESS,
  ADD_COMMISSION_ERROR,
  GET_DESIGNER_SUCCESS,
  GET_DESIGNER_ERROR,
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
} from "./type";

export const UploadProductCSV = (file) => (dispatch) => {
  let fd = new FormData();
  fd.append("CSVFile", file);
  axios
    .post(apiURLs + uploadProductCSV, fd, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      dispatch({ type: UPLOAD_PRODUCT_CSV_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPLOAD_PRODUCT_CSV_ERROR"
        )
      );
      dispatch({ type: UPLOAD_PRODUCT_CSV_ERROR, payload: err.response.data });
    });
};
export const UploadInventoryCSV = (file) => (dispatch) => {
  let fd = new FormData();
  fd.append("CSVFile", file);
  axios
    .post(apiURLs + uploadInventoryCSV, fd, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      dispatch({ type: UPLOAD_INVENTORY_CSV_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPLOAD_INVENTORY_CSV_ERROR"
        )
      );
      dispatch({
        type: UPLOAD_INVENTORY_CSV_ERROR,
        payload: err.response.data,
      });
    });
};
export const GetDesigners = () => (dispatch) => {
  axios
    .get(apiURLs + getDesigners, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      dispatch({ type: GET_DESIGNER_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_DESIGNER_ERROR"
        )
      );
      dispatch({
        type: GET_DESIGNER_ERROR,
        payload: err.response.data,
      });
    });
};
export const AddCommissions = (email, totalCommission) => (dispatch) => {
  axios
    .post(
      apiURLs + addCommissions,
      { email, totalCommission },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      dispatch({ type: ADD_COMMISSION_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_COMMISSION_ERROR"
        )
      );
      dispatch({
        type: ADD_COMMISSION_ERROR,
        payload: err.response.data,
      });
    });
};

export const GetTotalDesigner = () => (dispatch) => {
  axios
    .get(apiURLs + getTotalDesigner, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      dispatch({ type: GET_TOTAL_DESIGNER_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_TOTAL_DESIGNER_ERROR"
        )
      );
      dispatch({
        type: GET_TOTAL_DESIGNER_ERROR,
        payload: err.response.data,
      });
    });
};

export const NewProjectsperDesigner = () => (dispatch) => {
  axios
    .get(apiURLs + newProjectsperDesigner, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      dispatch({
        type: AVERAGE_NEW_PROJECTS_PER_DESIGNER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "AVERAGE_NEW_PROJECTS_PER_DESIGNER_ERROR"
        )
      );
      dispatch({
        type: AVERAGE_NEW_PROJECTS_PER_DESIGNER_ERROR,
        payload: err.response.data,
      });
    });
};

export const SavedItemsperProject = () => (dispatch) => {
  axios
    .get(apiURLs + savedItemsperProject, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      dispatch({
        type: SAVED_ITEMS_PER_PROJECT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "SAVED_ITEMS_PER_PROJECT_ERROR"
        )
      );
      dispatch({
        type: SAVED_ITEMS_PER_PROJECT_ERROR,
        payload: err.response.data,
      });
    });
};

export const PerdesignerPurchase = () => (dispatch) => {
  axios
    .get(apiURLs + perdesignerPurchase, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      dispatch({
        type: PER_DESIGNER_PURCHASE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "PER_DESIGNER_PURCHASE_ERROR"
        )
      );
      dispatch({
        type: PER_DESIGNER_PURCHASE_ERROR,
        payload: err.response.data,
      });
    });
};

export const PerProjectPurchase = () => (dispatch) => {
  axios
    .get(apiURLs + perProjectPurchase, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      dispatch({
        type: PER_PROJECT_PURCHASE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "PER_PROJECT_PURCHASE_ERROR"
        )
      );
      dispatch({
        type: PER_PROJECT_PURCHASE_ERROR,
        payload: err.response.data,
      });
    });
};

export const SpendperDesigner = () => (dispatch) => {
  axios
    .get(apiURLs + spendperDesigner, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      dispatch({
        type: SPEND_PER_DESIGNER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "SPEND_PER_DESIGNER_ERROR"
        )
      );
      dispatch({
        type: SPEND_PER_DESIGNER_ERROR,
        payload: err.response.data,
      });
    });
};

export const GetTotalDesignerByTimeRange =
  (startDate, endDate) => (dispatch) => {
    console.log("GetTotalDesignerByTimeRange-=-=", startDate, endDate);
    axios
      .post(
        apiURLs + getTotalDesignerByTimeRange,
        {
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: TOTAL_DESIGNERS_BY_TIMERANGE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "TOTAL_DESIGNERS_BY_TIMERANGE_ERROR"
          )
        );
        dispatch({
          type: TOTAL_DESIGNERS_BY_TIMERANGE_ERROR,
          payload: err.response.data,
        });
      });
  };

export const GetTotalProjectsTimeRange = (startDate, endDate) => (dispatch) => {
  axios
    .post(
      apiURLs + getTotalProjectsTimeRange,
      {
        startDate,
        endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: TOTAL_PROJECTS_BY_TIMERANGE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "TOTAL_PROJECTS_BY_TIMERANGE_ERROR"
        )
      );
      dispatch({
        type: TOTAL_PROJECTS_BY_TIMERANGE_ERROR,
        payload: err.response.data,
      });
    });
};
