import { combineReducers } from "redux";
import { productManipulation } from "./product";
import productListReducer, { ProductListState } from "./productList";
import { IStateDetails, IStateCart, IStateEdit } from "../model/Interfaces";
import { shoppingCartManipulation } from "./shopping";
import { productEditManipulation } from "./edit";

export interface AppState {
  productListReducer: ProductListState;
  prodReducer: IStateDetails;
  shoppingReducer: IStateCart;
  editReducer: IStateEdit;
}
const rootReducer = combineReducers({
  prodReducer: productManipulation,
  productListReducer: productListReducer,
  shoppingReducer: shoppingCartManipulation,
  editReducer: productEditManipulation
});

export default rootReducer;
