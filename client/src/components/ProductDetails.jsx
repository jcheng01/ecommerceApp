import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const params = useParams();
  // console.log(params.id);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.log("Could not load product details", error));
  }, []);
  return (
    <div className="text-sm text-gray-600 flex justify-center items-center gap-16 px-3 py-16 max-w-6xl mx-auto">
      <img
        src={product?.image}
        alt="product image"
        height="600"
        className="max-h-80 rounded-lg"
      />

      <div className="space-y-6">
        <h1 className="font-bold">{product?.title}</h1>
        <h1>Description: {product?.description}</h1>
        <h1>Price: ${product?.price}</h1>

        <div className="flex space-x-4 items-center">
          <button
            className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md hover:opacity-90"
            onClick={() => props.onProductAdd(product)}
          >
            Add to cart
          </button>
          <button
            className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md hover:opacity-90"
            onClick={() => props.onProductDelete(params.id)}
          >
            Remove from cart
          </button>

          <Link
            className="hidden sm:inline text-slate-700 hover:underline"
            to="/products"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
