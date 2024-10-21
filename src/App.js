import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Left from "./components/Left";
import Right from "./components/Right";
import Navbar from "./components/Navbar";
import Notfound from "./Notfound";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
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
            >
              <MenuIcon />
            </IconButton>
            <Typography
              style={{ textDecoration: "none", color: "white", font: "bold" }}
              component={Link}
              variant="h6"
              to={"/"}
              sx={{ flexGrow: 1 }}
            >
              RedStag Labs
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        {/* <Route element={<Layout />}> */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/left" element={<Left />} />
        <Route path="/right" element={<Right />} />
        <Route path="/nav" element={<Navbar />} />
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        {/* </Route> */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
