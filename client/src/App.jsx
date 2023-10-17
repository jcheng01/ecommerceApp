import { NavBar } from "./components/NavBar";
import ProductDetails from "./components/Product";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/:id" element={<ProductDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
