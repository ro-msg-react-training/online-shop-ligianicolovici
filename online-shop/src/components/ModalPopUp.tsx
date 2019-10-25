import React from "react";
import { IPropsModal } from "../model/Interfaces";
import "../App.sass";
import "../productModeling/modal.css";
import { Link } from "react-router-dom";

export class ModalPopUp extends React.Component<IPropsModal> {
  checkForDeleteAction = () => {
    if (this.props.title === "Delete product") {
      return (
        <nav>
          <Link to="/products">
            <button
              className="button is-primary"
              onClick={() =>
                this.props.onDeleteProduct(this.props.productToDelete)
              }
            >
              Yes,I'm sure
            </button>
          </Link>
          <button
            className="button"
            id="closeModel"
            onClick={() => this.props.onClosing()}
          >
            Cancel
          </button>
        </nav>
      );
    } else {
      return (
        <button
          className="button"
          id="closeModel"
          onClick={() => this.props.onClosing()}
        >
          Cancel
        </button>
      );
    }
  };
  render() {
    return (
      <div className={`modal ${this.props.active ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => this.props.onClosing()}
            ></button>
          </header>
          <section className="modal-card-body">{this.props.data}</section>
          <footer className="modal-card-foot">
            {this.checkForDeleteAction()}
          </footer>
        </div>
      </div>
    );
  }
}
