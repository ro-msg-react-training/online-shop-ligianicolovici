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
  SaveCategories
} from "../actions/editActions";

const initialDetailsState: IStateEdit = {
  givenProduct: {} as any,
  listOfProducts: [],
  categories: [],
  displayType: ""
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
        displayType: readAction.displayType
      };
    case UPDATE_PRODUCT:
      const updateAction: UpdateProduct = action as UpdateProduct;
      return {
        givenProduct: updateAction.product,
        listOfProducts: updateAction.productList,
        categories: state.categories,
        displayType: state.displayType
      };
    case ADD_NEW_PRODUCT:
      const addNewAction: AddProduct = action as AddProduct;
      return {
        givenProduct: addNewAction.product,
        listOfProducts: addNewAction.productList,
        categories: state.categories,
        displayType: state.displayType
      };
    case SAVE_CATEGORIES:
      const categoriesAction: SaveCategories = action as SaveCategories;
      return {
        givenProduct: state.givenProduct,
        listOfProducts: state.listOfProducts,
        categories: categoriesAction.categories,
        displayType: state.displayType
      };
    default:
      return state;
  }
}
