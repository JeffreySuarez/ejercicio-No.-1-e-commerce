import React from "react";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { minus } from "react-icons-kit/feather/minus";

export const IndividualCartProduct = ({ cartProduct }) => {
  return (
    <div className="cart-container">
      <div className="product cart-card">
        <div className="product-img cart-img">
          <img src={cartProduct.url} alt="product - img" />
        </div>
        <div className="product-text title cart-name">{cartProduct.titulo}</div>
        <div className="product-text description">
          {cartProduct.descripcion}
        </div>
        <div className="product-text price cart-price">
          $ {cartProduct.precio}
        </div>
        <span>Cantidad</span>
        <div className="product-text quantity-box">
          <div className="action-btns minus">
            <Icon icon={minus} size={20}></Icon>
          </div>
          <div>{cartProduct.qty}</div>
          <div className="action-btns plus">
            <Icon icon={plus} size={20}></Icon>
          </div>
        </div>
        <div className="product-text cart-price">
          $ {cartProduct.TotalProductPrice}
        </div>
        <div className="btn btn-danger btn-md cart-btn delete-btn">DELETE</div>
      </div>
    </div>
  );
};
