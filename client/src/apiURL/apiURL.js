// const api_URL = "http://localhost:8000/api";
const api_URL = "https://hemlyco.com:8000/api";

// user URLs
export const signupURL = "/auth/signup";
export const loginURL = "/auth/login";
export const forgotPassword = "/auth/forgotPassword";
export const resetPassword = "/auth/resetPassword";
export const validTokenURL = "/auth/validToken";
export const getUser = "/auth/getUser";

//contactUs
export const contactUs = "/auth/ContactUs";

//inventory URLs
export const getProducts = "/inventory/getProducts";
export const getProduct = "/inventory/getProduct";
export const searchProducts = "/inventory/searchProducts";

//project URLs
export const addProject = "/project/addProject";
export const getProjects = "/project/getProjects";
export const getCompletedProjects = "/project/getCompletedProjects";
export const getTotalCompletedProjects = "/project/getTotalCompletedProjects";
export const getclientProjects = "/project/getclientProjects";
export const getCompletedclientProjects = "/project/getCompletedclientProjects";
export const saveToProject = "/project/saveToProject";
export const removeFromProject = "/project/removeFromProject";
export const getSavedItems = "/project/getSavedItems";
export const likeItem = "/project/likeItem";
export const passItem = "/project/passItem";
export const getLikedItems = "/project/getLikedItems";
export const getPassedItems = "/project/getPassedItems";
export const updateProjectStatus = "/project/updateProjectStatus";
export const getProject = "/project/getProject";
export const getAllProjects = "/project/getAllProjects";
export const getProjectswithSavedItem = "/project/getProjectswithSavedItem";

//admin URLs
export const uploadProductCSV = "/admin/uploadProductCSV";
export const uploadInventoryCSV = "/admin/uploadInventoryCSV";
export const getDesigners = "/admin/getDesigners";
export const addCommissions = "/admin/addCommissions";
export const getTotalDesigner = "/admin/getTotalDesigner";
export const newProjectsperDesigner = "/admin/newProjectsperDesigner";
export const savedItemsperProject = "/admin/savedItemsperProject";
export const perdesignerPurchase = "/admin/perdesignerPurchase";
export const perclientPurchase = "/admin/perclientPurchase";
export const perProjectPurchase = "/admin/perProjectPurchase";
export const spendperDesigner = "/admin/spendperDesigner";
export const getTotalDesignerByTimeRange = "/admin/getTotalDesignerByTimeRange";
export const getTotalProjectsTimeRange = "/admin/getTotalProjectsTimeRange";

//cart URLs
export const addToCart = "/cart/addToCart";
export const getCartItems = "/cart/getCartItems";
export const getCartItem = "/cart/getCartItem";
export const updateQuantity = "/cart/updateQuantity";
export const changePaidStatus = "/cart/changePaidStatus";
export const addToOrder = "/cart/addToOrder";
export const getPastOrders = "/cart/getPastOrders";

//payment URLs
export const makePayment = "/payment/payment";
export const buyNow = "/payment/buyNow";
export const affirmConfirmation = "/payment/affirmConfirmation";
export const affirmConfirmationBuyNow = "/payment/AffirmConfirmationBuyNow";
export const getTaxes = "/payment/getTaxes";

//business URLs
export const sendBusinessEmail = "/business/sendBusinessEmail";

export default api_URL;
