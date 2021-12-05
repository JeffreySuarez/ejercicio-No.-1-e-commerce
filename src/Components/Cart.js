import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { auth, fs } from "../Firebase/Config";
import { CartProducts } from "./cartProducts";
import StripeCheckout from "react-stripe-checkout";

export const Cart = () => {
  // funcion para obtener usuario
  function ObtenerUsuario() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const user = ObtenerUsuario();

  //Estado de productos del carrito

  const [cartProducts, setCartProducts] = useState([]);

  //obteniendo productos del carrito desde la coleccion de firebase y  cargandolo al estado.

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));

          setCartProducts(newCartProduct);
        });
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  }, []);

  console.log(cartProducts);

  //obtendremos la cantidad de cartProducts y los separaremos en un array diferente.

  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  });

  //reduciremos el qty en un solo valor
  const reducerOfQty = (accumulator, currenValue) => accumulator + currenValue;

  const totalQty = qty.reduce(reducerOfQty, 0);

  console.log("total Qty: " + totalQty);

  //haremos lomismo con el precio obtendremos primero el precio total
  const price = cartProducts.map((cartProduct) => {
    return cartProduct.TotalProductPrecio;
  });

  //reduciremos
  const reducerOfPrice = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalPrice = price.reduce(reducerOfPrice, 0);

  //definiremos una variable global

  let Product;

  // funcion de incrementar producto +

  const cartProductIncrease = (cartProduct) => {
    console.log(cartProduct);
    Product = cartProduct;
    //aumentaremos la cantidad de producto con lo siguiente:
    Product.qty = Product.qty + 1;

    //calculamos el precio total por la cantidad que aumentamos
    Product.TotalProductPrecio = Product.qty * Product.precio;
    ///ahora actualizamos la colleccion del carrito en la base de datos
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid)
          .doc(cartProduct.ID)
          .update(Product)
          .then(() => {
            console.log("increment added");
          });
      } else {
        console.log("user is not logged in to increment");
      }
    });
  };

  // funcion de decrementar producto -
  const cartProductDecrease = (cartProduct) => {
    console.log(cartProduct);
    Product = cartProduct;
    //si la cantidad de producto es mayor que 1
    if (Product.qty > 1) {
      //disminuiremos la cantidad de producto con lo siguiente:
      Product.qty = Product.qty - 1;
      //calculamos el precio total por la cantidad que quede
      Product.TotalProductPrecio = Product.qty * Product.precio;
      ///ahora actualizamos la colleccion del carrito en la base de datos
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("Cart " + user.uid)
            .doc(cartProduct.ID)
            .update(Product)
            .then(() => {
              console.log("Decrement");
            });
        } else {
          console.log("user is not logged in to increment");
        }
      });
    }
  };

  //state de totalProducts

  const [totalProducts, setTotalProducts] = useState(0);
  //obtener productos del carrito
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
      <br></br>

      {cartProducts.length > 0 && (
        <div className="container-fluid ">
          <h1 className="text-center  ">Cart</h1>
          <div className="products-container">
            <CartProducts
              cartProducts={cartProducts}
              cartProductIncrease={cartProductIncrease}
              cartProductDecrease={cartProductDecrease}
            />
          </div>
          <div className="container-fluid summary">
            <div className="cart-summary">
              <h5 className="cart-summary-heading">Cart Summary</h5>
              <br></br>
              <div className="cart-summary-price">
                Total No of Products: <span>{totalQty}</span>
              </div>
              <div className="cart-summary-price">
                Total Price to Pay: <span>$ {totalPrice}</span>
              </div>
              <br></br>
              {/* El stripCkeout es el boton de pago, haremos la importacion de ese boton 
            import STRIPEcHECKOUT FROM 'REACT-STRIPE-CHECKOUT'; pero antes hay que instalarlo como 'npm i react-stripe-checkout'*/}
              <StripeCheckout></StripeCheckout>
            </div>
          </div>
        </div>
      )}
      {cartProducts.length < 1 && (
        <div className="container-fluid  carrito-vacio">
          El carrito esta vacio
        </div>
      )}
    </>
  );
};
