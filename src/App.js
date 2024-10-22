import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";

import Notfound from "./Notfound";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const products = [
    { id: 1, name: "Product 1", price: 22 },
    { id: 2, name: "Product 2", price: 22 },
    { id: 3, name: "Product 3", price: 22 },
    { id: 4, name: "Product 4", price: 22 },
  ];

  const productList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`$${product.price}`}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="View Cart Items" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)} // Open drawer when clicking on menu icon
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component={Link}
              to="/"
              variant="h6"
              sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
            >
              RedStag Labs
            </Typography>

            {/* Cart Icon to open drawer */}
            <IconButton
              size="large"
              color="inherit"
              aria-label="cart"
              onClick={toggleDrawer(true)} // Open drawer when clicking on cart icon
            >
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Drawer Component */}
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {productList}
      </SwipeableDrawer>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
