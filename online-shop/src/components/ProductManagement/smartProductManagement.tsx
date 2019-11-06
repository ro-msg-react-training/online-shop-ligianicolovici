import React, { SyntheticEvent } from "react";
import "../../productModeling/edit.css";
import { IProduct } from "../../model/Interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBasket, faEraser } from "@fortawesome/free-solid-svg-icons";
import { AppState } from "../../reducers/combine";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import "../../App.sass";
import {
  categoriesListSaving,
  displayProduct,
  fetchUpdateProduct,
  fetchAddNewProduct,
  editOrAddProduct
} from "../../actions/editActions";
import { loadProducts } from "../../actions/productListActions";
import { IDumbProductManagement, ProductInfoDisplay } from "./dumbPMDisplay";
library.add(faShoppingBasket, faEraser);

interface EditDetailsProps {
  product: IProduct;
  productList: IProduct[];
  categories: string[];
  displayType: string;
  saveCategories: (categories: string[]) => void;
  reloadProductList: (data: IProduct[]) => void;
  displayProduct: (product: IProduct, msg: string) => void;
  editOrAddProduct: (product: IProduct) => void;
  fetchUpdateProduct: (id: number, productUpdated: IProduct) => void;
  fetchAddNewProduct: (productUpdated: IProduct) => void;
  defaultProduct: IProduct;
  productToDisplay: IProduct;
}
class DetailsManagement extends React.Component<EditDetailsProps> {
  onNameChange = (e: SyntheticEvent) => {
    let nameUpdated: string;
    nameUpdated = (e.target as HTMLInputElement).value.trim();
    if (!/^\d+$/.test(nameUpdated)) {
      this.props.productToDisplay.name = nameUpdated;
    } else {
      alert("Name is not corect!");
    }
  };

  onPriceChange = (e: SyntheticEvent) => {
    let price: any = "";
    price = (e.target as HTMLInputElement).value.trim();
    if (Number(price) && price > 0) {
      this.props.productToDisplay.price = price;
    } else {
      alert("Price is not correct!");
    }
  };
  onImageChange = (e: SyntheticEvent) => {
    this.props.productToDisplay.image = (e.target as HTMLInputElement).value.trim();
  };
  onCategoryChange = (e: SyntheticEvent) => {
    this.props.productToDisplay.category = (e.target as HTMLInputElement).value.trim();
  };
  onDetailsChange = (e: SyntheticEvent) => {
    this.props.productToDisplay.description = (e.target as HTMLInputElement).value.trim();
  };

  createUpdatedProduct = (id: number): IProduct => {
    return this.props.productToDisplay;
  };
  constructor(props: EditDetailsProps) {
    super(props);
    this.checkIfNewOrEdit();
    this.getCategories(this.props.productList);
  }

  checkIfNewOrEdit() {
    if (this.props.displayType === "add") {
      this.props.displayProduct(this.props.defaultProduct, "add");
      this.render();
    }
  }

  updateProduct = () => {
    this.props.fetchUpdateProduct(
      this.props.product.id,
      this.props.productToDisplay
    );
  };
  addProduct = () => {
    this.props.fetchAddNewProduct(this.props.productToDisplay);
  };
  createNewProduct = (id: number): IProduct => {
    return this.props.productToDisplay;
  };

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
  }

  render() {
    let passProductData: IDumbProductManagement = {
      product: this.props.product,
      categories: [...this.props.categories],
      displayType: this.props.displayType,
      onNameChange: this.onNameChange.bind(this),
      onPriceChange: this.onPriceChange.bind(this),
      onImageChange: this.onImageChange.bind(this),
      onCategoryChange: this.onCategoryChange.bind(this),
      onDetailsChange: this.onDetailsChange.bind(this),
      updateProduct: this.updateProduct.bind(this),
      addProduct: this.addProduct.bind(this)
    };
    return (
      <div>
        <ProductInfoDisplay {...passProductData}></ProductInfoDisplay>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  product: state.editReducer.givenProduct,
  productList: state.productListReducer.data,
  categories: state.editReducer.categories,
  displayType: state.editReducer.displayType,
  defaultProduct: state.editReducer.defaultProduct,
  productToDisplay: state.editReducer.productToDisplay
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveCategories: (categoriesArray: string[]) =>
    dispatch(categoriesListSaving(categoriesArray)),
  reloadProductList: (newList: IProduct[]) =>
    dispatch(loadProducts(newList, false)),
  displayProduct: (product: IProduct, msg: string) =>
    dispatch(displayProduct(product, msg)),
  editOrAddProduct: (product: IProduct) => dispatch(editOrAddProduct(product)),
  fetchUpdateProduct: (id: number, productUpdated: IProduct) =>
    dispatch(fetchUpdateProduct(id, productUpdated)),
  fetchAddNewProduct: (productUpdated: IProduct) =>
    dispatch(fetchAddNewProduct(productUpdated))
});

const EditDetailsInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsManagement);
export default EditDetailsInitializer;
