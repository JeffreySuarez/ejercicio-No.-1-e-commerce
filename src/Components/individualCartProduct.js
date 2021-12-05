import React from "react";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { minus } from "react-icons-kit/feather/minus";
import { auth, fs } from "../Firebase/Config";

export const IndividualCartProduct = ({
  cartProduct,
  cartProductIncrease,
  cartProductDecrease,
  cartProductDelete,
}) => {
  //funcion para sumar  productos del +
  const handleCartProductIncrease = () => {
    cartProductIncrease(cartProduct);
  };
  //vamos a Cart.js y creamos la funcion cartProductIncrease

  //Funcion para restar productos del -
  const handleCartProductDecrease = () => {
    cartProductDecrease(cartProduct);
  };

  //Funcion para eliminar productos
  const handleCartProductDelete = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid)
          .doc(cartProduct.ID)
          .delete()
          .then(() => {
            console.log("successfully delete");
          });
      }
    });
  };

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
          <div
            className="action-btns minus"
            onClick={handleCartProductDecrease}
          >
            <Icon icon={minus} size={20}></Icon>
          </div>
          <div>{cartProduct.qty}</div>
          <div className="action-btns plus" onClick={handleCartProductIncrease}>
            <Icon icon={plus} size={20}></Icon>
          </div>
        </div>
        <div className="product-text cart-price">
          $ {cartProduct.TotalProductPrecio}
        </div>
        <div
          className="btn btn-danger btn-md cart-btn delete-btn"
          onClick={handleCartProductDelete}
        >
          DELETE
        </div>
      </div>
    </div>
  );
};
