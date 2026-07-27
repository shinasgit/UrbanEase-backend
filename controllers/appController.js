const Appliance = require("../models/appModel")
const stripe = require("stripe")(process.env.skStripe);


exports.addApp = async (req, res) => {
    console.log("Inside add appliance");
    // console.log(req.body);

    const { product, brand, type,price  } = req.body
    console.log({ product, brand, type ,price });
    try {
        const existingApp = await Appliance.findOne({ product, brand, type })

        if (existingApp) {
            res.status(401).json("Appliance is already existing...")
        }
        else {
            const newApp = new Appliance({ product, brand, type,price })
            await newApp.save()
            res.status(200).json({ message: "Appliance Added", newApp })
        }
    } catch (error) {
        res.status(500).json("Error", error)
    }

}

exports.getAppliance = async (req, res) => {
    console.log("inside Appliance get user");
    try {
        const getAppl = await Appliance.find()
        console.log(getAppl);
        res.status(200).json(getAppl)
        //  res.status(200).json()
    } catch (error) {
        res.status(500).json("Error", error)
    }
}

//payment
// exports.makePayment = async (req, res) => {
//     const { applianceDetail } = req.body
//     const email = req.payload
//     console.log("reqBody:", req.body, "email:", email);



//     try {
//                  console.log("Inside try");
//                  console.log("app id:",applianceDetail._id);
//                  console.log("app details",applianceDetail);

//         const existingBook = await Appliance.findByIdAndUpdate(applianceDetail._id, {
//             // product: applianceDetail.product,
//             // brand: applianceDetail.brand,
//             // type: applianceDetail.type,
//             status: "Booked",
//             booked: email
//         }, { new: true })
//         console.log(existingBook);

        
        

//         const line_items = [
//   {
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: applianceDetail.product, // ✅ REQUIRED
//         metadata: {
//             product:String(applianceDetail.product),
//           brand: String(applianceDetail.brand),
//           type: String(applianceDetail.type),
//           booked: String(email),
//         },
//       },
//       unit_amount: Math.round(Number(applianceDetail.price) * 100),
//     },
//     quantity: 1,
//   },
// ];

//         const session = await stripe.checkout.sessions.create({
//             //purchased using card
//             payment_method_types: ["card"],
//             success_url: 'http://localhost:5173/payment-success',
//             cancel_url: 'http://localhost:5173/payment-error',
//             //details of purchased product
//             line_items,
//             mode: 'payment',
//         });
//         console.log(session);
//         // console.log(res);
        
        

//         res.status(200).json({url:session.url})
//     } catch (error) {
//         res.status(500).json("Error", error)
//     }
// }

    

// ✅ Book Appliance Controller (Status Update)
exports.bookAppliance = async (req, res) => {
  const { applianceDetail } = req.body;
  const email = req.payload;

  try {
    console.log("Booking Appliance ID:", applianceDetail);

    const updatedAppliance = await Appliance.findByIdAndUpdate(
      applianceDetail,
      {
        status: "Booked",
        booked: email,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Appliance booked successfully",
      updatedAppliance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Booking Failed",
      error,
    });
  }
};



// ✅ Make Payment Controller (Stripe Session)
exports.makePayment = async (req, res) => {
  const { applianceDetail } = req.body;

  try {
    console.log("Creating Stripe Session for:", applianceDetail.product);

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: applianceDetail.product,
            metadata: {
              brand: applianceDetail.brand,
              type: applianceDetail.type,
            },
          },
          unit_amount: Math.round(Number(applianceDetail.price) * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/payment-error",
      line_items,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({
      message: "Payment Session Creation Failed",
      error,
    });
  }
};
