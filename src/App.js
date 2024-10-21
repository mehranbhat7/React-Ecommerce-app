import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Left from "./components/Left";
import Right from "./components/Right";
import Navbar from "./components/Navbar";
import Notfound from "./Notfound";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/left" element={<Left />} />
          <Route path="/right" element={<Right />} />
          <Route path="/nav" element={<Navbar />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
