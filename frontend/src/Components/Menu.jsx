import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import { useEffect } from 'react';
import axiosInstance from "../utils/axiosInstance";
import ReviewCard from './Review';
import { Star, StarHalf,Pencil} from 'lucide-react';
const Menu = () => {

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
  
  const [activeSection, setActiveSection] = useState('Menu'); // State to track active section
  const [menuItems,setMenuItems] = useState([]);
  const [restaurantDetails,setRestaurantDetails]=useState([]);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews=async () =>{
      try{
        const reviewResponse=await axiosInstance.get('/restaurant/readReviews');
        console.log(reviewResponse)
        setReviews(reviewResponse.data);
      }catch(error){
       console.error("Error fetching restaurants")
      }
    }
    const fetchRestaurantDetails=async ()=>{
      try {
        const detailResponse=await axiosInstance.get('/restaurant/restaurantObject');
        setRestaurantDetails(detailResponse.data);
      }catch (error) {
        console.error("Error fetching Restaurant details");
      }

      }
    
    const fetchMenu = async () => {
      try {
        const menuResponse = await axiosInstance.get(`/restaurant/menu`);
        setMenuItems(menuResponse.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchReviews()
    fetchMenu();
    fetchRestaurantDetails();
  
  }, []);
  

 
  
  const navigate = useNavigate();



  const renderContent = () => {
    switch (activeSection) {
      case "Menu":
        return menuItems.map((menuItem) => (
          <div
            key={menuItem._id}
            className="w-full bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex items-center mb-6"
          >
            <div className="relative">
              <img
                src={menuItem.image ? `http://localhost:3000${menuItem.image}` : "/public/Images/1727358391236.jpeg"}
                alt={menuItem.name}
                className="w-36 h-36 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col justify-between flex-1 ml-6">
              <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                {/* Render square box with circle inside */}
                <span
                  className={`inline-block w-6 h-6 border-2 ${
                    menuItem.foodType === "Non-Veg" ? "border-red-500" : "border-green-500"
                  } flex items-center justify-center mr-2`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      menuItem.foodType === "Non-Veg" ? "bg-red-500" : "bg-green-500"
                    }`}
                  ></span>
                </span>
                {menuItem.name}
              </h3>
              <p className="text-md text-gray-600 mt-2">Food Type: {menuItem.foodType}</p>
              <p className="text-md text-gray-600 mt-2">₹{menuItem.price}</p>
              <div className="flex items-center justify-between mt-6">
              <button
                  onClick={() => navigate(`/restaurant/updateItem/${menuItem._id}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <Pencil size={16} />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ));
        case "Overview":
          return (
            <div className="p-8 bg-white shadow-xl rounded-lg">
              {/* Header */}
              <h3 className="text-4xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">
                {restaurantDetails.hotelName || "Restaurant Name"}
              </h3>
              
              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
                {/* Type */}
                <div>
                  <span className="font-semibold text-gray-900">Type: </span>
                  {restaurantDetails.type || "N/A"}
                </div>
        
                {/* Rating */}
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900">Rating: </span>
                  <span className="ml-2 flex items-center">
                    {restaurantDetails.rating || 0}
                    <svg
                      className="w-5 h-5 text-yellow-400 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.287 3.985a1 1 0 00.95.69h4.184c.969 0 1.372 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.985c.3.921-.755 1.688-1.54 1.118L10 13.477l-3.39 2.46c-.785.57-1.84-.197-1.54-1.118l1.287-3.985a1 1 0 00-.364-1.118L2.603 8.412c-.785-.57-.381-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.287-3.985z" />
                    </svg>
                  </span>
                </div>
        
                {/* Address */}
                <div>
                  <span className="font-semibold text-gray-900">Address: </span>
                  {restaurantDetails.address?.fullAddress || "N/A"}
                  {restaurantDetails.address?.pincode && `, Pincode: ${restaurantDetails.address.pincode}`}
                </div>
        
                {/* Contact */}
                <div>
                  <span className="font-semibold text-gray-900">Contact: </span>
                  {restaurantDetails.contact || "N/A"}
                </div>
        
                {/* Known For */}
                <div>
                  <span className="font-semibold text-gray-900">Known For: </span>
                  {restaurantDetails.knownFor?.length > 0 ? (
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {restaurantDetails.knownFor.join(", ")}
                    </span>
                  ) : (
                    "N/A"
                  )}
                </div>
        
                {/* Average Cost */}
                <div>
                  <span className="font-semibold text-gray-900">Average Cost: </span>
                  {restaurantDetails.averageCost ? `₹${restaurantDetails.averageCost}` : "N/A"}
                </div>
        
                {/* Payment Methods */}
                <div>
                  <span className="font-semibold text-gray-900">Payment Methods: </span>
                  {restaurantDetails.paymentMethods?.cash && (
                    <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded mr-2">
                      Cash
                    </span>
                  )}
                  {restaurantDetails.paymentMethods?.cards && (
                    <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded mr-2">
                      Cards
                    </span>
                  )}
                  {restaurantDetails.paymentMethods?.digitalPayments && (
                    <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      Digital Payments
                    </span>
                  )}
                </div>
        
                {/* Operating Hours */}
                <div>
                  <span className="font-semibold text-gray-900">Operating Hours: </span>
                  {restaurantDetails.timingFrom || "N/A"} - {restaurantDetails.timingTo || "N/A"}
                </div>
        
                {/* Currently Open */}
                <div>
                  <span className="font-semibold text-gray-900">Currently Open: </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      restaurantDetails.isOpen
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {restaurantDetails.isOpen ? "Yes" : "No"}
                  </span>
                </div>
        
                {/* Services */}
                <div className="col-span-1 md:col-span-2">
                  <span className="font-semibold text-gray-900">Services: </span>
                  {Object.entries(restaurantDetails.moreInfo || {})
                    .filter(([key, value]) => value)
                    .map(([key]) => (
                      <span
                        key={key}
                        className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded mr-2"
                      >
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")}
                      </span>
                    )) || "N/A"}
                </div>
              </div>
            </div>
          );

          case "Reviews":
            console.log("Current reviews state during render:", reviews);
            return (
              <div className="mt-6">
                {reviews && reviews.length > 0 ? (
                  <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    {reviews.map((review, index) => {
                      console.log("Rendering review:", review);  // Add this to see each review
                      return <ReviewCard key={index} review={review} />;
                    })}
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
    <div className="relative w-screen min-h-[135vh] bg-gray-100 flex justify-center">
      {/* Restaurant Header Section */}
      <div className="absolute top-[-30px] w-full bg-[#232220] text-white py-4 flex flex-col items-center h-[200px]">
        <h1 className="text-4xl font-bold text-center mt-6">{restaurantDetails.hotelName}</h1>
        <div className="flex mt-16 space-x-40 text-lg">
          {['Menu', 'Overview', 'Reviews'].map((section) => (
            <span
              key={section}
              onClick={() => setActiveSection(section)}
              className={`cursor-pointer ${
                activeSection === section ? 'text-orange-500 font-semibold' : 'text-gray-600'
              }`}
            >
              {section}
            </span>
          ))}
        </div>
      </div>
  
      {/* Menu or Dynamic Content Section */}
      <div className="absolute left-[12%] top-[200px] w-[45%] max-h-[100vh] overflow-y-auto">
        {renderContent()}
      </div>
  
      {/* Checkout Section */}
      <div className="absolute right-[8%] top-[200px] w-[30%] bg-white border border-gray-200 rounded-lg shadow-lg p-6">
        {restaurantDetails.photos && restaurantDetails.photos.length > 0 ? (
          <div className="space-y-6">
            <div className="w-full h-[400px] overflow-hidden rounded-lg">
              <img
                src={`http://localhost:3000${restaurantDetails.photos[0]}`}
                alt="Restaurant Featured Photo"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="space-y-4 pt-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                {restaurantDetails.hotelName}
              </h3>
              <div className="flex items-center gap-2">
                <RatingStars rating={restaurantDetails.rating || 0} />
                <span className="text-gray-600">({restaurantDetails.rating})</span>
              </div>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Address:</span>
                  {restaurantDetails.address?.fullAddress}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Contact:</span>
                  {restaurantDetails.contact}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">No photos available for this restaurant.</p>
        )}
      </div>
    </div>
  );
  
}
  export default Menu;
