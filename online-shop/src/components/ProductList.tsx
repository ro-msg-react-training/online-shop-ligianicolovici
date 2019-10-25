import React from "react";
import "../productModeling/productList.css";
import { IProduct } from "../model/Interfaces";
import { Link } from "react-router-dom";
import { ProductImagesUrls } from "../model/Interfaces";
import { AppState } from "../reducers/combine";
import { Dispatch } from "redux";
import { loadProducts, fetchTheList } from "../actions/productListActions";
import { connect } from "react-redux";
import defaultImg from "../default.jpg";

export interface LocalState {
  match?: any;
}
interface ProductListProps {
  match?: any;
  productList: IProduct[];
  isLoading: boolean;
  loadProducts: (data: IProduct[], isLoading: boolean) => void;
  fetchList: () => void;
}

export class ProductList extends React.Component<ProductListProps> {
  callLoadProducts() {
    this.props.fetchList();
  }
  componentDidMount() {
    this.callLoadProducts();
  }
  render() {
    if (this.props.isLoading) {
      return <p>Loading ....</p>;
    }

    let products = [...this.props.productList].map((productt, key) => (
      <Link to={`/products/${productt.id}`}>
        <div className="product">
          <h1 className="subtitle is-2">{productt.name}</h1>
          <p className="subtitle is-3">{"~" + productt.category + "~"}</p>
          <img
            src={
              ProductImagesUrls[productt.id]
                ? ProductImagesUrls[productt.id].image
                : defaultImg
            }
            alt="product"
          />
          <br></br>
          <span className="price-tag">{"Price: " + productt.price + "$"}</span>
        </div>
      </Link>
    ));
    return (
      <React.Fragment>
        <div id="content">
          <div className="products">{products}</div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state: AppState, myOwnState: LocalState) => ({
  productList: state.productListReducer.data,
  isLoading: state.productListReducer.isLoading,
  match: myOwnState.match
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadProducts: (data: IProduct[], isLoading: boolean) =>
    dispatch(loadProducts(data, isLoading)),
  fetchList: () => dispatch(fetchTheList())
});

const ProductListInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);

export default ProductListInitializer;
