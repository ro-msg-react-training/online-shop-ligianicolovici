import React from "react";
import { IProduct, ProductImagesUrls } from "../../model/Interfaces";
import {
  IDumbButtonsDetails,
  ButtonInDetails
} from "../Details/dumbButtonsDetails";
import { Link } from "react-router-dom";
import { faShoppingBasket, faEraser } from "@fortawesome/free-solid-svg-icons";
import { ModalPopUp } from "../ModalPopUp";

export interface IDumbDetails {
  data: IProduct;
  handleAdd: (data: IProduct, message: string) => void;
  handleDelete: (data: IProduct, message: string) => void;
  handleEdit: (data: IProduct, message: string) => void;
  closeModal: () => void;
  deleteItem: (data: IProduct) => void;
  defaultImg: string;
  messagePopUp: string;
  titlePopUp: string;
  showModal: boolean;
}
export const ProductDetailsView = (props: IDumbDetails) => {
  let addButton: IDumbButtonsDetails = {
    data: props.data,
    buttonText: "Add",
    handleClick: () => props.handleAdd(props.data, "add"),
    iconName: faShoppingBasket,
    buttonType: "button is-danger is-outlined"
  };
  let editButton: IDumbButtonsDetails = {
    data: props.data,
    buttonText: "Edit",
    handleClick: () => props.handleEdit(props.data, "edit"),
    iconName: faEraser,
    buttonType: "button is-warning is-outlined"
  };
  let deleteButton: IDumbButtonsDetails = {
    data: props.data,
    buttonText: "Delete",
    handleClick: () => props.handleDelete(props.data, "delete"),
    iconName: faEraser,
    buttonType: "button is-primary is-outlined"
  };
  return (
    <div className="contentDetails">
      <div className="productDetails">
        <br />
        <h1 className="subtitle is-2">{props.data.name}</h1>
        <p className="subtitle is-3">{"~" + props.data.category + "~"}</p>
        <img
          src={
            ProductImagesUrls[props.data.id]
              ? ProductImagesUrls[props.data.id].image
              : props.defaultImg
          }
          alt="product"
          className="productPic"
        />
        <h2>{"Product ID:" + props.data.id}</h2>
        <div>
          <text>{props.data.description}</text>
        </div>
        <span>{"Price: " + props.data.price + "$"}</span>
        <br />
        <br></br>
        <ButtonInDetails {...addButton} />
        <ButtonInDetails {...deleteButton} />
        <Link to="/edit">
          <ButtonInDetails {...editButton} />
        </Link>

        <br />
      </div>
      <ModalPopUp
        data={props.messagePopUp}
        title={props.titlePopUp}
        active={props.showModal}
        onClosing={props.closeModal()}
        onDeleteProduct={props.deleteItem(props.data)}
        productToDelete={props.data}
      ></ModalPopUp>
    </div>
  );
};
