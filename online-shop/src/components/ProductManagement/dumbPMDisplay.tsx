import React, { SyntheticEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBasket, faEraser } from "@fortawesome/free-solid-svg-icons";
import { IProduct } from "../../model/Interfaces";
import { useState, useEffect } from "react";

library.add(faShoppingBasket, faEraser);

export interface IDumbProductManagement {
  product: IProduct;
  categories: string[];
  displayType: string;
  onNameChange: (e: SyntheticEvent) => void;
  onPriceChange: (e: SyntheticEvent) => void;
  onImageChange: (e: SyntheticEvent) => void;
  onCategoryChange: (e: SyntheticEvent) => void;
  onDetailsChange: (e: SyntheticEvent) => void;
  updateProduct: () => void;
  addProduct: () => void;
}

export const ProductInfoDisplay = (props: IDumbProductManagement) => {
  const [name, setName] = useState(props.product.name);
  const [price, setPrice] = useState(props.product.price);
  const [image, setImage] = useState(props.product.image);
  const [category, setCategory] = useState(props.product.category);
  const [details, setDetails] = useState(props.product.description);

  let displayCategories = [...props.categories].map((category, key) => (
    <option>{category}</option>
  ));
  let pageTitleSetUp = () => {
    if (props.displayType === "edit") {
      return "Edit product";
    } else {
      return "Add new product";
    }
  };

  useEffect(() => {
    if (props.displayType === "add") {
      setName("");
      setPrice(0);
      setImage("");
      setCategory("");
      setDetails("");
    }
  }, [props.displayType]);

  return (
    <div className="contentEditDetails">
      <div className="productEditDetails">
        <br />
        <p className="subtitle is-3">{pageTitleSetUp()}</p>
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
                    value={name}
                    onChange={(e: SyntheticEvent) => {
                      props.onNameChange(e);
                      setName((e.target as HTMLInputElement).value.trim());
                    }}
                    contentEditable={true}
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
                    value={price}
                    onChange={(e: SyntheticEvent) => {
                      props.onPriceChange(e);
                      setPrice(
                        Number((e.target as HTMLInputElement).value.trim())
                      );
                    }}
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
                    value={image}
                    onChange={(e: SyntheticEvent) => {
                      props.onImageChange(e);
                      setImage((e.target as HTMLInputElement).value.trim());
                    }}
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
                      value={category}
                      onChange={(e: SyntheticEvent) => {
                        props.onCategoryChange(e);
                        setCategory(
                          (e.target as HTMLInputElement).value.trim()
                        );
                      }}
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
                    value={details}
                    onChange={(e: SyntheticEvent) => {
                      props.onDetailsChange(e);
                      setDetails((e.target as HTMLInputElement).value.trim());
                    }}
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
                if (props.displayType === "edit") {
                  props.updateProduct();
                } else {
                  props.addProduct();
                }
              }}
            >
              <span>Save</span>
              <span className="icon is-small">
                <FontAwesomeIcon icon="shopping-basket" />
              </span>
            </a>
          </Link>
          <Link to={`/products/${props.product.id}`}>
            <a className="button is-primary is-outlined" onClick={() => ""}>
              <span>Cancel</span>
              <span className="icon is-small">
                <FontAwesomeIcon icon="eraser" />
              </span>
            </a>
          </Link>
          <br />
        </div>
      </div>
    </div>
  );
};
