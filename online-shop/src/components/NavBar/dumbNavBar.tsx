import React from "react";
import { Link } from "react-router-dom";
import "../../productModeling/navBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCamera,
  faShoppingCart,
  faPlus,
  faChartPie
} from "@fortawesome/free-solid-svg-icons";
import { IProduct } from "../../model/Interfaces";

library.add(faCamera, faShoppingCart, faPlus, faChartPie);

export interface NavBarProps {
  displayProduct: (product: IProduct, msg: string) => void;
  iconPage: string;
  defaultProduct: IProduct;
}

export const NavBarMaker = (props: NavBarProps) => {
  return (
    <div className="navDiv">
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <Link to="/products">
            <div className="nav-logo">
              <a className="navbar-item">
                <img src={props.iconPage} alt="nav image" />
                <p className="subtitle is-4">Online shop</p>
              </a>
            </div>
          </Link>
        </div>
        <div className="navbar-item">
          <div className="field is-grouped">
            <p className="control">
              <Link to="/add">
                <a
                  className="button is-danger"
                  onClick={() => {
                    props.displayProduct(props.defaultProduct, "add");
                  }}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon="plus" color="#ddd" />
                  </span>
                  <span>Add</span>
                </a>
              </Link>
            </p>
          </div>
        </div>
        <div className="navbar-item">
          <div className="field is-grouped">
            <p className="control">
              <Link to="/chart">
                <a className="button is-worning">
                  <span className="icon">
                    <FontAwesomeIcon icon="chart-pie" color="#ddd" />
                  </span>
                  <span>Highcharts</span>
                </a>
              </Link>
            </p>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <Link to="/cart" className="ml-auto">
                  <a className="button is-primary">
                    <span className="icon">
                      <FontAwesomeIcon icon="shopping-cart" color="#ddd" />
                    </span>
                    <span>Cart</span>
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
