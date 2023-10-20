import fetch from "node-fetch"; // if you're using node-fetch to make HTTP requests
import Stripe from "stripe";
import dotenv from "dotenv"; // imported so we can use .env file to safley store mongo token
dotenv.config();

const stripe = new Stripe(process.env.stripekey);

const pay = async (req, res) => {
  console.log(req.body);
  try {
    // Step 1: Fetch information from the other API
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    const cart = data;
    const lineItems = cart.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          description: product.description, // Assuming you have a 'description' in your product object
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    }));

    // Step 3: Create the checkout session with the line items
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5174",
      cancel_url: "http://localhost:5174",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default pay;
