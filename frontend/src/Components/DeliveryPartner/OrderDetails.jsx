// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { useParams } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { motion } from "framer-motion";
// import { FaPhoneAlt, FaMapMarkerAlt, FaUserAlt, FaShoppingBag } from "react-icons/fa";

// // Fix for default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
// });

// const coordinatesMap = {
//   "400001": [18.934, 72.836], // Mumbai
//   "442404": [19.954, 79.296], // Chandrapur
//   "412005": [21.007, 75.562], // Jalgaon
//   "444601": [20.935, 77.779], // Amravati
// };

// const OrderDetails = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [position, setPosition] = useState([19.0760, 72.8777]);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axiosInstance.get(`/deliveryPartner/OrderDetails/${orderId}`);
//         setOrder(response.data);
//         const pincode = response.data.customer.address.pincode;
//         setCoordinatesByPincode(pincode);
//       } catch (error) {
//         console.error("Error fetching order details:", error);
//       }
//     };

//     const setCoordinatesByPincode = (pincode) => {
//       if (coordinatesMap[pincode]) {
//         setPosition(coordinatesMap[pincode]);
//       } else {
//         setPosition([19.0760, 72.8777]); // Default to Mumbai coordinates
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   if (!order) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
//       </div>
//     );
//   }

//   const { customer, restaurant, items, totalAmount } = order;

//   return (
//     <div className="container mx-auto px-8 py-6 bg-gray-50 min-h-screen">
//       <motion.h1 
//         className="text-4xl font-extrabold text-center text-orange-600 mb-10 tracking-tight"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}>
//         Order Details
//       </motion.h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Restaurant Info Card */}
//         <motion.div 
//           className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}>
//           <div className="flex items-center mb-4">
//             <FaMapMarkerAlt className="text-2xl text-orange-500 mr-3" />
//             <h2 className="text-2xl font-bold text-gray-800">Restaurant Info</h2>
//           </div>
//           <div className="space-y-3 text-gray-600">
//             <p >
//               <span className="font-semibold w-24">Name:  </span>
//               <span className="flex-1">{restaurant.hotelName}</span>
//             </p>
//             <p className="flex items-center">
//               <FaPhoneAlt className="mr-2 text-orange-500" />
//               <span>{restaurant.contact}</span>
//             </p>
//             <p className="border-t pt-3 mt-3">
//               <span className="font-semibold block mb-1">Address:</span>
//               <span className="text-gray-500">{restaurant.address.fullAddress}</span>
//             </p>
//           </div>
//         </motion.div>

//         {/* Customer Info Card */}
//         <motion.div 
//           className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//           initial={{ x: 100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}>
//           <div className="flex items-center mb-4">
//             <FaUserAlt className="text-2xl text-orange-500 mr-3" />
//             <h2 className="text-2xl font-bold text-gray-800">Customer Info</h2>
//           </div>
//           <div className="space-y-3 text-gray-600">
//             <p className="flex items-center">
//               <span className="font-semibold w-24">Username:</span>
//               <span>{customer.username}</span>
//             </p>
//             <p >
//             <span className="font-semibold w-24">Contact: </span>
//               <span> {customer.contact}</span>
//             </p>
//             <p className="border-t pt-3 mt-3">
//               <span className="font-semibold block mb-1">Delivery Address:</span>
//               <span className="text-gray-500">{customer.address.fullAddress}</span>
//             </p>
//           </div>
//         </motion.div>

//         {/* Order Items Card */}
//         <motion.div 
//           className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}>
//           <div className="flex items-center mb-4">
//             <FaShoppingBag className="text-2xl text-orange-500 mr-3" />
//             <h2 className="text-2xl font-bold text-gray-800">Order Items</h2>
//           </div>
//           <div className="space-y-3">
//             <ul className="divide-y divide-gray-200">
//               {items.map((item, index) => (
//                 <li key={index} className="py-3 flex justify-between items-center">
//                   <span className="text-gray-700">{item.product.name}</span>
//                   <span className="text-orange-500 font-medium">×{item.quantity}</span>
//                 </li>
//               ))}
//             </ul>
//             <div className="border-t pt-4 mt-4">
//               <p className="flex justify-between items-center text-xl font-bold">
//                 <span>Total Amount:</span>
//                 <span className="text-orange-600">₹{totalAmount.toFixed(2)}</span>
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Map Card */}
//         <motion.div 
//           className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.7 }}>
//           <div className="flex items-center mb-4">
//             <FaMapMarkerAlt className="text-2xl text-orange-500 mr-3" />
//             <h2 className="text-2xl font-bold text-gray-800">Location</h2>
//           </div>
//           <div className="rounded-xl overflow-hidden border border-gray-200">
//             <MapContainer 
//               center={position} 
//               zoom={15} 
//               style={{ height: '300px', width: '100%' }}
//               className="z-0">
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//               />
//               <Marker position={position}>
//                 <Popup>
//                   <div className="text-center">
//                     <strong>{restaurant.hotelName}</strong>
//                     <br />
//                     Pincode: {restaurant.address.pincode}
//                   </div>
//                 </Popup>
//               </Marker>
//             </MapContainer>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import axiosInstance from "../../utils/axiosInstance";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt, FaUserAlt, FaShoppingBag, FaTimes } from "react-icons/fa"; // Added FaTimes

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const coordinatesMap = {
  "400001": [18.934, 72.836], // Mumbai
  "442404": [19.954, 79.296], // Chandrapur
  "412005": [21.007, 75.562], // Jalgaon
  "444601": [20.935, 77.779], // Amravati
};

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate(); // Use useNavigate hook
  const [order, setOrder] = useState(null);
  const [position, setPosition] = useState([19.0760, 72.8777]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/deliveryPartner/OrderDetails/${orderId}`);
        setOrder(response.data);
        const pincode = response.data.customer.address.pincode;
        setCoordinatesByPincode(pincode);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    const setCoordinatesByPincode = (pincode) => {
      if (coordinatesMap[pincode]) {
        setPosition(coordinatesMap[pincode]);
      } else {
        setPosition([19.0760, 72.8777]); // Default to Mumbai coordinates
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleClose = () => {
    navigate("/deliveryPartner/activeOrders"); // Redirect to the specified route
  };

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  const { customer, restaurant, items, totalAmount } = order;

  return (
    <div className="container mx-auto px-8 py-6 bg-gray-50 min-h-screen relative">
      <button onClick={handleClose} className="absolute top-4 right-4 text-orange-600 hover:text-orange-800 transition-transform transform hover:scale-110">
        <FaTimes size={24} />
      </button>
      <motion.h1 
        className="text-4xl font-extrabold text-center text-orange-600 mb-10 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        Order Details
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Restaurant Info Card */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-2xl text-orange-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Restaurant Info</h2>
          </div>
          <div className="space-y-3 text-gray-600">
            <p >
              <span className="font-semibold w-24">Hotel Name:  </span>
              <span className="flex-1">{restaurant.hotelName}</span>
            </p>
            <p >
            <span className="font-semibold w-24">Contact:  </span>
              <span>{restaurant.contact}</span>
            </p>
            <p >
            <span className="font-semibold w-24">Email:  </span>
              <span>{restaurant.email}</span>
            </p>
            <p className="border-t pt-3 mt-3">
              <span className="font-semibold block mb-1">Address:</span>
              <span className="text-gray-500">{restaurant.address.fullAddress}</span>
            </p>
          </div>
        </motion.div>

        {/* Customer Info Card */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}>
          <div className="flex items-center mb-4">
            <FaUserAlt className="text-2xl text-orange-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Customer Info</h2>
          </div>
          <div className="space-y-3 text-gray-600">
            <p className="flex items-center">
              <span className="font-semibold w-24">Username:</span>
              <span>{customer.username}</span>
            </p>
            <p >
            <span className="font-semibold w-24">Contact: </span>
              <span> {customer.contact}</span>
            </p>
            <p >
            <span className="font-semibold w-24">Email: </span>
              <span> {customer.email}</span>
            </p>
            <p className="border-t pt-3 mt-3">
              <span className="font-semibold block mb-1">Delivery Address:</span>
              <span className="text-gray-500">{customer.address.fullAddress}</span>
            </p>
          </div>
        </motion.div>

        {/* Order Items Card */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}>
          <div className="flex items-center mb-4">
            <FaShoppingBag className="text-2xl text-orange-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Order Items</h2>
          </div>
          <div className="space-y-3">
            <ul className="divide-y divide-gray-200">
              {items.map((item, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <span className="text-gray-700">{item.product.name}</span>
                  <span className="text-orange-500 font-medium">×{item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4 mt-4">
              <p className="flex justify-between items-center text-xl font-bold">
                <span>Total Amount:</span>
                <span className="text-orange-600">₹{totalAmount.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Map Card */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-2xl text-orange-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Location</h2>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <MapContainer 
              center={position} 
              zoom={15} 
              style={{ height: '300px', width: '100%' }}
              className="z-0">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={position}>
                <Popup>
                  <div className="text-center">
                    <strong>{restaurant.hotelName}</strong>
                    <br />
                    Pincode: {restaurant.address.pincode}
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetails;