import React, { SyntheticEvent } from "react";
import "../productModeling/edit.css";
import { IProduct } from "../model/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBasket, faEraser } from "@fortawesome/free-solid-svg-icons";
import { AppState } from "../reducers/combine";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import "../App.sass";
import { Link } from "react-router-dom";
import {
  categoriesListSaving,
  SAVE_CATEGORIES,
  displayProduct,
  fetchUpdateProduct
} from "../actions/editActions";
import { loadProducts } from "../actions/productListActions";
library.add(faShoppingBasket, faEraser);

interface EditDetailsProps {
  product: IProduct;
  productList: IProduct[];
  saveCategories: (categories: string[]) => void;
  categories: string[];
  reloadProductList: (data: IProduct[]) => void;
  displayType: string;
  displayProduct: (product: IProduct, msg: string) => void;
  fetchUpdateProduct: (id: number, productUpdated: IProduct) => void;
}
class DetailsManagement extends React.Component<EditDetailsProps> {
  categories: string[] = this.getCategories(this.props.productList);
  updatedProduct: IProduct = {} as any;
  productToDisplay: IProduct = {} as any;

  defaultProduct: IProduct = {
    id: 0,
    name: "",
    price: 0,
    category: "",
    description: "",
    image: ""
  };
  onNameChange = (e: SyntheticEvent) => {
    let nameUpdated: string;
    nameUpdated = (e.target as HTMLInputElement).value.trim();
    if (!/^\d+$/.test(nameUpdated)) {
      this.productToDisplay.name = nameUpdated;
    } else {
      alert("Name is not corect!");
    }
  };

  onPriceChange = (e: SyntheticEvent) => {
    let price: any = "";
    price = (e.target as HTMLInputElement).value.trim();
    if (Number(price) && price > 0) {
      this.productToDisplay.price = price;
    } else {
      alert("Price is not correct!");
    }
  };
  onImageChange = (e: SyntheticEvent) => {
    this.productToDisplay.image = (e.target as HTMLInputElement).value.trim();
  };
  onCategoryChange = (e: SyntheticEvent) => {
    this.productToDisplay.category = (e.target as HTMLInputElement).value.trim();
  };
  onDetailsChange = (e: SyntheticEvent) => {
    this.productToDisplay.description = (e.target as HTMLInputElement).value.trim();
  };

  createUpdatedProduct = (id: number): IProduct => {
    return this.productToDisplay;
  };
  constructor(props: EditDetailsProps) {
    super(props);
    this.checkIfNewOrEdit();
  }

  checkIfNewOrEdit() {
    if (this.props.displayType === "add") {
      this.props.displayProduct(this.defaultProduct, "add");
      this.render();
    }
  }
  componentWillMount() {
    this.checkIfNewOrEdit();
  }
  componentDidUpdate() {
    this.checkIfNewOrEdit();
  }

  updateProduct = () => {
    this.props.fetchUpdateProduct(this.props.product.id, this.productToDisplay);
  };
  render() {
    let displayCategories = [...this.props.categories].map((category, key) => (
      <option>{category}</option>
    ));
    let displayPage = () => {
      if (this.props.displayType === "add") {
        this.productToDisplay = this.defaultProduct;
      } else {
        this.productToDisplay = this.props.product;
      }
      return (
        <div className="formItem">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Name</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded has-icons-left">
                  <input
                    className="input is-primary"
                    type="text"
                    placeholder="Product name"
                    defaultValue={this.productToDisplay.name}
                    onChange={this.onNameChange}
                  />
                  <span className="icon is-small is-left"></span>
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Price</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded has-icons-left">
                  <input
                    className="input is-primary"
                    type="number"
                    placeholder="Product price"
                    defaultValue={
                      this.props.product.price
                        ? this.productToDisplay.price.toString()
                        : "0"
                    }
                    onChange={this.onPriceChange}
                  />
                  <span className="icon is-small is-left"></span>
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Image</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded has-icons-left">
                  <input
                    className="input is-primary"
                    type="text"
                    placeholder="Product image"
                    defaultValue={this.productToDisplay.image}
                    onChange={this.onImageChange}
                  />
                  <span className="icon is-small is-left"></span>
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label is-primary">Category</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <div className="select is-fullwidth is-primary">
                    <select
                      defaultValue={this.productToDisplay.category}
                      onChange={this.onCategoryChange}
                    >
                      {displayCategories}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Details</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea is-primary"
                    placeholder="Product details"
                    defaultValue={this.productToDisplay.description}
                    onChange={this.onDetailsChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <br />
          <Link to="/products">
            <a
              className="button is-danger is-outlined"
              onClick={() => {
                if (this.props.displayType === "edit") {
                  this.updateProduct();
                }
              }}
            >
              <span>Save</span>
              <span className="icon is-small">
                <FontAwesomeIcon icon="shopping-basket" />
              </span>
            </a>
          </Link>
          <Link to={`/products/${this.props.product.id}`}>
            <a className="button is-primary is-outlined" onClick={() => ""}>
              <span>Cancel</span>
              <span className="icon is-small">
                <FontAwesomeIcon icon="eraser" />
              </span>
            </a>
          </Link>
          <br />
        </div>
      );
    };
    return (
      <div className="contentEditDetails">
        <div className="productEditDetails">
          <br />
          <p className="subtitle is-3">Edit product</p>
          {displayPage()}
        </div>
      </div>
    );
  }
  getCategories(this: any, data: IProduct[]) {
    let i: number;
    let j: number;
    let isCounted = false;
    let categoriesArray: string[] = [];
    for (i = 0; i < data.length; i++) {
      if (categoriesArray.length === 0) {
        categoriesArray.push(data[i].category);
      } else {
        for (j = 0; j < categoriesArray.length; j++) {
          if (categoriesArray[j] === data[i].category) {
            isCounted = false;
            break;
          } else {
            isCounted = true;
          }
        }
        if (isCounted === true) {
          categoriesArray.push(data[i].category);
        }
      }
    }
    this.props.saveCategories(categoriesArray);
    return categoriesArray;
  }
}

const mapStateToProps = (state: AppState) => ({
  product: state.editReducer.givenProduct,
  productList: state.productListReducer.data,
  categories: state.editReducer.categories,
  displayType: state.editReducer.displayType
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveCategories: (categoriesArray: string[]) =>
    dispatch(categoriesListSaving(categoriesArray)),
  reloadProductList: (newList: IProduct[]) =>
    dispatch(loadProducts(newList, false)),
  displayProduct: (product: IProduct, msg: string) =>
    dispatch(displayProduct(product, msg)),
  fetchUpdateProduct: (id: number, productUpdated: IProduct) =>
    dispatch(fetchUpdateProduct(id, productUpdated))
});

const EditDetailsInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsManagement);
export default EditDetailsInitializer;
