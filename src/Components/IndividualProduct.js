import React from "react";

export const IndividualProduct = ({ individualProduct, addToCart }) => {
  console.log(individualProduct);

  const handleAddToCart = () => {
    addToCart(individualProduct);
  };

  return (
    <div className="products-container">
      <div className="product-card">
        <div className="product-img">
          <img src={individualProduct.url} alt="product.img" />
        </div>
        <div className="product-name titulo">{individualProduct.titulo}</div>
        <div className="product-name descripcion">
          {individualProduct.descripcion}
        </div>
        <div className="product.price precio">$ {individualProduct.precio}</div>
        <div
          className="btn btn-danger btn-md addcart-btn"
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </div>
      </div>
    </div>
  );
};
