import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { imageUrl } from "../config";
import ReviewCard from "./Review";
import ReviewForm from "./ReviewForm";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";

const SECTIONS = ["Order Online", "Overview", "Photos", "Reviews", "Write a Review"];

const RestaurantMenu = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [activeSection, setActiveSection] = useState("Order Online");
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [cart, setCart] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuResponse = await axiosInstance.get(`/customer/menu/${restaurantId}`);
        setMenuItems(Array.isArray(menuResponse.data) ? menuResponse.data : []);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoadingMenu(false);
      }
    };

    const fetchRestaurantDetails = async () => {
      try {
        const response = await axiosInstance.get(`/customer/restaurantDetails/${restaurantId}`);
        setRestaurantDetails(response.data || {});
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axiosInstance.get(`/customer/restaurantReview/${restaurantId}`);
        setReviews(Array.isArray(reviewsResponse.data) ? reviewsResponse.data : []);
      } catch (error) {
        // 404 simply means no reviews yet.
        if (error?.response?.status !== 404) {
          console.error("Error fetching reviews:", error);
        }
        setReviews([]);
      }
    };

    fetchMenu();
    fetchRestaurantDetails();
    fetchReviews();
  }, [restaurantId]);

  const handleProceed = () => {
    navigate("/customer/cart");
  };

  const addToCart = async (menuItem) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item._id === menuItem._id);
      if (itemExists) {
        return prevCart.map((item) =>
          item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...menuItem, quantity: 1 }];
    });

    try {
      await axiosInstance.post("/customer/cart/add", { productId: menuItem._id, quantity: 1 });
    } catch (error) {
      console.error("Error adding to server cart:", error);
      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item._id === menuItem._id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
      );
    }
  };

  const updateQuantity = async (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity + amount > 0 ? item.quantity + amount : 0 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    try {
      await axiosInstance.post("/customer/cart/add", { productId: id, quantity: amount });
    } catch (error) {
      console.error("Error updating server cart:", error);
      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item._id === id
              ? { ...item, quantity: item.quantity - amount > 0 ? item.quantity - amount : 0 }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    }
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const renderContent = () => {
    switch (activeSection) {
      case "Order Online":
        if (loadingMenu) {
          return (
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg shadow p-6 flex items-center gap-6 animate-pulse">
                  <div className="w-32 h-32 bg-gray-200 rounded-md" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-9 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              ))}
            </div>
          );
        }
        if (menuItems.length === 0) {
          return <p className="text-gray-500 italic">No menu items available for this restaurant.</p>;
        }
        return menuItems.map((menuItem) => {
          const isNonVeg = (menuItem.foodType || "").toLowerCase().includes("non");
          return (
            <div
              key={menuItem._id}
              className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-4 sm:p-6 flex items-center gap-4 sm:gap-6 mb-6"
            >
              <img
                src={imageUrl(menuItem.image, FALLBACK_IMAGE)}
                alt={menuItem.name}
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center">
                  <span
                    className={`inline-block w-5 h-5 border-2 ${isNonVeg ? "border-red-500" : "border-green-500"} flex items-center justify-center mr-2 flex-shrink-0`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${isNonVeg ? "bg-red-500" : "bg-green-500"}`}></span>
                  </span>
                  <span className="truncate">{menuItem.name}</span>
                </h3>
                <p className="text-sm text-gray-600 mt-2">Food Type: {menuItem.foodType || "N/A"}</p>
                <p className="text-lg text-gray-800 font-semibold mt-1">₹{menuItem.price}</p>
                <div className="mt-4">
                  <button
                    onClick={() => addToCart(menuItem)}
                    className="bg-orange-500 text-white text-base font-semibold px-6 py-2.5 rounded-lg hover:bg-orange-600 transition"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          );
        });

      case "Overview":
        return (
          <div className="p-6 sm:p-8 bg-white shadow-xl rounded-lg">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">
              {restaurantDetails.hotelName || "Restaurant Name"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
              <div>
                <span className="font-semibold text-gray-900">Type: </span>
                {restaurantDetails.type || "N/A"}
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">Rating: </span>
                <span className="ml-2 flex items-center">
                  {restaurantDetails.rating || 0}
                  <svg className="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.287 3.985a1 1 0 00.95.69h4.184c.969 0 1.372 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.985c.3.921-.755 1.688-1.54 1.118L10 13.477l-3.39 2.46c-.785.57-1.84-.197-1.54-1.118l1.287-3.985a1 1 0 00-.364-1.118L2.603 8.412c-.785-.57-.381-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.287-3.985z" />
                  </svg>
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Address: </span>
                {restaurantDetails.address?.fullAddress || "N/A"}
                {restaurantDetails.address?.pincode && `, Pincode: ${restaurantDetails.address.pincode}`}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Contact: </span>
                {restaurantDetails.contact || "N/A"}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Known For: </span>
                {restaurantDetails.knownFor?.length > 0 ? (
                  <span className="inline-block bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {restaurantDetails.knownFor.join(", ")}
                  </span>
                ) : (
                  "N/A"
                )}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Average Cost: </span>
                {restaurantDetails.averageCost ? `₹${restaurantDetails.averageCost}` : "N/A"}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Operating Hours: </span>
                {restaurantDetails.timingFrom || "N/A"} - {restaurantDetails.timingTo || "N/A"}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Currently Open: </span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    restaurantDetails.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {restaurantDetails.isOpen ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        );

      case "Photos":
        return (
          <div>
            {restaurantDetails.photos && restaurantDetails.photos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurantDetails.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={imageUrl(photo, FALLBACK_IMAGE)}
                    alt={`Restaurant ${index + 1}`}
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                    className="w-full h-64 object-cover rounded-lg border-4 border-orange-300 shadow-md"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No photos available for this restaurant.</p>
            )}
          </div>
        );

      case "Reviews":
        return (
          <div>
            {reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No reviews available for this restaurant.</p>
            )}
          </div>
        );

      case "Write a Review":
        return <ReviewForm restaurantId={restaurantId} className="shadow-lg p-6" />;

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-[60vh]">
      {/* Restaurant Header Section */}
      <div className="bg-[#232220] text-white pt-8 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center px-4">
          {restaurantDetails.hotelName || "Restaurant"}
        </h1>
        <div className="flex gap-6 sm:gap-10 text-base sm:text-lg mt-6 justify-start sm:justify-center overflow-x-auto px-4 pb-1 no-scrollbar">
          {SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`whitespace-nowrap cursor-pointer transition-colors ${
                activeSection === section ? "text-orange-500 font-semibold" : "text-gray-300 hover:text-white"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {/* Content + Cart */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">{renderContent()}</div>

        {/* Checkout Section */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart Items</h2>
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center mb-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-700 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      <span className="text-orange-500 font-medium">₹{item.price}</span> x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold"
                    >
                      −
                    </button>
                    <span className="mx-3 text-lg text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      aria-label="Increase quantity"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
            )}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-lg">
                <span className="text-gray-700">Sub Total</span>
                <span className="text-gray-800 font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl mt-3">
                <span className="text-gray-800">To Pay</span>
                <span className="text-orange-500">₹{subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleProceed}
                disabled={cart.length === 0}
                className="w-full mt-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
