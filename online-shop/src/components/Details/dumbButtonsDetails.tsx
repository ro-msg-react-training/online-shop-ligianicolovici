import React from "react";
import { IProduct } from "../../model/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export interface IDumbButtonsDetails {
  data: IProduct;
  buttonText: string;
  handleClick: (data: IProduct) => void;
  iconName: IconProp;
  buttonType: string;
}
export const ButtonInDetails = (props: IDumbButtonsDetails) => {
  return (
    <a
      className={props.buttonType}
      onClick={() => props.handleClick(props.data)}
    >
      <span>{props.buttonText}</span>
      <span className="icon is-small">
        <FontAwesomeIcon icon={props.iconName} />
      </span>
    </a>
  );
};
