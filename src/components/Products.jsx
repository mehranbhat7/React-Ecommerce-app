import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";

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
  // function handleBuy() {
  //   alert("Product bought successfully!");
  // }
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "blue",
          textDecoration: "underline",
        }}
      >
        Products
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
          padding: "10px",
        }}
      >
        {data.map((ele) => {
          return (
            <div
              key={ele.id}
              style={{ flex: "0 0 23%", maxWidth: "25%" }}
              onClick={() => handlee(ele)}
            >
              <Card
                sx={{
                  maxwidth: "300px",
                  height: "300px",
                  padding: "10px",
                }}
              >
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
                      ${ele.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {ele.title.split(" ").slice(0, 4).join(" ") +
                        (ele.title.split(" ").length > 7 ? "...." : "")}
                    </Typography>
                  </CardContent>
                  <div style={{ marginTop: "25px" }}>
                    <Button
                      variant="contained"
                      color="success"
                      // onClick={handleBuy}
                      size="small"
                      style={{ fontSize: "10px", marginRight: "30px" }}
                    >
                      View
                    </Button>
                    {/* <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      style={{ fontSize: "10px" }}
                    >
                      Add to Cart
                    </Button> */}
                  </div>
                </CardActionArea>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
