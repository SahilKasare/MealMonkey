import React, { useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [orderPlaced, setOrderPlaced] = useState(false); // State to track order completion

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header Section */}
      

      {/* Conditional Rendering */}
      {!orderPlaced ? (
        <div className="mt-6">
          {/* Checkout Content */}
          <div className="flex justify-center mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl min-h-[500px]">
              <h2 className="text-2xl font-bold mb-4">Your Order</h2>
              <p>Items in your cart...</p>

              {/* Checkout Form */}
              <div className="mt-6">
                <label htmlFor="address" className="block text-lg mb-2">
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  className="border border-gray-300 p-2 w-full mb-4"
                />

                <label htmlFor="payment" className="block text-lg mb-2">
                  Payment Method
                </label>
                <input
                  type="text"
                  id="payment"
                  placeholder="Enter payment method"
                  className="border border-gray-300 p-2 w-full mb-4"
                />
              </div>

              {/* Complete Checkout Button */}
              <div className="mt-6">
                <button
                  className="bg-green-600 text-white p-3 rounded-md w-full"
                  onClick={() => setOrderPlaced(true)}
                >
                  Complete Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 mb-80">
          {/* Order Placed Successfully */}
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="bg-green-500 rounded-full w-24 h-24 flex items-center justify-center animate-fadeIn">
              <svg
                className="w-12 h-12 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mt-4">
              Your order has been successfully placed
            </h2>
            <p className="text-gray-600 mt-2">
              Sit and relax while your order is being worked on. It'll take 5
              min before you get it.
            </p>
            <Link to="/customer/" className="text-blue-500 hover:underline mt-4">
              Back to Menu
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
