import { ISales } from "../model/Interfaces";
import {
  LOAD_SALES,
  GET_SALES,
  SalesActions,
  CHANGE_CHART,
  CHANGE_LOADING_STATUS
} from "../actions/highChartActions";
export interface ChartState {
  data: ISales[];
  isLoading: boolean;
  chartType: string;
}
const initialState: ChartState = {
  data: [],
  isLoading: true,
  chartType: "pie"
};

export function highChartReducer(
  state: ChartState = initialState,
  action: SalesActions
): ChartState {
  switch (action.type) {
    case LOAD_SALES:
      return {
        data: [...action.data],
        isLoading: true,
        chartType: state.chartType
      };
    case CHANGE_CHART:
      return {
        data: state.data,
        isLoading: state.isLoading,
        chartType: action.chartType
      };
    case GET_SALES:
      return {
        ...state,
        isLoading:true
      };

    case CHANGE_LOADING_STATUS:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

export default highChartReducer;
