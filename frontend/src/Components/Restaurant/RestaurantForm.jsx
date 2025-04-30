// import { useState, useEffect } from 'react';
// import { useUser } from '../../contexts/UserProvider'; // Adjust the path based on your project structure
// import axiosInstance from '../../utils/axiosInstance';
// const RestaurantForm = () => {
//   const { user } = useUser(); // Get user data from UserProvider
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     address: {
//       fullAddress: '',
//       pincode: ''
//     },
//     contact: '',
//     hotelName: '',
//     averageCost: '',
//     paymentMethods: {
//       cash: true,
//       cards: true,
//       digitalPayments: true
//     },
//     knownFor: [],
//     moreInfo: {
//       breakfast: false,
//       takeaway: false,
//       homeDelivery: false,
//       valetParking: false,
//       luxuryDining: false,
//       tableBooking: false,
//       brunch: false,
//       buffet: false,
//       indoorSeating: false,
//       outdoorSeating: false
//     },
//     type: '',
//     photos: [],
//     timingFrom: '',
//     timingTo: '',
//     isOpen: true,
//     wallet: {
//       balance: 0
//     }
//   });

//   useEffect(() => {
//     // Pre-fill form data if user data exists
//     if (user) {
//       setFormData({
//         username: user.username || '',
//         email: user.email || '',
//         address: {
//           fullAddress: user.address?.fullAddress || '',
//           pincode: user.address?.pincode || ''
//         },
//         contact: user.contact || '',
//         hotelName: user.hotelName || '',
//         averageCost: user.averageCost || '',
//         paymentMethods: {
//           cash: user.paymentMethods?.cash ?? true,
//           cards: user.paymentMethods?.cards ?? true,
//           digitalPayments: user.paymentMethods?.digitalPayments ?? true,
//         },
//         knownFor: user.knownFor || [],
//         moreInfo: {
//           breakfast: user.moreInfo?.breakfast || false,
//           takeaway: user.moreInfo?.takeaway || false,
//           homeDelivery: user.moreInfo?.homeDelivery || false,
//           valetParking: user.moreInfo?.valetParking || false,
//           luxuryDining: user.moreInfo?.luxuryDining || false,
//           tableBooking: user.moreInfo?.tableBooking || false,
//           brunch: user.moreInfo?.brunch || false,
//           buffet: user.moreInfo?.buffet || false,
//           indoorSeating: user.moreInfo?.indoorSeating || false,
//           outdoorSeating: user.moreInfo?.outdoorSeating || false,
//         },
//         type: user.type || '',
//         photos: user.photos || [],
//         timingFrom: user.timingFrom || '',
//         timingTo: user.timingTo || '',
//         isOpen: user.isOpen ?? true,
//         wallet: {
//           balance: user.wallet?.balance || 0
//         }
//       });
//     }
//   }, [user]); // Re-run effect if user changes

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     // Handle nested object updates
//     if (name.includes('address')) {
//       const addressField = name.split('.')[1];
//       setFormData({
//         ...formData,
//         address: {
//           ...formData.address,
//           [addressField]: value
//         }
//       });
//     } else if (name.includes('moreInfo')) {
//       const infoField = name.split('.')[1];
//       setFormData({
//         ...formData,
//         moreInfo: {
//           ...formData.moreInfo,
//           [infoField]: checked
//         }
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: type === 'checkbox' ? checked : value
//       });
//     }
//   };

//   const handleKnownForChange = (e) => {
//     const { value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       knownFor: prev.knownFor.includes(value)
//         ? prev.knownFor.filter((item) => item !== value)
//         : [...prev.knownFor, value]
//     }));
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       photos: files
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formDataToSubmit = new FormData();
//     for (const key in formData) {
//       if (Array.isArray(formData[key])) {
//         formData[key].forEach(file => formDataToSubmit.append(key, file));
//       } else if (typeof formData[key] === 'object') {
//         for (const subKey in formData[key]) {
//           formDataToSubmit.append(`${key}[${subKey}]`, formData[key][subKey]);
//         }
//       } else {
//         formDataToSubmit.append(key, formData[key]);
//       }
//     }

//     try {
//       const response = await axiosInstance.post('restaurant/profile', formDataToSubmit, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       console.log('Success:', response.data);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };



//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Register Restaurant</h2>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Username</label>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Full Address</label>
//         <input
//           type="text"
//           name="address.fullAddress"
//           value={formData.address.fullAddress}
//           onChange={handleChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Pincode</label>
//         <input
//           type="text"
//           name="address.pincode"
//           value={formData.address.pincode}
//           onChange={handleChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Contact</label>
//         <input
//           type="text"
//           name="contact"
//           value={formData.contact}
//           onChange={handleChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
//         <input
//           type="text"
//           name="hotelName"
//           value={formData.hotelName}
//           onChange={handleChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Average Cost</label>
//         <input
//           type="number"
//           name="averageCost"
//           value={formData.averageCost}
//           onChange={handleChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <h3 className="text-lg font-medium">Payment Methods</h3>
//         <div className="flex items-center mb-2">
//           <input
//             type="checkbox"
//             name="paymentMethods.cash"
//             checked={formData.paymentMethods.cash}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           <label className="text-sm font-medium text-gray-700">Cash</label>
//         </div>
//         <div className="flex items-center mb-2">
//           <input
//             type="checkbox"
//             name="paymentMethods.cards"
//             checked={formData.paymentMethods.cards}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           <label className="text-sm font-medium text-gray-700">Cards</label>
//         </div>
//         <div className="flex items-center mb-2">
//           <input
//             type="checkbox"
//             name="paymentMethods.digitalPayments"
//             checked={formData.paymentMethods.digitalPayments}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           <label className="text-sm font-medium text-gray-700">Digital Payments</label>
//         </div>
//       </div>
//       <div className="mb-4">
//         <h3 className="text-lg font-medium">Known For</h3>
//         {/* Add knownFor checkboxes or select input as per your design */}
//       </div>
//       <div className="mb-4">
//         <h3 className="text-lg font-medium">More Info</h3>
//         {Object.entries(formData.moreInfo).map(([key, value]) => (
//           <div key={key} className="flex items-center mb-2">
//             <input
//               type="checkbox"
//               name={`moreInfo.${key}`}
//               checked={value}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label className="text-sm font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//           </div>
//         ))}
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Type</label>
//         <input
//           type="text"
//           name="type"
//           value={formData.type}
//           onChange={handleChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Photos</label>
//         <input
//           type="file"
//           name="photos"
//           multiple
//           onChange={handleFileChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Timing From</label>
//         <input
//           type="time"
//           name="timingFrom"
//           value={formData.timingFrom}
//           onChange={handleChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Timing To</label>
//         <input
//           type="time"
//           name="timingTo"
//           value={formData.timingTo}
//           onChange={handleChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="isOpen"
//             checked={formData.isOpen}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           <span className="text-sm font-medium text-gray-700">Is Open</span>
//         </label>
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-500"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default RestaurantForm;



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserProvider'; // Adjust the path based on your project structure


import axios from 'axios';
const RestaurantForm = () => {
  const { user } = useUser(); // Get user data from UserProvider
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: {
      fullAddress: '',
      pincode: ''
    },
    contact: '',
    hotelName: '',
    averageCost: '',
    paymentMethods: {
      cash: true,
      cards: true,
      digitalPayments: true
    },
    knownFor: [],
    moreInfo: {
      breakfast: false,
      takeaway: false,
      homeDelivery: false,
      valetParking: false,
      luxuryDining: false,
      tableBooking: false,
      brunch: false,
      buffet: false,
      indoorSeating: false,
      outdoorSeating: false
    },
    type: '',
    photos: [],
    timingFrom: '',
    timingTo: '',
    isOpen: true,
    wallet: {
      balance: 0
    }
  });

  useEffect(() => {
    // Pre-fill form data if user data exists
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        address: {
          fullAddress: user.address?.fullAddress || '',
          pincode: user.address?.pincode || ''
        },
        contact: user.contact || '',
        hotelName: user.hotelName || '',
        averageCost: user.averageCost || '',
        paymentMethods: {
          cash: user.paymentMethods?.cash ?? true,
          cards: user.paymentMethods?.cards ?? true,
          digitalPayments: user.paymentMethods?.digitalPayments ?? true,
        },
        knownFor: user.knownFor || [],
        moreInfo: {
          breakfast: user.moreInfo?.breakfast || false,
          takeaway: user.moreInfo?.takeaway || false,
          homeDelivery: user.moreInfo?.homeDelivery || false,
          valetParking: user.moreInfo?.valetParking || false,
          luxuryDining: user.moreInfo?.luxuryDining || false,
          tableBooking: user.moreInfo?.tableBooking || false,
          brunch: user.moreInfo?.brunch || false,
          buffet: user.moreInfo?.buffet || false,
          indoorSeating: user.moreInfo?.indoorSeating || false,
          outdoorSeating: user.moreInfo?.outdoorSeating || false,
        },
        type: user.type || '',
        photos: null,
        timingFrom: user.timingFrom || '',
        timingTo: user.timingTo || '',
        isOpen: user.isOpen ?? true,
        wallet: {
          balance: user.wallet?.balance || 0
        }
      });
    }
  }, [user]); // Re-run effect if user changes

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested object updates
    if (name.includes('address')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else if (name.includes('moreInfo')) {
      const infoField = name.split('.')[1];
      setFormData({
        ...formData,
        moreInfo: {
          ...formData.moreInfo,
          [infoField]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleKnownForChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      knownFor: prev.knownFor.includes(value)
        ? prev.knownFor.filter((item) => item !== value)
        : [...prev.knownFor, value]
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      photos: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();

    for (const key in formData) {
        if (key === 'photos' && formData.photos) {
            formDataToSubmit.append(key, formData.photos); // Append the single file
        } else {
            formDataToSubmit.append(key, formData[key]);
        }
    }
  
    try {
      const response = await axios.post('http://localhost:3000/restaurant/profile', formData, {
        // Content-Type is not set; let the browser handle it
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type
        },
        withCredentials: true,
      });
      console.log('Success:', response.data);
      alert('Profile updated successfully');
      navigate('/restaurant');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    navigate('/restaurant/')
  };
  


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register Restaurant</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Full Address</label>
        <input
          type="text"
          name="address.fullAddress"
          value={formData.address.fullAddress}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Pincode</label>
        <input
          type="text"
          name="address.pincode"
          value={formData.address.pincode}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Contact</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
        <input
          type="text"
          name="hotelName"
          value={formData.hotelName}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Average Cost</label>
        <input
          type="number"
          name="averageCost"
          value={formData.averageCost}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">Payment Methods</h3>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            name="paymentMethods.cash"
            checked={formData.paymentMethods.cash}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Cash</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            name="paymentMethods.cards"
            checked={formData.paymentMethods.cards}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Cards</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            name="paymentMethods.digitalPayments"
            checked={formData.paymentMethods.digitalPayments}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Digital Payments</label>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">Known For</h3>
        {/* Add knownFor checkboxes or select input as per your design */}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">More Info</h3>
        {Object.entries(formData.moreInfo).map(([key, value]) => (
          <div key={key} className="flex items-center mb-2">
            <input
              type="checkbox"
              name={`moreInfo.${key}`}
              checked={value}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          </div>
        ))}
      </div>
      <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Type</label>
  <select
    name="type"
    value={formData.type}
    onChange={handleChange}
    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
  >
    <option value="Pure Veg">Pure Veg</option>
    <option value="Oriental">Oriental</option>
    <option value="Indian">Indian</option>
    <option value="Mixed">Mixed</option>
    <option value="Continental">Continental</option>
    <option value="Italian">Italian</option>
    <option value="Mexican">Mexican</option>
    <option value="Fast Food">Fast Food</option>
  </select>
</div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <input
          type="file"
          name="photos"
          multiple
          onChange={handleFileChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Timing From</label>
        <input
          type="time"
          name="timingFrom"
          value={formData.timingFrom}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Timing To</label>
        <input
          type="time"
          name="timingTo"
          value={formData.timingTo}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isOpen"
            checked={formData.isOpen}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Is Open</span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default RestaurantForm;

