import { IProduct } from "../model/Interfaces";
export const READ_PRODUCT = "READ-PRODUCT";
export const UPDATE_PRODUCT = "UPDATE-PRODUCT";
export const ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT";
export const SAVE_CATEGORIES = "SAVE-CATEGORIES";

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

export type EditActions =
  | AddProduct
  | ProductTranfer
  | UpdateProduct
  | SaveCategories;
