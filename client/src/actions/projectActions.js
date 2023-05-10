import axios from "axios";
import apiURL, {
  addProject,
  getProjects,
  saveToProject,
  getSavedItems,
  removeFromProject,
  getclientProjects,
  likeItem,
  passItem,
  getCompletedProjects,
  getCompletedclientProjects,
  getTotalCompletedProjects,
  getLikedItems,
  getPassedItems,
  updateProjectStatus,
  getProject,
  getAllProjects,
  getProjectswithSavedItem,
} from "../apiURL/apiURL";
import { returnErrors } from "./errorActions";
import {
  ADD_PROJECTS_SUCCESS,
  ADD_PROJECTS_ERROR,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_ERROR,
  GET_ALL_PROJECT_SUCCESS,
  GET_ALL_PROJECT_ERROR,
  SAVE_ITEM_TO_PROJECT_SUCCESS,
  SAVE_ITEM_TO_PROJECT_ERROR,
  GET_SAVED_ITEMS_SUCCESS,
  GET_SAVED_ITEMS_ERROR,
  REMOVE_ITEM_TO_PROJECT_SUCCESS,
  REMOVE_ITEM_TO_PROJECT_ERROR,
  GET_CLIENT_PROJECTS_SUCCESS,
  GET_CLIENT_PROJECTS_ERROR,
  LIKE_ITEMS_SUCCESS,
  LIKE_ITEMS_ERROR,
  PASS_ITEMS_SUCCESS,
  PASS_ITEMS_ERROR,
  GET_COMPLETED_PROJECTS_SUCCESS,
  GET_COMPLETED_PROJECTS_ERROR,
  GET_COMPLETED_CLIENT_PROJECTS_SUCCESS,
  GET_COMPLETED_CLIENT_PROJECTS_ERROR,
  GET_TOTAL_COMPLETED_PROJECTS_SUCCESS,
  GET_TOTAL_COMPLETED_PROJECTS_ERROR,
  GET_LIKED_ITEMS_SUCCESS,
  GET_LIKED_ITEMS_ERROR,
  GET_PASSED_ITEMS_SUCCESS,
  GET_PASSED_ITEMS_ERROR,
  UPDATE_PROJECT_STATUS_SUCCESS,
  UPDATE_PROJECT_STATUS_ERROR,
  GET_PROJECTS_WITH_SAVED_ITEM_SUCCESS,
  GET_PROJECTS_WITH_SAVED_ITEM_ERROR,
} from "./type";

export const GetCompletedProjects = () => (dispatch) => {
  axios
    .get(apiURL + getCompletedProjects, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch({ type: GET_COMPLETED_PROJECTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_COMPLETED_PROJECTS_ERROR"
        )
      );
      dispatch({
        type: GET_COMPLETED_PROJECTS_ERROR,
        payload: err.response.data,
      });
    });
};
export const GetTotalCompletedProjects = () => (dispatch) => {
  axios
    .get(apiURL + getTotalCompletedProjects, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_TOTAL_COMPLETED_PROJECTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_TOTAL_COMPLETED_PROJECTS_ERROR"
        )
      );
      dispatch({
        type: GET_TOTAL_COMPLETED_PROJECTS_ERROR,
        payload: err.response.data,
      });
    });
};

export const GetProjects = () => (dispatch) => {
  axios
    .get(apiURL + getProjects, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch({ type: GET_PROJECTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_PROJECTS_ERROR"
        )
      );
      dispatch({ type: GET_PROJECTS_ERROR, payload: err.response.data });
    });
};
export const GetclientProjects = () => (dispatch) => {
  axios
    .get(apiURL + getclientProjects, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch({ type: GET_CLIENT_PROJECTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_CLIENT_PROJECTS_ERROR"
        )
      );
      dispatch({ type: GET_CLIENT_PROJECTS_ERROR, payload: err.response.data });
    });
};
export const GetCompletedclientProjects = () => (dispatch) => {
  axios
    .get(apiURL + getCompletedclientProjects, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_COMPLETED_CLIENT_PROJECTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_COMPLETED_CLIENT_PROJECTS_ERROR"
        )
      );
      dispatch({
        type: GET_COMPLETED_CLIENT_PROJECTS_ERROR,
        payload: err.response.data,
      });
    });
};
export const AddProject = (projectData) => (dispatch) => {
  axios
    .post(apiURL + addProject, projectData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch({ type: ADD_PROJECTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_PROJECTS_ERROR"
        )
      );
      dispatch({ type: ADD_PROJECTS_ERROR, payload: err.response.data });
    });
};
export const SaveToProject = (data) => (dispatch) => {
  axios
    .post(apiURL + saveToProject, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const payloadData = {
        message: res.data.message,
        success: res.data.success,
        MOE_item: data.MOE_item,
      };
      dispatch({ type: SAVE_ITEM_TO_PROJECT_SUCCESS, payload: payloadData });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "SAVE_ITEM_TO_PROJECT_ERROR"
        )
      );
      dispatch({
        type: SAVE_ITEM_TO_PROJECT_ERROR,
        payload: err.response.data,
      });
    });
};

export const GetSavedItems = (data) => (dispatch) => {
  axios
    .post(apiURL + getSavedItems, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch({ type: GET_SAVED_ITEMS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_SAVED_ITEMS_ERROR"
        )
      );
      dispatch({
        type: GET_SAVED_ITEMS_ERROR,
        payload: err.response.data,
      });
    });
};
export const GetLikedItems = (data) => (dispatch) => {
  axios
    .post(apiURL + getLikedItems, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch({ type: GET_LIKED_ITEMS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_LIKED_ITEMS_ERROR"
        )
      );
      dispatch({
        type: GET_LIKED_ITEMS_ERROR,
        payload: err.response.data,
      });
    });
};
export const GetPassedItems = (data) => (dispatch) => {
  axios
    .post(apiURL + getPassedItems, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch({ type: GET_PASSED_ITEMS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_PASSED_ITEMS_ERROR"
        )
      );
      dispatch({
        type: GET_PASSED_ITEMS_ERROR,
        payload: err.response.data,
      });
    });
};
export const RemoveFromProject = (data) => (dispatch) => {
  axios
    .post(apiURL + removeFromProject, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const payloadData = {
        message: res.data.message,
        success: res.data.success,
        MOE_item: data.MOE_item,
      };
      dispatch({ type: REMOVE_ITEM_TO_PROJECT_SUCCESS, payload: payloadData });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "REMOVE_ITEM_TO_PROJECT_ERROR"
        )
      );
      dispatch({
        type: REMOVE_ITEM_TO_PROJECT_ERROR,
        payload: err.response.data,
      });
    });
};

export const LikeItem = (data) => (dispatch) => {
  axios
    .post(apiURL + likeItem, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const payloadData = {
        message: res.data.message,
        success: res.data.success,
        // MOE_item: data.MOE_item,
      };
      dispatch({ type: LIKE_ITEMS_SUCCESS, payload: payloadData });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LIKE_ITEMS_ERROR")
      );
      dispatch({
        type: LIKE_ITEMS_ERROR,
        payload: err.response.data,
      });
    });
};
export const PassItem = (data) => (dispatch) => {
  axios
    .post(apiURL + passItem, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const payloadData = {
        message: res.data.message,
        success: res.data.success,
        // MOE_item: data.MOE_item,
      };
      dispatch({ type: PASS_ITEMS_SUCCESS, payload: payloadData });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "PASS_ITEMS_ERROR")
      );
      dispatch({
        type: PASS_ITEMS_ERROR,
        payload: err.response.data,
      });
    });
};

export const UpdateProjectStatus = (data) => (dispatch) => {
  axios
    .post(apiURL + updateProjectStatus, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const payloadData = {
        message: res.data.message,
        success: res.data.success,
        // MOE_item: data.MOE_item,
      };
      dispatch({ type: UPDATE_PROJECT_STATUS_SUCCESS, payload: payloadData });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_PROJECT_STATUS_ERROR"
        )
      );
      dispatch({
        type: UPDATE_PROJECT_STATUS_ERROR,
        payload: err.response.data,
      });
    });
};
export const GetProject = (data) => (dispatch) => {
  axios
    .post(apiURL + getProject, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const payloadData = {
        message: res.data.message,
        success: res.data.success,
        // MOE_item: data.MOE_item,
      };
      dispatch({ type: GET_PROJECT_SUCCESS, payload: payloadData });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_PROJECT_ERROR"
        )
      );
      dispatch({
        type: GET_PROJECT_ERROR,
        payload: err.response.data,
      });
    });
};

export const GetAllProjects = () => (dispatch) => {
  axios
    .get(apiURL + getAllProjects, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch({ type: GET_ALL_PROJECT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_ALL_PROJECT_ERROR"
        )
      );
      dispatch({ type: GET_ALL_PROJECT_ERROR, payload: err.response.data });
    });
};

export const GetProjectswithSavedItem = (data) => (dispatch) => {
  axios
    .post(apiURL + getProjectswithSavedItem, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_PROJECTS_WITH_SAVED_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_PROJECTS_WITH_SAVED_ITEM_ERROR"
        )
      );
      dispatch({
        type: GET_PROJECTS_WITH_SAVED_ITEM_ERROR,
        payload: err.response.data,
      });
    });
};
