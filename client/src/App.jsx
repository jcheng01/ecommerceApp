import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  function handleProductAdd(newProduct) {
    // check if item exists
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );
    if (existingProduct) {
      // increase quantity
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }
  function handleProductDelete(id) {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(
      updatedCart.map((item) => {
        return {
          ...item,
          quantity: item.quantity > 0 ? item.quantity - 1 : item.quantity,
        };
      })
    );
  }

  return (
    <>
      <BrowserRouter>
        <NavBar cart={cart} />
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/products/:id"
              element={
                <ProductDetails
                  cart={cart}
                  onProductAdd={handleProductAdd}
                  onProductDelete={handleProductDelete}
                />
              }
            ></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/cart" element={<Cart cart={cart} />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/profile" element={<Profile />}></Route>

            {/* <Route path="/pay"></Route> */}
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
