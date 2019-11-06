import { combineReducers } from "redux";
import { productManipulation } from "./product";
import productListReducer, { ProductListState } from "./productList";
import { IStateDetails, IStateCart, IStateEdit } from "../model/Interfaces";
import { shoppingCartManipulation } from "./shopping";
import { productEditManipulation } from "./edit";
import { highChartReducer, ChartState } from "./highCharts";

export interface AppState {
  productListReducer: ProductListState;
  prodReducer: IStateDetails;
  shoppingReducer: IStateCart;
  editReducer: IStateEdit;
  chartReducer:ChartState;
}
const rootReducer = combineReducers({
  chartReducer:highChartReducer,
  prodReducer: productManipulation,
  productListReducer: productListReducer,
  shoppingReducer: shoppingCartManipulation,
  editReducer: productEditManipulation
});

export default rootReducer;
