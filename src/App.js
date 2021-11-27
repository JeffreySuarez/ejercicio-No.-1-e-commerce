import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { NotFound } from "./Components/NotFound";
import { AddProducts } from "./Components/AddProducts";
import { Cart } from "./Components/Cart";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/add-products" component={AddProducts}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
