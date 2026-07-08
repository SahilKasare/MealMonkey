import { Link, useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { success, total } = location.state || {};

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-100 px-4 py-16">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-10 text-center animate-fadeIn">
        <div className="bg-green-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
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

        <h2 className="text-2xl font-bold mt-6 text-gray-800">
          Your order has been successfully placed
        </h2>

        {typeof total === "number" && (
          <p className="text-gray-700 mt-2">
            Amount paid: <span className="font-semibold text-orange-500">₹{total.toFixed(2)}</span>
          </p>
        )}

        <p className="text-gray-600 mt-2">
          Sit back and relax while your order is being prepared. It&apos;ll take about
          5 minutes before it&apos;s on its way.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/customer/orders"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Track My Orders
          </Link>
          <Link
            to="/customer/"
            className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-full font-semibold transition"
          >
            Back to Home
          </Link>
        </div>

        {!success && (
          <p className="text-sm text-gray-400 mt-6">
            Looking for your cart?{" "}
            <Link to="/customer/cart" className="text-orange-500 hover:underline">
              Go to cart
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
