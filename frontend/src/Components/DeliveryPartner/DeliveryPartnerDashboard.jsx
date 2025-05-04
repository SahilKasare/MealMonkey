// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { useUser } from "../../contexts/UserProvider";
// import boy from "../../assets/images/boy1.jpg";
// import { MapPin, Phone, Award, Truck, CreditCard } from "lucide-react";

// const DeliveryPartnerDashboard = () => {
//   const { user } = useUser();
//   const [deliveryPartner, setDeliveryPartner] = useState(null);
//   const [pendingOrders, setPendingOrders] = useState([]);
//   const [analyticsData, setAnalyticsData] = useState([]);

//   useEffect(() => {
//     setDeliveryPartner(user);
//   }, [user]);

//   useEffect(() => {
//     const fetchTodaysOrders = async () => {
//       try {
//         const response = await axiosInstance.get('deliveryPartner/ordersToday');
//         setPendingOrders(response.data.filter(order => order.status === 'pending'));
//         calculateAnalytics(response.data);
//       } catch (error) {
//         console.error('Error fetching today\'s orders:', error);
//       }
//     };

//     fetchTodaysOrders();
//   }, []);

//   const handleAcceptOrder = async (orderId) => {
//     try {
//       await axiosInstance.put(`/deliveryPartner/orders/${orderId}/status`, { deliveryPartnerId: deliveryPartner._id });
//       setPendingOrders(pendingOrders.filter(order => order._id !== orderId));
//     } catch (error) {
//       console.error('Error updating order status:', error);
//     }
//   };

//   const calculateAnalytics = (orders) => {
//     const completedOrders = orders.filter(order => order.status === 'completed').length;
//     const totalRevenue = orders.reduce((total, order) => total + order.totalAmount, 0);
//     const pendingOrdersCount = orders.filter(order => order.status === 'accepted').length;
//     const monthlyRevenue = orders.reduce((total, order) => {
//       const orderDate = new Date(order.createdAt);
//       const currentMonth = new Date().getMonth();
//       return orderDate.getMonth() === currentMonth ? total + order.totalAmount : total;
//     }, 0);

//     setAnalyticsData([
//       { title: "Completed Orders", value: completedOrders, icon: <Award className="text-emerald-500" /> },
//       { title: "Today's Revenue", value: `₹${totalRevenue.toFixed(2)}`, icon: <CreditCard className="text-indigo-500" /> },
//       { title: "Active Orders", value: pendingOrdersCount, icon: <Truck className="text-amber-500" /> },
//       { title: "Monthly Revenue", value: `₹${monthlyRevenue.toFixed(2)}`, icon: <CreditCard className="text-violet-500" /> },
//     ]);
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 -mt-8">
//       {/* Enhanced Sidebar */}
//       <aside className="w-1/4 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white p-8 shadow-2xl relative overflow-hidden">
//         <div className="relative z-10">
//           <div className="text-center">
//             <div className="w-44 h-44 mx-auto rounded-full border-4 border-white/80 overflow-hidden mb-6 shadow-xl transform transition-all duration-300 hover:scale-110 hover:rotate-6">
//               <img
//                 src={boy}
//                 alt="Profile"
//                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//             <h2 className="text-3xl font-bold mb-2 text-white/90">{deliveryPartner?.username || "N/A"}</h2>
//             <p className="text-sm text-white/70">{deliveryPartner?.email || "N/A"}</p>
//           </div>

//           <nav className="mt-10 space-y-5">
//             <ProfileInfoItem
//               icon={<Award className="mr-3 text-yellow-200 w-6 h-6" />}
//               label="License"
//               value={deliveryPartner?.license || "N/A"}
//             />
//             <ProfileInfoItem
//               icon={<Truck className="mr-3 text-blue-200 w-6 h-6" />}
//               label="Vehicle"
//               value={deliveryPartner?.vehicleNumber || "N/A"}
//             />
//             <ProfileInfoItem
//               icon={<MapPin className="mr-3 text-red-200 w-6 h-6" />}
//               label="Address"
//               value={deliveryPartner?.address?.fullAddress || "N/A"}
//             />
//             <ProfileInfoItem
//               icon={<Phone className="mr-3 text-green-200 w-6 h-6" />}
//               label="Contact"
//               value={deliveryPartner?.contact || "N/A"}
//             />
//           </nav>
//         </div>
//         {/* Decorative background elements */}
//         <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-800/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
//       </aside>

//       {/* Enhanced Main Content */}
//       <main className="w-3/4 p-10 space-y-10">
//         {/* Analytics Grid */}
//         <div className="grid grid-cols-4 gap-8">
//           {analyticsData.map((item, index) => (
//             <AnalyticsCard
//               key={index}
//               title={item.title}
//               value={item.value}
//               icon={item.icon}
//             />
//           ))}
//         </div>

//         {/* Enhanced Pending Orders */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90">
//           <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
//             <Truck className="mr-4 text-orange-500 w-7 h-7" />
//             Pending Orders
//           </h2>
//           <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-100">
//             {pendingOrders.map((order, index) => (
//               <OrderCard
//                 key={order._id}
//                 customerName={order.customerName}
//                 customerContact={order.customerContact}
//                 restaurantName={order.restaurantName}
//                 orderPrice={`₹${order.totalAmount.toFixed(2)}`}
//                 onAccept={() => handleAcceptOrder(order._id)}
//                 index={index}
//               />
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// const ProfileInfoItem = ({ icon, label, value }) => (
//   <div className="flex items-center bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
//     {icon}
//     <div>
//       <p className="text-sm font-medium text-white/70">{label}</p>
//       <p className="font-semibold text-white truncate max-w-[200px]">{value}</p>
//     </div>
//   </div>
// );

// const AnalyticsCard = ({ title, value, icon }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
//     <div className="flex items-center space-x-4">
//       <div className="p-4 bg-gray-50 rounded-xl">{icon}</div>
//       <div>
//         <p className="text-sm text-gray-500 font-medium">{title}</p>
//         <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
//       </div>
//     </div>
//   </div>
// );

// const OrderCard = ({ customerName, customerContact, restaurantName, orderPrice, onAccept, index }) => (
//   <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-x-1 hover:translate-y-1 animate-fadeIn">
//     <div className="flex items-center justify-between">
//       <div className="flex-grow pr-6">
//         <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//           <MapPin className="mr-2 text-orange-500 w-5 h-5" />
//           {customerName}
//         </h4>
//         <div className="space-y-2 text-sm text-gray-600">
//           <p className="flex items-center">
//             <Phone className="mr-2 text-green-500 w-4 h-4" />
//             {customerContact}
//           </p>
//           <p className="flex items-center">
//             <Truck className="mr-2 text-blue-500 w-4 h-4" />
//             {restaurantName}
//           </p>
//           <p className="flex items-center font-medium text-orange-600">
//             <CreditCard className="mr-2 text-purple-500 w-4 h-4" />
//             {orderPrice}
//           </p>
//         </div>
//       </div>
//       <button
//         onClick={onAccept}
//         className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 shadow-lg"
//       >
//         Accept Order
//       </button>
//     </div>
//   </div>
// );

// export default DeliveryPartnerDashboard;



import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useUser } from "../../contexts/UserProvider";
import boy from "../../assets/images/boy1.jpg";
import { MapPin, Phone, Award, Truck, CreditCard } from "lucide-react";

const DeliveryPartnerDashboard = () => {
  const { user } = useUser();
  const [deliveryPartner, setDeliveryPartner] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    setDeliveryPartner(user);
  }, [user]);

  useEffect(() => {
    const fetchTodaysOrders = async () => {
      try {
        const response = await axiosInstance.get('deliveryPartner/ordersToday');
        setPendingOrders(response.data.detailedOrders.filter(order => order.status === 'pending'));
        calculateAnalytics(response.data.analytics);
      } catch (error) {
        console.error('Error fetching today\'s orders:', error);
      }
    };

    fetchTodaysOrders();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      await axiosInstance.put(`/deliveryPartner/orders/${orderId}/status`, { deliveryPartnerId: deliveryPartner._id });
      setPendingOrders(pendingOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const calculateAnalytics = (analytics) => {
    setAnalyticsData([
      { title: "Completed Orders", value: analytics.completedOrders, icon: <Award className="text-emerald-500" /> },
      { title: "Today's Revenue", value: `₹${analytics.todaysRevenue.toFixed(2)}`, icon: <CreditCard className="text-indigo-500" /> },
      { title: "Active Orders", value: analytics.activeOrders, icon: <Truck className="text-amber-500" /> },
      { title: "Monthly Revenue", value: `₹${analytics.monthlyRevenue.toFixed(2)}`, icon: <CreditCard className="text-violet-500" /> },
    ]);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 -mt-8">
      {/* Enhanced Sidebar */}
      <aside className="w-1/4 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-center">
            <div className="w-44 h-44 mx-auto rounded-full border-4 border-white/80 overflow-hidden mb-6 shadow-xl transform transition-all duration-300 hover:scale-110 hover:rotate-6">
              <img
                src={boy}
                alt="Profile"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white/90">{deliveryPartner?.username || "N/A"}</h2>
            <p className="text-sm text-white/70">{deliveryPartner?.email || "N/A"}</p>
          </div>

          <nav className="mt-10 space-y-5">
            <ProfileInfoItem
              icon={<Award className="mr-3 text-yellow-200 w-6 h-6" />}
              label="License"
              value={deliveryPartner?.license || "N/A"}
            />
            <ProfileInfoItem
              icon={<Truck className="mr-3 text-blue-200 w-6 h-6" />}
              label="Vehicle"
              value={deliveryPartner?.vehicleNumber || "N/A"}
            />
            <ProfileInfoItem
              icon={<MapPin className="mr-3 text-red-200 w-6 h-6" />}
              label="Address"
              value={deliveryPartner?.address?.fullAddress || "N/A"}
            />
            <ProfileInfoItem
              icon={<Phone className="mr-3 text-green-200 w-6 h-6" />}
              label="Contact"
              value={deliveryPartner?.contact || "N/A"}
            />
          </nav>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-800/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
      </aside>

      {/* Enhanced Main Content */}
      <main className="w-3/4 p-10 space-y-10">
        {/* Analytics Grid */}
        <div className="grid grid-cols-4 gap-8">
          {analyticsData.map((item, index) => (
            <AnalyticsCard
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </div>

        {/* Enhanced Pending Orders */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <Truck className="mr-4 text-orange-500 w-7 h-7" />
            Pending Orders
          </h2>
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-100">
            {pendingOrders.map((order, index) => (
              <OrderCard
                key={order._id}
                customerName={order.customerName}
                customerContact={order.customerContact}
                restaurantName={order.restaurantName}
                orderPrice={`₹${order.totalAmount.toFixed(2)}`}
                onAccept={() => handleAcceptOrder(order._id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const ProfileInfoItem = ({ icon, label, value }) => (
  <div className="flex items-center bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
    {icon}
    <div>
      <p className="text-sm font-medium text-white/70">{label}</p>
      <p className="font-semibold text-white truncate max-w-[200px]">{value}</p>
    </div>
  </div>
);

const AnalyticsCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex items-center space-x-4">
      <div className="p-4 bg-gray-50 rounded-xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const OrderCard = ({ customerName, customerContact, restaurantName, orderPrice, onAccept, index }) => (
  <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-x-1 hover:translate-y-1 animate-fadeIn">
    <div className="flex items-center justify-between">
      <div className="flex-grow pr-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
          <MapPin className="mr-2 text-orange-500 w-5 h-5" />
          {customerName}
        </h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center">
            <Phone className="mr-2 text-green-500 w-4 h-4" />
            {customerContact}
          </p>
          <p className="flex items-center">
            <Truck className="mr-2 text-blue-500 w-4 h-4" />
            {restaurantName}
          </p>
          <p className="flex items-center font-medium text-orange-600">
            <CreditCard className="mr-2 text-purple-500 w-4 h-4" />
            {orderPrice}
          </p>
        </div>
      </div>
      <button
        onClick={onAccept}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 shadow-lg"
      >
        Accept Order
      </button>
    </div>
  </div>
);

export default DeliveryPartnerDashboard;