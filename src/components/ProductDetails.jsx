import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ProductDetails = ({ setCartCount, addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false); // Snackbar state

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (product === null) {
    return null;
  }

  function handleBuy() {
    setOpen(true);
  }

  function handleAddToCart() {
    addToCart(product);
    setCartCount((prevCount) => prevCount + 1);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "30px" }}>
      <Card
        sx={{ maxWidth: 745, minHeight: 300, maxHeight: 700, padding: "30px" }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            style={{ objectFit: "contain" }}
            image={product.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {product.description}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {product.category}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Stack
          direction="row"
          spacing={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button variant="contained" color="success" onClick={handleBuy}>
            Buy Now
          </Button>
          <Button variant="outlined" color="error" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Stack>
      </Card>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Product purchased successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetails;
