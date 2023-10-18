import { NavBar } from "./components/NavBar";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products/:id" element={<ProductDetails />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
