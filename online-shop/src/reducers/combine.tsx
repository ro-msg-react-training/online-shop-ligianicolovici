import { combineReducers } from "redux";
import { productManipulation } from "./product";
import productListReducer, { ProductListState } from "./productList";
import { IStateDetails, IStateCart, IStateEdit } from "../model/Interfaces";
import { shoppingCartManipulation } from "./shopping";
import { productEditManipulation } from "./edit";
import { highChartReducer, ChartState } from "./highCharts";

export interface AppState {
  products: ProductListState;
  product: IStateDetails;
  shoppingCart: IStateCart;
  editProduct: IStateEdit;
  charts:ChartState;
}
const rootReducer = combineReducers({
  charts:highChartReducer,
  product: productManipulation,
  products: productListReducer,
  shoppingCart: shoppingCartManipulation,
  editProduct: productEditManipulation
});

export default rootReducer;
