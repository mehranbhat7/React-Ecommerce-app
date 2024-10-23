import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";

const Products = ({ searchTerm }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setData(response.data);
    });
  }, []);

  const navigate = useNavigate();

  const handlee = (product) => {
    navigate(`/products/${product.id}`);
  };

  if (data === null) {
    return null;
  }

  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
          padding: "10px",
        }}
      >
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              style={{ flex: "0 0 23%", maxWidth: "25%" }}
              onClick={() => handlee(product)}
            >
              <Card
                sx={{
                  maxWidth: "300px",
                  height: "300px",
                  padding: "10px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    style={{ objectFit: "contain" }}
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      ${product.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {product.title.split(" ").slice(0, 4).join(" ") +
                        (product.title.split(" ").length > 7 ? "...." : "")}
                    </Typography>
                  </CardContent>
                  <div style={{ marginTop: "25px" }}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      style={{ fontSize: "10px", marginRight: "30px" }}
                    >
                      View
                    </Button>
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
