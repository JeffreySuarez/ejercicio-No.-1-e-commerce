import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import { auth, fs } from "../Firebase/Config";

export const Home = (props) => {
  //funcion para obtener  el uid del usuario
  function ObtenerUsuarioUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = ObtenerUsuarioUid();

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
  console.log(user);

  const [products, setProducts] = useState([]);

  //funcion para obtener los productos
  const obtenerProductos = async () => {
    const products = await fs.collection("Products").get();
    const productosArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productosArray.push({
        ...data,
      });
      if (productosArray.length === products.docs.length) {
        setProducts(productosArray);
      }
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  let Product;
  const addToCart = (products) => {
    if (uid !== null) {
      console.log(products);
      Product = products;
      Product["qty"] = 1;
      Product["TotalProductPrice"] = Product.qty * Product.price;
      fs.collection("Cart " + uid)
        .doc(products.ID)
        .set(Product)
        .then(() => {
          console.log("successfully added to cart");
        });
    } else {
      props.history.push("/login");
    }
  };

  return (
    <>
      <Navbar user={user} />
      <br></br>
      {products.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">PRODUCTOS</h1>

          <div className="products-container">
            <Products products={products} addToCart={addToCart} />
          </div>
        </div>
      )}
      {products.lenght < 1 && (
        <div className="container-fluid">Porfavor esperar.........</div>
      )}
    </>
  );
};
