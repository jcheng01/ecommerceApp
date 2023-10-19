import { NavBar } from "./components/NavBar";
import { useState, useEffect } from "react";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // to visualize the cart in the console every time in changes
    // you can also use React dev tools
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
      console.log(cart);
    } else {
      // product is new to the cart
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
    console.log(id);
    const item = cart.filter((product) => {
      if (product.id !== id) {
        console.log(product);
      }
    });
    console.log(item);

    setCart(item);
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
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
