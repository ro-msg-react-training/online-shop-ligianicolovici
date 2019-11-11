import React from "react";
import { ISales } from "../../model/Interfaces";

export interface IDumbBar {
  sales: ISales[];
  isLoading: boolean;
  handlechangeChart: (chartType: string) => void;
  crtChartType: string;
}
export const NavMaker = (props: IDumbBar) => {
  let liElementToActive = (buttonName: string) => {
    if (props.crtChartType === buttonName) {
      return "is-active";
    } else {
      return "";
    }
  };
  return (
    <div className="tabs is-centered is-boxed">
      <ul className="is-active">
        <li className={liElementToActive("pie")}>
          <a
            className="navbar-item"
            onClick={() => {
              props.handlechangeChart("pie");
            }}
          >
            <span>Pie </span>
          </a>
        </li>
        <li className={liElementToActive("bar")}>
          <a
            className="navbar-item"
            onClick={() => {
              props.handlechangeChart("bar");
            }}
          >
            <span>Bar </span>
          </a>
        </li>
      </ul>
    </div>
  );
};
