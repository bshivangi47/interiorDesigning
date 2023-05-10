import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  ADD_PROJECTS_SUCCESS,
  ADD_PROJECTS_ERROR,
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
  GET_PROJECT_SUCCESS,
  GET_PROJECT_ERROR,
  GET_ALL_PROJECT_SUCCESS,
  GET_ALL_PROJECT_ERROR,
  GET_PROJECTS_WITH_SAVED_ITEM_SUCCESS,
  GET_PROJECTS_WITH_SAVED_ITEM_ERROR,
} from "../actions/type";

const initialState = {
  currentProjects: [],
  currentProjectsSuccess: false,
  currentProjectsError: null,
  currentCompletedProjects: [],
  currentCompletedProjectsSuccess: false,
  currentCompletedProjectsError: null,

  currentclientProjects: [],
  currentProjectsclientSuccess: false,
  currentProjectsclientError: null,
  currentCompletedclientProjects: [],
  currentCompletedProjectsclientSuccess: false,
  currentCompletedProjectsclientError: null,

  addProjectsMessage: null,
  addProjectsSuccess: null,
  getTotalCompletedProjects: { message: null, success: null },
  saveItemToProjectMessage: null,
  savedItem: null,
  saveItemToProjectSuccess: null,
  getSavedItemsMessage: null,
  getSavedItemsSuccess: null,
  removedItem: null,
  removeSavedItemsMessage: null,
  removeSavedItemsSuccess: null,
  likeItems: {
    message: null,
    success: null,
  },
  passItems: {
    message: null,
    success: null,
  },
  getlikeItems: {
    message: null,
    success: null,
  },
  getpassItems: {
    message: null,
    success: null,
  },
  updateProjectStatus: {
    message: null,
    success: null,
  },
  getProject: {
    message: null,
    success: null,
  },
  getAllProjects: {
    message: null,
    success: null,
  },
  getProjectswithSavedItem: {
    message: null,
    success: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        currentProjects: action.payload.message,
        currentProjectsSuccess: action.payload.success,
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        currentProjectsError: action.payload.message,
        currentProjectsSuccess: action.payload.success,
      };
    case GET_COMPLETED_PROJECTS_SUCCESS:
      return {
        ...state,
        currentCompletedProjects: action.payload.message,
        currentCompletedProjectsSuccess: action.payload.success,
      };
    case GET_COMPLETED_PROJECTS_ERROR:
      return {
        ...state,
        currentCompletedProjectsError: action.payload.message,
        currentCompletedProjectsSuccess: action.payload.success,
      };
    case GET_CLIENT_PROJECTS_SUCCESS:
      return {
        ...state,
        currentclientProjects: action.payload.message,
        currentProjectsclientSuccess: action.payload.success,
      };
    case GET_CLIENT_PROJECTS_ERROR:
      return {
        ...state,
        currentProjectsclientSuccess: action.payload.message,
        currentProjectsclientError: action.payload.success,
      };
    case GET_COMPLETED_CLIENT_PROJECTS_SUCCESS:
      return {
        ...state,
        currentCompletedclientProjects: action.payload.message,
        currentCompletedProjectsclientSuccess: action.payload.success,
      };
    case GET_COMPLETED_CLIENT_PROJECTS_ERROR:
      return {
        ...state,
        currentCompletedProjectsclientSuccess: action.payload.message,
        currentCompletedProjectsclientError: action.payload.success,
      };
    case GET_TOTAL_COMPLETED_PROJECTS_SUCCESS:
    case GET_TOTAL_COMPLETED_PROJECTS_ERROR:
      return {
        ...state,
        getTotalCompletedProjects: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case ADD_PROJECTS_SUCCESS:
    case ADD_PROJECTS_ERROR:
      return {
        ...state,
        addProjectsMessage: action.payload.message,
        addProjectsSuccess: action.payload.success,
      };
    case SAVE_ITEM_TO_PROJECT_SUCCESS:
    case SAVE_ITEM_TO_PROJECT_ERROR:
      return {
        ...state,
        savedItem: action.payload.MOE_item,
        saveItemToProjectMessage: action.payload.message,
        saveItemToProjectSuccess: action.payload.success,
      };
    case LIKE_ITEMS_SUCCESS:
    case LIKE_ITEMS_ERROR:
      return {
        ...state,
        likeItems: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case PASS_ITEMS_SUCCESS:
    case PASS_ITEMS_ERROR:
      return {
        ...state,
        passItems: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case GET_LIKED_ITEMS_SUCCESS:
    case GET_LIKED_ITEMS_ERROR:
      return {
        ...state,
        getlikeItems: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case GET_PASSED_ITEMS_SUCCESS:
    case GET_PASSED_ITEMS_ERROR:
      return {
        ...state,
        getpassItems: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case UPDATE_PROJECT_STATUS_SUCCESS:
    case UPDATE_PROJECT_STATUS_ERROR:
      return {
        ...state,
        updateProjectStatus: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case GET_PROJECT_SUCCESS:
    case GET_PROJECT_ERROR:
      return {
        ...state,
        getProject: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case GET_ALL_PROJECT_SUCCESS:
    case GET_ALL_PROJECT_ERROR:
      return {
        ...state,
        getAllProjects: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };

    case GET_PROJECTS_WITH_SAVED_ITEM_SUCCESS:
    case GET_PROJECTS_WITH_SAVED_ITEM_ERROR:
      return {
        ...state,
        getProjectswithSavedItem: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case GET_SAVED_ITEMS_SUCCESS:
    case GET_SAVED_ITEMS_ERROR:
      return {
        ...state,
        getSavedItemsMessage: action.payload.message,
        getSavedItemsSuccess: action.payload.success,
      };
    case REMOVE_ITEM_TO_PROJECT_SUCCESS:
    case REMOVE_ITEM_TO_PROJECT_ERROR:
      return {
        ...state,
        removedItem: action.payload.MOE_item,
        removeSavedItemsMessage: action.payload.message,
        removeSavedItemsSuccess: action.payload.success,
      };

    default:
      return state;
  }
}
