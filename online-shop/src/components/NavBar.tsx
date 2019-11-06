import React from "react";
import { Link, Redirect } from "react-router-dom";
import iconPage from "../icon.png";
import "../productModeling/navBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCamera,
  faShoppingCart,
  faPlus,
  faChartPie
} from "@fortawesome/free-solid-svg-icons";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { displayProduct } from "../actions/editActions";
import { IProduct } from "../model/Interfaces";
import { AppState } from "../reducers/combine";

library.add(faCamera, faShoppingCart, faPlus, faChartPie);
interface NavProps {
  displayProduct: (product: IProduct, msg: string) => void;
}

class NavBar extends React.Component<NavProps> {
  defaultProduct: IProduct = {
    id: 0,
    name: "",
    price: 0,
    category: "",
    description: "",
    image: ""
  };
  render() {
    return (
      <div className="navDiv">
        <nav className="navbar is-primary">
          <div className="navbar-brand">
            <Link to="/products">
              <div className="nav-logo">
                <a className="navbar-item">
                  <img src={iconPage} alt="nav image" />
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
                      this.props.displayProduct(this.defaultProduct, "add");
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
  }
}
const mapStateToProps = (state: AppState) => ({});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  displayProduct: (product: IProduct, msg: string) =>
    dispatch(displayProduct(product, msg))
});

const NavInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
export default NavInitializer;
