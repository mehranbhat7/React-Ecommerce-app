import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

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
          // <div key={ele.id} onClick={() => handlee(ele)}>
          //   <h4>{ele.title}</h4>
          //   <img src={ele.image} alt="abcs"></img>
          // </div>
          <div onClick={() => handlee(ele)}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  style={{ objectFit: "contain" }}
                  component="img"
                  height="140"
                  image={ele.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {ele.price}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {ele.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default Products;
