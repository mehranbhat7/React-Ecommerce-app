import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((ele) => {
      setData(ele.data);
    });
  }, []);

  const navigate = useNavigate();
  function handlee(ele) {
    navigate(`/products/${ele.id}`);
  }
  if (data === null) {
    return null;
  }
  return (
    <>
      <h1>Products</h1>
      {data.map((ele) => {
        return (
          <div key={ele.id} onClick={() => handlee(ele)}>
            <h4>{ele.title}</h4>
          </div>
        );
      })}
    </>
  );
};

export default Products;
