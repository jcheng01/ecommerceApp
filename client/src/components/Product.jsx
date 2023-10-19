import React from "react";

import { Link } from "react-router-dom";

const Product = ({ product = {} }) => {
  const { title, image, id } = product;
  return (
    <>
      <div className="p-8 rounded-md border-2 flex flex-col justify-center items-center h-full bg-white hover:scale-90 ease-linear">
        <Link to={`/products/${id}`}>
          <img src={image} alt={`product-${id}`} width="100" />
        </Link>
        <h1 className="text-center text-slate-700 font-light">{title}</h1>
      </div>
    </>
  );
};

export default Product;
