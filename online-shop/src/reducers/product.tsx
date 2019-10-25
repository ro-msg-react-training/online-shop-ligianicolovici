import { IStateDetails } from "../model/Interfaces";
import {
  DetailsActions,
  ProductOperations,
  ProductDisplay,
  ModalOn,
  FETCH_SELECTED,
  FetchSelectedProduct,
  FETCH_DELETE
} from "../actions/productActions";

const initialDetailsState: IStateDetails = {
  selectedProduct: {} as any,
  dataToExport: {} as any,
  showModel: false,
  messagePopUp: "",
  titlePopUp: "",
  productToDelete: {} as any,
  cartItems: [],
  fetchId:{} as any
};

export function productManipulation(
  state: IStateDetails = initialDetailsState,
  action: DetailsActions
): IStateDetails {
  switch (action.type) {
    case "DELETE-PRODUCT":
      const deleteAction: ProductOperations = action as ProductOperations;

      return {
        dataToExport: state.dataToExport,
        showModel: state.showModel,
        productToDelete: deleteAction.product,
        messagePopUp: state.messagePopUp,
        selectedProduct: state.selectedProduct,
        titlePopUp: state.titlePopUp,
        cartItems: state.cartItems,
        fetchId:state.fetchId
      };
    case "SHOW-POPUP":
      const openModal: ModalOn = action as ModalOn;
      return {
        showModel: true,
        dataToExport: state.dataToExport,
        messagePopUp: openModal.message,
        titlePopUp: openModal.title,
        selectedProduct: state.selectedProduct,
        productToDelete: state.productToDelete,
        cartItems: state.cartItems,
        fetchId:state.fetchId
      };
    case "HIDE-POPUP":
      return {
        showModel: false,
        dataToExport: state.dataToExport,
        messagePopUp: state.messagePopUp,
        titlePopUp: state.titlePopUp,
        selectedProduct: state.selectedProduct,
        productToDelete: state.productToDelete,
        cartItems: state.cartItems,
        fetchId:state.fetchId
      };
    case "LOAD-PRODUCT":
      const loadAction: ProductDisplay = action as ProductDisplay;
      return {
        selectedProduct: loadAction.product,
        dataToExport: state.dataToExport,
        messagePopUp: state.messagePopUp,
        titlePopUp: state.titlePopUp,
        productToDelete: state.productToDelete,
        showModel: state.showModel,
        cartItems: state.cartItems,
        fetchId:state.fetchId
      };
    case FETCH_SELECTED:
      const fetchAction :FetchSelectedProduct= action as FetchSelectedProduct;
      return{
        ...state,
        fetchId:fetchAction.productID
      }
      case FETCH_DELETE:
      const fetchDeleteAction :FetchSelectedProduct= action as FetchSelectedProduct;
      return{
        ...state,
        fetchId:fetchDeleteAction.productID
      }
    default:
      return state;
  }
}
