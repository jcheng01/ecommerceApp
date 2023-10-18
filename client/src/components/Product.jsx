import React from "react";

import { Link } from "react-router-dom";

const Product = ({ product = {} }) => {
  const { title, image, id } = product;
  return (
    <>
      <div className="rounded-md border-2 flex flex-col justify-center items-center h-full bg-white">
        <Link to={`/products/${id}`}>
          <img src={image} alt="" width="100" />
        </Link>
        <h1 className="text-center text-slate-700 font-light">{title}</h1>
      </div>
    </>
  );
};

export default Product;
