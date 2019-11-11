import { IStateEdit } from "../model/Interfaces";
import {
  EditActions,
  READ_PRODUCT,
  ADD_NEW_PRODUCT,
  UPDATE_PRODUCT,
  SAVE_CATEGORIES,
  UPDATE_CURRENT_PRODUCT,
  CREATE_NEW_PRODUCT,
  EDIT_OR_ADD,
  CHANGE_LOADING_STATUS_EDIT,
} from "../actions/editActions";

const initialDetailsState: IStateEdit = {
  givenProduct: {} as any,
  listOfProducts: [],
  categories: [],
  displayType: "",
  productID: {} as any,
  productToDisplay: {} as any,
  defaultProduct: {
    id: 0,
    name: "",
    price: 0,
    category: "",
    description: "",
    image: ""
  },
  isloading:false,
};

export function productEditManipulation(
  state: IStateEdit = initialDetailsState,
  action: EditActions
): IStateEdit {
  switch (action.type) {
    case READ_PRODUCT: {
      return {
        givenProduct: action.product,
        listOfProducts: [...state.listOfProducts],
        categories: state.categories,
        displayType: action.displayType,
        productID: state.productID,
        defaultProduct: state.defaultProduct,
        productToDisplay: action.product,
        isloading:false
      };
    }
    case UPDATE_PRODUCT: {
      return {
        givenProduct: action.product,
        listOfProducts: action.productList,
        categories: state.categories,
        displayType: state.displayType,
        productID: state.productID,
        defaultProduct: state.defaultProduct,
        productToDisplay: state.productToDisplay,
        isloading:false
      };
    }
    case ADD_NEW_PRODUCT: {
      return {
        givenProduct: action.product,
        listOfProducts: action.productList,
        categories: state.categories,
        displayType: state.displayType,
        productID: state.productID,
        defaultProduct: state.defaultProduct,
        productToDisplay: state.productToDisplay,
        isloading:false
      };
    }
    case SAVE_CATEGORIES: {
      return {
        givenProduct: state.givenProduct,
        listOfProducts: state.listOfProducts,
        categories: action.categories,
        displayType: state.displayType,
        productID: state.productID,
        defaultProduct: state.defaultProduct,
        productToDisplay: state.productToDisplay,
        isloading:state.isloading
      };
    }
    case EDIT_OR_ADD: {
      return {
        ...state,
        productToDisplay: action.product,
        isloading:state.isloading
        
      };
    }
    case UPDATE_CURRENT_PRODUCT: {
      return {
        ...state,
        givenProduct: action.productUpdated,
        productID: action.productID,
        isloading:false,
      };
    }
    case CREATE_NEW_PRODUCT: {
      return {
        ...state,
        givenProduct: action.productUpdated,
        isloading:false,
      };
    }
    case CHANGE_LOADING_STATUS_EDIT:
      return {
        ...state,
        isloading:false,
      };

    default:
      return state;
  }
}
