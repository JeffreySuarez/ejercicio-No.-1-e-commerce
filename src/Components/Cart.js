import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { auth, fs } from "../Firebase/Config";
import { CartProducts } from "./cartProducts";

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

  return (
    <>
      <Navbar user={user} />
      <br></br>

      {cartProducts.length > 0 && (
        <div className="container-fluid ">
          <h1 className="text-center  ">Cart</h1>
          <div className="products-container">
            <CartProducts cartProducts={cartProducts} />
          </div>
        </div>
      )}
      {cartProducts.length < 1 && (
        <div className="container-fluid">El carrito esta vacio</div>
      )}
    </>
  );
};
