const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();

const stripe = new Stripe(
  "sk_test_51HS4ihABHWGyJI1Hf2GAvM2pHsXgeps2oeWkiEYfA3HAwCom25EG9Kf81AqhQSpFvOf1HeyTcHV9RScN56hfMVGQ004rBWOicn"
);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  try {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gaming keyboard",
      payment_method: id,
      confirm: true,
    });

    console.log(payment);

    res.send({ message: "Succesfull payment" });
  } catch (error) {
      res.json({
          message: error.raw.message
      })
  }
});

app.listen(3001, () => {
  console.log("SERVER ON PORT", 3001);
});
