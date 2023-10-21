import React from "react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NtEvBDJSwItgo0npF2OrKSZaFv1YlrqacalKImEiTs8P26KdYxWStXbqHav0F6nM4pfEBpzBrNA5oqrIhx3HTiP006tFHfzu6"
);

const Cart = (props) => {
  const totalPrice = props.cart.reduce(
    (total, product) =>
      parseFloat((total + product.price * product.quantity).toFixed(2)),
    0
  );

  const [email, setEmail] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();

    // Call your server to create a checkout session\
    fetch("http://localhost:5174/api/user/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.cart),
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        const json = await res.json();
        return await Promise.reject(json);
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function handleFormSubmit(event) {
  //   event.preventDefault();

  //   const lineItems = props.cartmap((product) => ({
  //     price_data: {
  //       currency: "usd",
  //       product_data: {
  //         name: product.title,
  //         description: product.description, // Assuming you have a 'description' in your product object
  //         images: [product.image],
  //       },
  //       unit_amount: product.price * 100,
  //     },
  //     quantity: product.quantity,
  //   }));

  //   stripePromise.then((stripe) => {
  //     stripe
  //       .redirectToCheckout({
  //         lineItems: lineItems,
  //         mode: "payment",
  //         successUrl: "http://localhost:5174",
  //         cancelUrl: "http://localhost:5174",
  //         customerEmail: email,
  //       })
  //       .then((response) => {
  //         // this will only log if the redirect did not work
  //         console.log(response.error);
  //       })
  //       .catch((error) => {
  //         // wrong API key? you will see the error message here
  //         console.log(error);
  //       });
  //   });
  // }

  return (
    <div className="m-32">
      <h1 className="flex justify-center items-center pb-10	font-bold text-xl">
        Your Cart
      </h1>

      <div>
        {props.cart.length === 0 && (
          <p>You have not added any product to your cart yet.</p>
        )}
        {props.cart.length > 0 && (
          <>
            <table className="text-center w-full">
              <thead>
                <tr>
                  <th width="25%" className="th-product">
                    Product
                  </th>
                  <th width="20%">Unit price</th>
                  <th width="10%">Quanity</th>
                  <th width="25%">Total</th>
                </tr>
              </thead>
              <tbody>
                {props.cart.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td className="flex justify-center items-center">
                        <img
                          src={product.image}
                          width="30"
                          height="30"
                          alt=""
                          className=""
                        />{" "}
                        {/* {product.title} */}
                      </td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <strong>${product.price * product.quantity}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="2"></th>
                  <th className="cart-highlight">Total</th>
                  <th className="cart-highlight">${totalPrice}</th>
                </tr>
              </tfoot>
            </table>
            <p className="py-8">
              Enter your email and then click on pay and your products will be
              delivered to you on the same day!
            </p>
            <form
              className=" p-3 rounded-lg flex items-center"
              onSubmit={handleFormSubmit}
            >
              <input
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                required
                className=" bg-slate-100 focus:outline-none w-24 sm:w-64"
              />
              <button
                type="submit"
                className="px-8 bg-slate-700 text-neutral-50 mx-4"
              >
                Pay
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
