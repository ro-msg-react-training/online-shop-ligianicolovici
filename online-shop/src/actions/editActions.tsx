import { IProduct } from "../model/Interfaces";
export const READ_PRODUCT = "READ-PRODUCT";
export const UPDATE_PRODUCT = "UPDATE-PRODUCT";
export const ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT";
export const SAVE_CATEGORIES = "SAVE-CATEGORIES";
export const UPDATE_CURRENT_PRODUCT = "UPDATE-CURRENT-PRODUCT";
export const CREATE_NEW_PRODUCT = "CREATE-NEW-PRODUCT";
export const EDIT_OR_ADD = "EDIT_OR_ADD";
export const CHANGE_LOADING_STATUS_EDIT = "CHANGE_LOADING_STATUS_EDIT";

export interface ProductTranfer {
  type: typeof READ_PRODUCT;
  product: IProduct;
  displayType: string;
}
export interface UpdateProduct {
  type: typeof UPDATE_PRODUCT;
  product: IProduct;
  productList: IProduct[];
}
export interface AddProduct {
  type: typeof ADD_NEW_PRODUCT;
  product: IProduct;
  productList: IProduct[];
}
export interface SaveCategories {
  type: typeof SAVE_CATEGORIES;
  categories: string[];
}
export interface EditOrAdd {
  type: typeof EDIT_OR_ADD;
  product: IProduct;
}
export interface FetchUpdateProduct {
  type: typeof UPDATE_CURRENT_PRODUCT;
  productID: number;
  productUpdated: IProduct;
}
export interface FetchAddNewProduct {
  type: typeof CREATE_NEW_PRODUCT;
  productUpdated: IProduct;
}
export interface SwitchLoadingStatusEdit{
  type:typeof CHANGE_LOADING_STATUS_EDIT;
  isLoading:boolean;
}
export function displayProduct(
  data: IProduct,
  displayData: string
): EditActions {
  return {
    type: READ_PRODUCT,
    product: data,
    displayType: displayData
  };
}

export function updateProduct(
  product: IProduct,
  listOfProducts: IProduct[]
): EditActions {
  return {
    type: UPDATE_PRODUCT,
    product: product,
    productList: listOfProducts
  };
}
export function addProduct(
  product: IProduct,
  listOfProducts: IProduct[]
): EditActions {
  return {
    type: ADD_NEW_PRODUCT,
    product: product,
    productList: listOfProducts
  };
}
export function categoriesListSaving(categories: string[]): EditActions {
  return {
    type: SAVE_CATEGORIES,
    categories: categories
  };
}
export function editOrAddProduct(product: IProduct): EditActions {
  return {
    type: EDIT_OR_ADD,
    product: product
  };
}
export function fetchUpdateProduct(
  id: number,
  productUpdated: IProduct
): EditActions {
  return {
    type: UPDATE_CURRENT_PRODUCT,
    productID: id,
    productUpdated: productUpdated
  };
}
export function fetchAddNewProduct(productUpdated: IProduct): EditActions {
  return {
    type: CREATE_NEW_PRODUCT,
    productUpdated: productUpdated
  };
}
  export function swithLoadingStatusEdit():EditActions{
    return{
      type:CHANGE_LOADING_STATUS_EDIT,
      isLoading:false
    }
  }

export type EditActions =
  | AddProduct
  | ProductTranfer
  | UpdateProduct
  | SaveCategories
  | FetchUpdateProduct
  | FetchAddNewProduct
  | EditOrAdd
  | SwitchLoadingStatusEdit;
