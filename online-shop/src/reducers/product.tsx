import { IStateDetails } from "../model/Interfaces";
import {
  DetailsActions,
  ProductOperations,
  ProductDisplay,
  ModalOn,
  GET_SELECTED_PRODUCT,
  FetchSelectedProduct,
  DELETE_PRODUCT,
  SHOW_POPUP,
  LOAD_PRODUCT,
  HIDE_POPUP,
  DELETE_CURRENT_PRODUCT,
  CHANGE_LOADING_INDICATOR,
  FetchDeletedProduct,
  ChangeLoadingInd
} from "../actions/productActions";

const initialDetailsState: IStateDetails = {
  selectedProduct: {} as any,
  dataToExport: {} as any,
  showModel: false,
  messagePopUp: "",
  titlePopUp: "",
  productToDelete: {} as any,
  cartItems: [],
  fetchId: {} as any,
  isLoading:false,
};

export function productManipulation(
  state: IStateDetails = initialDetailsState,
  action: DetailsActions
): IStateDetails {
  switch (action.type) {
    case DELETE_PRODUCT:
      const deleteAction: ProductOperations = action as ProductOperations;
      {
        return {
          dataToExport: state.dataToExport,
          showModel: state.showModel,
          productToDelete: deleteAction.product,
          messagePopUp: state.messagePopUp,
          selectedProduct: state.selectedProduct,
          titlePopUp: state.titlePopUp,
          cartItems: state.cartItems,
          fetchId: state.fetchId,
          isLoading:!state.isLoading
        };
      }
    case SHOW_POPUP:
      const openModal: ModalOn = action as ModalOn;
      return {
        showModel: true,
        dataToExport: state.dataToExport,
        messagePopUp: openModal.message,
        titlePopUp: openModal.title,
        selectedProduct: state.selectedProduct,
        productToDelete: state.productToDelete,
        cartItems: state.cartItems,
        fetchId: state.fetchId,
        isLoading:state.isLoading
      };
    case HIDE_POPUP:
      return {
        showModel: false,
        dataToExport: state.dataToExport,
        messagePopUp: state.messagePopUp,
        titlePopUp: state.titlePopUp,
        selectedProduct: state.selectedProduct,
        productToDelete: state.productToDelete,
        cartItems: state.cartItems,
        fetchId: state.fetchId,
        isLoading:state.isLoading
      };
    case LOAD_PRODUCT:
      const loadAction: ProductDisplay = action as ProductDisplay;
      return {
        selectedProduct: loadAction.product,
        dataToExport: state.dataToExport,
        messagePopUp: state.messagePopUp,
        titlePopUp: state.titlePopUp,
        productToDelete: state.productToDelete,
        showModel: state.showModel,
        cartItems: state.cartItems,
        fetchId: state.fetchId,
        isLoading:true
      };
    case GET_SELECTED_PRODUCT:
      const fetchAction: FetchSelectedProduct = action as FetchSelectedProduct;
      return {
        ...state,
        fetchId: fetchAction.productID,
        isLoading:true
      };
    case DELETE_CURRENT_PRODUCT:
      const fetchDeleteAction: FetchDeletedProduct = action as FetchDeletedProduct;
      return {
        selectedProduct: state.selectedProduct,
        dataToExport: state.dataToExport,
        messagePopUp: state.messagePopUp,
        titlePopUp: state.titlePopUp,
        productToDelete: state.productToDelete,
        showModel: state.showModel,
        cartItems: state.cartItems,
        fetchId: fetchDeleteAction.productID,
        isLoading:fetchDeleteAction.isLoading,
        
      };
      case CHANGE_LOADING_INDICATOR:
        const actionStatus:ChangeLoadingInd= action as ChangeLoadingInd
        return {
          ...state,
          isLoading:actionStatus.isLoading
        };
    default:
      return state;
  }
}
