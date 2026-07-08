import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance";
import { imageUrl } from "../config";
import ReviewCard from './Review';
import { Star, StarHalf, Pencil } from 'lucide-react';

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 text-yellow-400" />}
    </div>
  );
};

const Menu = () => {
  const [activeSection, setActiveSection] = useState('Menu');
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewResponse = await axiosInstance.get('/restaurant/readReviews');
        setReviews(Array.isArray(reviewResponse.data) ? reviewResponse.data : []);
      } catch (error) {
        if (error?.response?.status !== 404) console.error("Error fetching reviews");
        setReviews([]);
      }
    };
    const fetchRestaurantDetails = async () => {
      try {
        const detailResponse = await axiosInstance.get('/restaurant/restaurantObject');
        setRestaurantDetails(detailResponse.data || {});
      } catch (error) {
        console.error("Error fetching Restaurant details");
      }
    };
    const fetchMenu = async () => {
      try {
        const menuResponse = await axiosInstance.get(`/restaurant/menu`);
        setMenuItems(Array.isArray(menuResponse.data) ? menuResponse.data : []);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoadingMenu(false);
      }
    };
    fetchReviews();
    fetchMenu();
    fetchRestaurantDetails();
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "Menu":
        if (loadingMenu) {
          return (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white border rounded-lg shadow p-6 flex items-center gap-6 animate-pulse">
                  <div className="w-32 h-32 bg-gray-200 rounded-md" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          );
        }
        if (menuItems.length === 0) {
          return <p className="text-gray-500 italic">No menu items yet. Add your first dish!</p>;
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
                  <span className={`inline-block w-5 h-5 border-2 ${isNonVeg ? "border-red-500" : "border-green-500"} flex items-center justify-center mr-2 flex-shrink-0`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${isNonVeg ? "bg-red-500" : "bg-green-500"}`}></span>
                  </span>
                  <span className="truncate">{menuItem.name}</span>
                </h3>
                <p className="text-sm text-gray-600 mt-2">Food Type: {menuItem.foodType || "N/A"}</p>
                <p className="text-lg text-gray-800 font-semibold mt-1">₹{menuItem.price}</p>
                <div className="mt-4">
                  <button
                    onClick={() => navigate(`/restaurant/updateItem/${menuItem._id}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    <Pencil size={16} />
                    Edit
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
                <span className="ml-2">{restaurantDetails.rating || 0}</span>
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
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${restaurantDetails.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {restaurantDetails.isOpen ? "Yes" : "No"}
                </span>
              </div>
            </div>
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

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-[60vh]">
      <div className="bg-[#232220] text-white pt-8 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center px-4">{restaurantDetails.hotelName || "My Restaurant"}</h1>
        <div className="flex gap-8 sm:gap-16 text-base sm:text-lg mt-6 justify-center overflow-x-auto px-4 pb-1 no-scrollbar">
          {['Menu', 'Overview', 'Reviews'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`whitespace-nowrap cursor-pointer transition-colors ${activeSection === section ? 'text-orange-500 font-semibold' : 'text-gray-300 hover:text-white'}`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">{renderContent()}</div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 lg:sticky lg:top-24">
            {restaurantDetails.photos && restaurantDetails.photos.length > 0 ? (
              <div className="space-y-4">
                <div className="w-full h-64 overflow-hidden rounded-lg">
                  <img
                    src={imageUrl(restaurantDetails.photos[0], FALLBACK_IMAGE)}
                    alt="Restaurant"
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{restaurantDetails.hotelName}</h3>
                <div className="flex items-center gap-2">
                  <RatingStars rating={restaurantDetails.rating || 0} />
                  <span className="text-gray-600">({restaurantDetails.rating || 0})</span>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">Address: </span>{restaurantDetails.address?.fullAddress || "N/A"}</p>
                  <p><span className="font-medium">Contact: </span>{restaurantDetails.contact || "N/A"}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No photos available for this restaurant.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
