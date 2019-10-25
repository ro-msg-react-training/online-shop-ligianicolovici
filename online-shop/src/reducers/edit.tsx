import { IStateEdit } from "../model/Interfaces";
import {
  EditActions,
  AddProduct,
  ProductTranfer,
  UpdateProduct,
  READ_PRODUCT,
  ADD_NEW_PRODUCT,
  UPDATE_PRODUCT,
  SAVE_CATEGORIES,
  SaveCategories,
  FETCH_UPDATE,
  FetchUpdateProduct,
  FETCH_ADD,
  FetchAddNewProduct
} from "../actions/editActions";

const initialDetailsState: IStateEdit = {
  givenProduct: {} as any,
  listOfProducts: [],
  categories: [],
  displayType: "",
  productID: {} as any
};

export function productEditManipulation(
  state: IStateEdit = initialDetailsState,
  action: EditActions
): IStateEdit {
  switch (action.type) {
    case READ_PRODUCT:
      const readAction: ProductTranfer = action as ProductTranfer;
      return {
        givenProduct: readAction.product,
        listOfProducts: [...state.listOfProducts],
        categories: state.categories,
        displayType: readAction.displayType,
        productID: state.productID
      };
    case UPDATE_PRODUCT:
      const updateAction: UpdateProduct = action as UpdateProduct;
      return {
        givenProduct: updateAction.product,
        listOfProducts: updateAction.productList,
        categories: state.categories,
        displayType: state.displayType,
        productID: state.productID
      };
    case ADD_NEW_PRODUCT:
      const addNewAction: AddProduct = action as AddProduct;
      return {
        givenProduct: addNewAction.product,
        listOfProducts: addNewAction.productList,
        categories: state.categories,
        displayType: state.displayType,
        productID: state.productID
      };
    case SAVE_CATEGORIES:
      const categoriesAction: SaveCategories = action as SaveCategories;
      return {
        givenProduct: state.givenProduct,
        listOfProducts: state.listOfProducts,
        categories: categoriesAction.categories,
        displayType: state.displayType,
        productID: state.productID
      };
    case FETCH_UPDATE:
      const fetchAction: FetchUpdateProduct = action as FetchUpdateProduct;
      return {
        ...state,
        givenProduct: fetchAction.productUpdated,
        productID: fetchAction.productID
      };
    case FETCH_ADD:
      const fetchAddAction: FetchAddNewProduct = action as FetchAddNewProduct;
      return {
        ...state,
        givenProduct: fetchAddAction.productUpdated
      };

    default:
      return state;
  }
}
