import { ISales } from "../model/Interfaces";
export const LOAD_SALES = "LOAD-SALES";
export const GET_SALES = "GET-SALES";
export const CHANGE_CHART = "CHANGE-CHART";
export interface LoadSales {
  type: typeof LOAD_SALES;
  data: ISales[];
  isLoading: boolean;
}
export interface Fetch {
  type: typeof GET_SALES;
}
export interface ChangeChart {
  type: typeof CHANGE_CHART;
  chartType: string;
}

export function loadCurrentSales(
  data: ISales[],
  isLoading: boolean
): LoadSales {
  return {
    type: LOAD_SALES,
    data: data,
    isLoading: isLoading
  };
}
export function fetchCurrentSales(): Fetch {
  return {
    type: GET_SALES
  };
}
export function changeChart(chartType: string): ChangeChart {
  return {
    type: CHANGE_CHART,
    chartType: chartType
  };
}
export type SalesActions = LoadSales | Fetch | ChangeChart;
