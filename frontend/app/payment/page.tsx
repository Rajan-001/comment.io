"use client";


import React, { useEffect, useState } from "react";
import { PaymentFailureStatus } from "../../components/PaymentFailureStatus";
import { PaymentSuccessfulStatus } from "../../components/PaymentSuccessStatus";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
   const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "failed">("idle");
   const router=useRouter()
   const [plan_Id,SetPlanId]=useState(0)
  const plans = [
    {
      id:1,
      name: "Free",
      price: 0,
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
       id:2,
      name: "Starter",
      price: 3,
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
       id:3,
      name: "Professional",
      price: 5,
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

  // useEffect(()=>{

  // },[plan_Id])

const handlePayment = async (plan: string, amount: number,planId:number) => {
  try {
    // console.log("Plan id ",plan_Id)
    // ✅ 1️⃣ Create order on the backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/create-order`, {
      method: "POST",
      credentials:"include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount,planId:planId}),
    });
    // console.log(plan_Id)
    const order = await res.json();
     if(res.status==411)
     {
      router.push("/profile")
     }
     else if(res.status==200)
     {
    console.log("✅ Order Created:", order.response.id);
      console.log("Rajor pay key id",process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!)
      console.log("Plain",plan)
      console.log("amount",order.response.amount)
      console.log("order is id ",order.response.order_Id)
      console.log("order is status",order.response.status)
    // ✅ 2️⃣ Open Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // ✅ Public Key (from Razorpay Dashboard)
      amount: order.response.amount *100,
      currency: "INR",
      name: `${plan} Plan`,
      description: `Payment for ${plan} Plan`,
      order_id: order.response.order_Id, // ✅ Razorpay order_id from backend
   
      handler: async function (response: any) {
         console.log("options",options)
        console.log("✅ Razorpay Response:", response.razorpay_signature);
         console.log("razorpay_order_id:", response.razorpay_order_id);
        console.log("razorpay_payment_id:", response.razorpay_payment_id);
        console.log("✅ Razorpay Response:", response.razorpay_signature);

        // ✅ 3️⃣ Send payment details to backend for signature verification
        const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/verify-payment`, {
          method: "POST",
          credentials:"include",
          headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order.response.order_Id,   // 👈 comes from backend when creating order
            status: order.response.status,
           planId:planId      // 👈 you can send CREATED or SUCCESS etc.
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
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  }
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
            className="bg-white rounded-2xl  duration-300 p-6 flex flex-col justify-between border hover:shadow-xs transition-all shadow-[-5px_6px_16px_8px_#15803d]"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-gray-700 mb-4">{plan.description}</p>
              <p className="text-3xl font-extrabold mb-4">₹{plan.price}/month</p>
              <ul className="text-gray-600 space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index}>✅ {feature}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() =>{ SetPlanId(plan.id); handlePayment(plan.name, plan.price,plan.id)}}
              className={`w-full cursor-pointer py-2 px-4 rounded-lg font-semibold ${plan.isFree
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-blue-600 text-white hover:bg-green-600"}`}
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
