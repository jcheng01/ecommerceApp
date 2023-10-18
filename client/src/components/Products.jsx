import React, { useEffect, useState } from "react";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-3 max-w-6xl mx-auto py-8">
        {products &&
          products.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
      </div>
    </>
  );
};

export default Products;
