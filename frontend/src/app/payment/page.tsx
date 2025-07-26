"use client";

import { PaymentFailureStatus } from "@/components/PaymentFailureStatus";
import {  PaymentSuccessfulStatus } from "@/components/PaymentSuccessStatus";
import React, { useEffect, useState } from "react";

export default function PaymentPage() {
   const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "failed">("idle");
  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "Perfect for individuals exploring our service.",
      features: [
        "✔ Access to basic tutorials",
        "✔ Community support",
        "✔ Limited to 5 projects",
      ],
      buttonText: "Get Started",
      isFree: true,
    },
    {
      name: "Starter",
      price: "₹499/month",
      description: "Great for small teams or freelancers starting out.",
      features: [
        "✔ Access to all tutorials",
        "✔ Email support",
        "✔ 20 projects limit",
        "✔ Basic analytics",
      ],
      buttonText: "Buy Starter",
      isFree: false,
    },
    {
      name: "Professional",
      price: "₹999/month",
      description: "Best for businesses and pro developers.",
      features: [
        "✔ All Starter features",
        "✔ Unlimited projects",
        "✔ Priority support",
        "✔ Advanced analytics",
        "✔ Access to beta features",
      ],
      buttonText: "Buy Professional",
      isFree: false,
    },
  ];

const handlePayment = async (plan: string, amount: number) => {
  try {
    // ✅ 1️⃣ Create order on the backend
    const res = await fetch("http://localhost:8000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount,planId:2,userId:1 }),
    });

    const order = await res.json();
    console.log("✅ Order Created:", order.id);
  
    // ✅ 2️⃣ Open Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // ✅ Public Key (from Razorpay Dashboard)
      amount: order.amount,
      currency: "INR",
      name: `${plan} Plan`,
      description: `Payment for ${plan} Plan`,
      order_id: order.id, // ✅ Razorpay order_id from backend
      handler: async function (response: any) {
        console.log("✅ Razorpay Response:", response.razorpay_signature);

        // ✅ 3️⃣ Send payment details to backend for signature verification
        const verifyRes = await fetch("http://localhost:8000/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order.order_Id,   // 👈 comes from backend when creating order
            status: order.status       // 👈 you can send CREATED or SUCCESS etc.
          }),
        });

        const {success} = await verifyRes.json();
        console.log(success)
       if (success === true) {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("failed");
      }
      },
      theme: {
        color: "#3399cc",
      },
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
  }
};

// ✅ Dynamically load Razorpay script
useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
   script.onload = () => console.log("✅ Razorpay script loaded");
  document.body.appendChild(script);
}, []);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
     { paymentStatus === "idle" && <><h1 className="text-4xl font-bold mb-2">Choose Your Plan</h1><p className="text-gray-600 mb-8">Upgrade anytime as your needs grow.</p><div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between border hover:shadow-lg transition-all"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-gray-700 mb-4">{plan.description}</p>
              <p className="text-3xl font-extrabold mb-4">{plan.price}</p>
              <ul className="text-gray-600 space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index}>✅ {feature}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handlePayment("Starter", 499)}
              className={`w-full py-2 px-4 rounded-lg font-semibold ${plan.isFree
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"}`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div></>
      }
       {paymentStatus === "success" && <PaymentSuccessfulStatus />}
      {paymentStatus === "failed" && <PaymentFailureStatus />}
    </div>
  );
}
