

const express = require("express");
require("dotenv").config(); // Load env variables first

const cors = require("cors");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Move this to .env in production
const verifyToken = require("./Config/middleware");

const bodyParser = require("body-parser");
const Penalty = require("./Server/Penalty System/penaltyModel"); // Import Penalty model

const seeder = require("./Config/seeder");
const config = require("./Config/db");
const route = require("./Routes/apiRoutes");

const app = express();
const port = process.env.PORT;

const _dirname = path.resolve();

app.use(cors());
app.use(express.json({ limit: "50mb" })); // Ensure JSON middleware is applied first
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);
app.use(express.static(__dirname + "/public/"));

app.use(express.static(path.join(_dirname,"/Frontend/dist")))
app.get("*",(_,res)=>{
  res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"))
})

// Run admin seeder
seeder.adminseeder();
app.use(bodyParser.raw({ type: "application/json" })); // Required for Stripe Webhooks

// ✅ Stripe Payment API (with Token Verification)
app.post("/api/create-checkout-session", verifyToken, async (req, res) => {
  try {
    console.log("🔹 Received Payment Request:", req.body);

    const {
      vehicleId,
      ownerId,
      totalPrice,
      days,
      startDate,
      endDate,
      specialRequest,
      dropLocation,
      pickupLocation,
    } = req.body;

    if (
      !vehicleId ||
      !totalPrice ||
      !ownerId ||
      !days ||
      !startDate ||
      !endDate ||
      !specialRequest ||
      !dropLocation ||
      !pickupLocation
    ) {
      console.log(" Missing booking details");
      return res.status(400).json({ error: "Missing booking details." });
    }

    const line_items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `Vehicle Rental - ID: ${vehicleId}`,
            description: `Rental for ${days} days from ${startDate} to ${endDate}`,
          },
          unit_amount: totalPrice * 100, // Convert to paise
        },
        quantity: 1,
      },
    ];

    console.log("🔹 Creating Stripe Session...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.FAILURE_URL,
      metadata: { vehicleId, totalPrice, days, startDate, endDate },
    });

    console.log("Stripe Session Created:", session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.error(" Stripe Checkout Error:", error);
    res
      .status(500)
      .json({ error: "Stripe Checkout Error", details: error.message });
  }
});

app.post("/api/pay-penalty", async (req, res) => {
  try {
    const { penaltyId, penaltyAmount, penaltyType, penaltyDescription } =
      req.body;

    if (!penaltyId || !penaltyAmount) {
      return res.status(400).json({ error: "Missing penalty details" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Penalty Payment - ${penaltyType}`,
              description: penaltyDescription,
            },
            unit_amount: penaltyAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Redirect with penaltyId in query params
      success_url: process.env.PENALTY_SUCCESS_URL,
      cancel_url: process.env.PENALTY_FAILURE_URL,
      metadata: { penaltyId },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Stripe Webhook to Update Payment Status
app.post("/api/webhook", async (req, res) => {
    let event;
    try {
        event = req.body;
    } catch (err) {
        console.error("❌ Webhook Error:", err.message);
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const _id = session.metadata.penaltyId;

        try {
            // Update penalty status in the database
            await Penalty.findByIdAndUpdate(_id, { paymentStatus: "Paid" });
            console.log(`✅ Penalty ${_id} marked as PAID.`);
        } catch (error) {
            console.error("❌ Error updating penalty status:", error);
        }
    }

    res.json({ received: true });
});

	
//Backend is Running
app.get("/", (req, res) => {
  res.send("Backend is Running");
});

//  Start Express Server
app.listen(port, () => {
  console.log(`Server is running`);
});
