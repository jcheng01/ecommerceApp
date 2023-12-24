const Stripe = require("stripe");
const dotenv = require("dotenv"); // imported so we can use .env file to safley store mongo token
dotenv.config();
const stripe = new Stripe(process.env.stripekey);

const pay = async (req, res) => {
  console.log(req.body);
  try {
    const lineItems = req.body.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          description: product.description, // Assuming you have a 'description' in your product object
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    // Step 3: Create the checkout session with the line items
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.REACT_APP_CLIENT_URL}/products`,
      cancel_url: `${process.env.REACT_APP_CLIENT_URL}/products`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = pay;
