import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Notfound from "./Notfound";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const addToCart = (item) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    if (isItemInCart) {
      setSnackbarOpen(true);
    } else {
      setCartItems((prevItems) => [...prevItems, item]);
      setCartCount((prevCount) => prevCount + 1);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const productList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {cartItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.title} secondary={`$${item.price}`} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "inherit",
                fontFamily: "Helvetica",
              }}
            >
              RedStag Labs
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Search>

            <IconButton
              size="large"
              color="inherit"
              aria-label="cart"
              onClick={toggleDrawer(true)}
            >
              <div style={{ position: "relative" }}>
                <ShoppingCartIcon fontSize="large" />
                <span
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    backgroundColor: "red",
                    borderRadius: "50%",
                    padding: "4px 8px",
                    fontSize: "14px",
                    color: "white",
                  }}
                >
                  {cartCount}
                </span>
              </div>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {productList}
      </SwipeableDrawer>

      <Routes>
        <Route path="/" element={<Products searchTerm={searchTerm} />} />
        <Route
          path="/products/:id"
          element={
            <ProductDetails setCartCount={setCartCount} addToCart={addToCart} />
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Item is already Exists"
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={handleSnackbarClose}
            >
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default App;
